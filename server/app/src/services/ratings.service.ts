import { Injectable, BadRequestException, NotFoundException, ConflictException, Inject, forwardRef, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Rating } from '../entities/rating.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { OrderItem } from '../entities/order-item.entity';
import { RewardTransaction, TransactionType } from '../entities/reward-transaction.entity';
import { ProductCredit } from '../entities/product-credit.entity';
import { CreateRatingDto, RatingResponseDto, ProductRatingStatsDto } from '../dtos/rating.dto';
import { ClsService } from 'nestjs-cls';
import { AiClassificationService } from './ai-classification.service';
import { ClassificationStatsDto } from '@/dtos/ai-classification.dto';
import { UpdateRatingDto } from '@/dtos/update-rating.dto';
import { AiClassification } from '@/entities/ai-classification.entity';
// import { ClassificationStatsDto } from './path/to/dto'; // Adjust path as necessary

// Reward configuration based on product type
const REWARD_CONFIG = {
  PL_PRODUCT_POINTS: 30,      // Private Label products
  NORMAL_PRODUCT_POINTS: 10,   // Standard products
  POINTS_TO_DOLLAR_RATE: 0.001 // 10 points = $0.01
};

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(RewardTransaction)
    private rewardTransactionsRepository: Repository<RewardTransaction>,
    @InjectRepository(ProductCredit)
    private productCreditsRepository: Repository<ProductCredit>,
    private dataSource: DataSource,
    private clsService: ClsService,
    @Inject(forwardRef(() => AiClassificationService))
    private aiClassificationService: AiClassificationService,
  ) { }

  /**
   * Submit a product rating with automatic reward calculation and distribution
   * Uses database transaction to ensure atomicity
   * Automatically classifies comment using AI
   */
  async createRating(createRatingDto: CreateRatingDto): Promise<RatingResponseDto> {
    const { productId, score, comment } = createRatingDto;

    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');
    const userId = user.id;


    // Use QueryRunner for transaction management
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Verify product exists
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: productId, isActive: true }
      });

      if (!product) {
        throw new NotFoundException('Product not found or is not active');
      }

      // 2. Verify user has purchased this product
      const hasPurchased = await this.verifyUserPurchase(userId, productId, queryRunner.manager);
      if (!hasPurchased) {
        throw new BadRequestException('You can only rate products you have purchased');
      }

      // 3. Check if user has already rated this product
      const existingRating = await queryRunner.manager.findOne(Rating, {
        where: { userId, productId }
      });

      if (existingRating) {
        throw new ConflictException('You have already rated this product');
      }

      // 4. Find unclaimed product credits for this product from user's orders
      const unclaimedCredits = await queryRunner.manager.find(ProductCredit, {
        where: {
          productId,
          isClaimed: false,
        },
        relations: ['order'],
      });

      // Filter credits that belong to user's orders
      const userCredits = unclaimedCredits.filter(credit =>
        credit.order && credit.order.userId === userId
      );

      if (userCredits.length === 0) {
        throw new BadRequestException('No available credits for this product. You may have already rated it from all purchases.');
      }

      // Use the first unclaimed credit (FIFO - First In First Out)
      const creditToUse = userCredits[0];
      const rewardPoints = creditToUse.ratingPoints;
      const rewardAmount = creditToUse.allocatedCredit;

      // 5. Create the rating
      const rating = queryRunner.manager.create(Rating, {
        userId,
        productId,
        score,
        comment: comment,
        rewardPoints,
        rewardAmount: Number(rewardAmount)
      });

      const savedRating = await queryRunner.manager.save(Rating, rating);

      // 7. Mark credit as claimed
      creditToUse.isClaimed = true;
      await queryRunner.manager.save(ProductCredit, creditToUse);

      // 8. Update product rating statistics
      await this.updateProductRatingStats(productId, queryRunner.manager);

      // 9. Update user bonus balance
      const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const newBalance = Number(user.bonusBalance) + Number(rewardAmount);
      user.bonusBalance = newBalance;
      await queryRunner.manager.save(User, user);

      // 10. Create reward transaction record (audit trail)
      const transaction = queryRunner.manager.create(RewardTransaction, {
        userId,
        ratingId: savedRating.id,
        type: TransactionType.RATING_REWARD,
        points: rewardPoints,
        amount: rewardAmount,
        balanceAfter: newBalance,
        description: `Rating reward for ${product.isPrivateLabel ? 'PL' : 'normal'} product: ${product.name}`
      });

      await queryRunner.manager.save(RewardTransaction, transaction);

      // Commit transaction
      await queryRunner.commitTransaction();

      // 11. 🤖 AI CLASSIFICATION: Automatically classify comment if provided
      // Classification happens AFTER transaction commit to ensure visibility and performance
      if (comment && comment.trim().length > 0) {
        try {
          await this.aiClassificationService.classifyComment(savedRating.id, comment);
        } catch (classificationError) {
          // Log error but don't fail the rating creation
          console.error('AI Classification failed:', classificationError);
        }
      }

      // 11. Return response
      return {
        id: savedRating.id,
        productId: product.id,
        productName: product.name,
        score: savedRating.score,
        comment: savedRating.comment,
        rewardPoints: savedRating.rewardPoints,
        rewardAmount: savedRating.rewardAmount,
        createdAt: savedRating.createdAt
      };

    } catch (error) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async updateRating(
    ratingId: string,
    updateRatingDto: UpdateRatingDto
  ): Promise<RatingResponseDto> {

    const userId = this.clsService.get("user").id

    const rating = await this.ratingsRepository.findOne({
      where: { id: ratingId },
      relations: ['product']
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }




    // 2. Verify ownership
    if (rating.userId !== userId) {
      throw new ForbiddenException('You can only update your own ratings');
    }

    // 3. Update in transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Apply updates
      if (updateRatingDto.score !== undefined) rating.score = updateRatingDto.score;
      if (updateRatingDto.comment !== undefined) rating.comment = updateRatingDto.comment;

      const savedRating = await queryRunner.manager.save(Rating, rating);

      await queryRunner.manager.delete('AiClassification', { ratingId: rating.id });

      // 4. Handle AI Re-classification if comment changed
      if (updateRatingDto.comment !== undefined) {
        await this.aiClassificationService.classifyRating(
          savedRating.id,
          savedRating.comment,
          queryRunner.manager
        );
      }

      // 5. Recalculate product rating stats (Avg/Count)
      await this.updateProductRatingStats(rating.productId, queryRunner.manager);

      await queryRunner.commitTransaction();

      // 6. Return mapped response
      return {
        id: savedRating.id,
        productId: rating.product.id,
        productName: rating.product.name,
        score: savedRating.score,
        comment: savedRating.comment,
        rewardPoints: savedRating.rewardPoints,
        rewardAmount: savedRating.rewardAmount,
        createdAt: savedRating.createdAt
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Verify that a user has purchased a specific product
   */
  private async verifyUserPurchase(userId: string, productId: string, manager: any): Promise<boolean> {
    const orderItem = await manager
      .createQueryBuilder(OrderItem, 'orderItem')
      .innerJoin('orderItem.order', 'order')
      .where('order.userId = :userId', { userId })
      .andWhere('orderItem.productId = :productId', { productId })
      .getOne();
    return !!orderItem;
  }

  /**
   * Update product rating statistics (count and average)
   */
  private async updateProductRatingStats(productId: string, manager: any): Promise<void> {
    const stats = await manager
      .createQueryBuilder(Rating, 'rating')
      .select('COUNT(*)', 'count')
      .addSelect('AVG(rating.score)', 'average')
      .where('rating.productId = :productId', { productId })
      .getRawOne();

    await manager.update(Product, productId, {
      ratingCount: parseInt(stats.count),
      averageRating: parseFloat(stats.average).toFixed(2)
    });
  }

  /**
   * Get all ratings for a product with AI classifications
   */
  async getProductRatings(productId: string): Promise<RatingResponseDto[]> {
    const ratings = await this.ratingsRepository.find({
      where: { productId },
      relations: ['user', 'product', 'aiClassifications'],
      order: { createdAt: 'DESC' }
    });

    return ratings.map(rating => ({
      id: rating.id,
      productId: rating.product.id,
      productName: rating.product.name,
      score: rating.score,
      comment: rating.comment,
      rewardPoints: rating.rewardPoints,
      rewardAmount: rating.rewardAmount,
      createdAt: rating.createdAt,
      // Include AI classifications if available
      aiClassifications: rating.aiClassifications?.map(c => ({
        topicLabel: c.topicLabel,
        topicConfidence: c.topicConfidence,
      })) || []
    }));
  }

  /**
   * Get rating statistics for a product with topic analysis
   */
  async getProductRatingStats(productId: string): Promise<ProductRatingStatsDto> {
    const product = await this.productsRepository.findOne({
      where: { id: productId }
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Get rating distribution
    const distribution = await this.ratingsRepository
      .createQueryBuilder('rating')
      .select('rating.score', 'score')
      .addSelect('COUNT(*)', 'count')
      .where('rating.productId = :productId', { productId })
      .groupBy('rating.score')
      .getRawMany();

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    distribution.forEach(item => {
      ratingDistribution[item.score] = parseInt(item.count);
    });

    // Get top topics for this product
    let topTopics: ClassificationStatsDto[] = [];
    try {
      topTopics = await this.aiClassificationService.getProductClassificationStats(productId);
    } catch (error) {
      console.error('Failed to get classification stats:', error);
    }

    return {
      productId: product.id,
      averageRating: Number(product.averageRating),
      totalRatings: product.ratingCount,
      ratingDistribution,
      topTopics: topTopics.slice(0, 5) // Top 5 topics
    };
  }

  /**
   * Get all ratings submitted by a user with AI classifications
   */
  async getUserRatings(): Promise<RatingResponseDto[]> {
    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');
    const userId = user.id;
    const ratings = await this.ratingsRepository.find({
      where: { userId },
      relations: ['product', 'aiClassifications'],
      order: { createdAt: 'DESC' }
    });

    return ratings.map(rating => ({
      id: rating.id,
      productId: rating.product.id,
      productName: rating.product.name,
      score: rating.score,
      comment: rating.comment,
      rewardPoints: rating.rewardPoints,
      rewardAmount: rating.rewardAmount,
      createdAt: rating.createdAt,
      // Include AI classifications
      aiClassifications: rating.aiClassifications?.map(c => ({
        topicLabel: c.topicLabel,
        topicConfidence: c.topicConfidence,
      })) || []
    }));
  }
}