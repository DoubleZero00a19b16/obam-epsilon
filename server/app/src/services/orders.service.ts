import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Rating } from '../entities/rating.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { BonusCard } from '../entities/bonus-card.entity';
import { ProductCredit } from '../entities/product-credit.entity';
import { MyOrdersResponseDto, ProductInOrderDto, GetMyOrdersQueryDto } from '../dtos/order.dto';
import { CreateOrderDto, OrderCreatedResponseDto } from '../dtos/create-order.dto';
import { ClsService } from 'nestjs-cls';
import { PaginatedResponseDto, PaginationParamsDto } from '@/dtos/pagination.dto';

// 2% cashback on purchases
const PURCHASE_CASHBACK_RATE = 0.02;



@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(BonusCard)
    private bonusCardsRepository: Repository<BonusCard>,
    @InjectRepository(ProductCredit)
    private productCreditsRepository: Repository<ProductCredit>,
    private dataSource: DataSource,
    private clsService: ClsService
  ) { }

  /**
   * Create a new order with products
   * Automatically calculates total and bonus cashback (5%)
   */
  // async createOrder(createOrderDto: CreateOrderDto): Promise<OrderCreatedResponseDto> {
  //   const { bonusCardNumber, items } = createOrderDto;


  //   // Use transaction for atomicity
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     // 1. Verify bonus card belongs to user
  //     const bonusCard = await queryRunner.manager.findOne(BonusCard, {
  //       where: { cardNumber: bonusCardNumber, isActive: true },
  //     });

  //     if (!bonusCard) {
  //       throw new BadRequestException('Invalid bonus card or card does not belong to user');
  //     }

  //     const userId = bonusCard.userId

  //     // 2. Verify all products exist and get their prices
  //     const productIds = items.map(item => item.productId);
  //     const products = await queryRunner.manager.find(Product, {
  //       where: { 
  //         id: In(productIds),
  //         isActive: true 
  //       }
  //     });

  //     if (products.length !== productIds.length) {
  //       throw new BadRequestException('One or more products not found or inactive');
  //     }

  //     // Create product map for easy lookup
  //     const productMap = new Map(products.map(p => [p.id, p]));

  //     // 3. Calculate order totals
  //     let totalAmount = 0;
  //     const orderItemsData = items.map(item => {
  //       const product = productMap.get(item.productId);
  //       if (!product) {
  //         throw new BadRequestException(`Product ${item.productId} not found`);
  //       }

  //       const unitPrice = Number(product.price);
  //       const totalPrice = unitPrice * item.quantity;
  //       totalAmount += totalPrice;

  //       return {
  //         productId: item.productId,
  //         product,
  //         quantity: item.quantity,
  //         unitPrice,
  //         totalPrice,
  //       };
  //     });

  //     // Calculate 5% cashback
  //     const bonusEarned = totalAmount * PURCHASE_CASHBACK_RATE;

  //     // Split bonus: 50% immediate cashback, 50% to rating reward pool
  //     const immediateCashback = bonusEarned * (1 - RATING_POOL_PERCENTAGE);
  //     const ratingRewardPool = bonusEarned * RATING_POOL_PERCENTAGE;

  //     // 4. Create order
  //     const order = queryRunner.manager.create(Order, {
  //       userId,
  //       bonusCardNumber,
  //       totalAmount,
  //       marketId: createOrderDto.marketId,
  //       bonusEarned: immediateCashback, // Only immediate cashback shown
  //     });

  //     const savedOrder = await queryRunner.manager.save(Order, order);

  //     // 5. Calculate priority-based credit allocation
  //     // Separate PL and normal products
  //      const rateableProducts = orderItemsData; // All products are potentially rateable if they have rewards

  //     const plProducts = rateableProducts.filter(
  //       item => item.product.isPrivateLabel === true
  //     );
  //      const normalProducts = orderItemsData.filter(item => (!item.product.isPrivateLabel));

  //     // Sort by rating count (ascending - fewer ratings first)
  //     const sortByRatingCount = (items: typeof orderItemsData) => {
  //       return items.sort((a, b) => a.product.ratingCount - b.product.ratingCount);
  //     };

  //     const sortedPlProducts = sortByRatingCount([...plProducts]);
  //     const sortedNormalProducts = sortByRatingCount([...normalProducts]);

  //     // Take only top 4-5 products with lowest ratings from each category
  //     const MAX_PRIORITY_PRODUCTS = 5;
  //     const priorityPlProducts = sortedPlProducts.slice(0, MAX_PRIORITY_PRODUCTS);
  //     const priorityNormalProducts = sortedNormalProducts.slice(0, MAX_PRIORITY_PRODUCTS);

  //     // Allocate 70% of pool to PL products, 30% to normal products
  //     const PL_POOL_RATIO = 0.70;
  //     const NORMAL_POOL_RATIO = 0.30;

  //     const plPoolAmount = ratingRewardPool * PL_POOL_RATIO;
  //     const normalPoolAmount = ratingRewardPool * NORMAL_POOL_RATIO;

  //     // Calculate weights (inverse of rating count - fewer ratings = higher weight)
  //     const calculateWeight = (ratingCount: number) => {
  //       // Weight formula: 1 / (ratingCount + 1)
  //       // Products with 0 ratings get weight of 1.0
  //       // Products with 10 ratings get weight of 0.09
  //       // Products with 100 ratings get weight of 0.01
  //       return 1 / (ratingCount + 1);
  //     };

  //     // Calculate total weights for priority products
  //     const totalPlWeight = priorityPlProducts.reduce(
  //       (sum, item) => sum + calculateWeight(item.product.ratingCount), 
  //       0
  //     );
  //     const totalNormalWeight = priorityNormalProducts.reduce(
  //       (sum, item) => sum + calculateWeight(item.product.ratingCount), 
  //       0
  //     );

  //     // Create map of product credits
  //     const productCreditMap = new Map<string, { credit: number; points: number }>();

  //     // Allocate credits to priority PL products
  //     if (priorityPlProducts.length > 0 && totalPlWeight > 0) {
  //       priorityPlProducts.forEach(item => {
  //         const weight = calculateWeight(item.product.ratingCount);
  //         const allocatedCredit = plPoolAmount * (weight / totalPlWeight);
  //         // Calculate points proportionally: credit / 0.001 (since 10 points = $0.01)
  //         const proportionalPoints = Math.round(allocatedCredit / 0.001);
  //         productCreditMap.set(item.productId, {
  //           credit: allocatedCredit,
  //           points: proportionalPoints
  //         });
  //       });
  //     }

  //     // Allocate credits to priority normal products
  //     if (priorityNormalProducts.length > 0 && totalNormalWeight > 0) {
  //       priorityNormalProducts.forEach(item => {
  //         const weight = calculateWeight(item.product.ratingCount);
  //         const allocatedCredit = normalPoolAmount * (weight / totalNormalWeight);
  //         // Calculate points proportionally: credit / 0.001 (since 10 points = $0.01)
  //         const proportionalPoints = Math.round(allocatedCredit / 0.001);
  //         productCreditMap.set(item.productId, {
  //           credit: allocatedCredit,
  //           points: proportionalPoints
  //         });
  //       });
  //     }

  //     // Create order items and allocate credits
  //     const savedItems: Array<OrderItem & { product: Product }> = [];

  //     for (const itemData of orderItemsData) {
  //       const orderItem = queryRunner.manager.create(OrderItem, {
  //         orderId: savedOrder.id,
  //         productId: itemData.productId,
  //         quantity: itemData.quantity,
  //         unitPrice: itemData.unitPrice,
  //         totalPrice: itemData.totalPrice,
  //       });

  //       const saved = await queryRunner.manager.save(OrderItem, orderItem);
  //       savedItems.push({
  //         ...saved,
  //         product: itemData.product,
  //       });

  //       // Check if this product has allocated credit
  //       const creditInfo = productCreditMap.get(itemData.productId);

  //       if (creditInfo) {
  //         // This product is in top 4-5 priority - create credit record
  //         const productCredit = queryRunner.manager.create(ProductCredit, {
  //           orderId: savedOrder.id,
  //           productId: itemData.productId,
  //           productPrice: itemData.totalPrice,
  //           allocatedCredit: Number(creditInfo.credit.toFixed(4)),
  //           ratingPoints: creditInfo.points,
  //           isClaimed: false,
  //         });

  //         await queryRunner.manager.save(ProductCredit, productCredit);
  //       }
  //       // Products not in top 4-5 get no credit record (cannot be rated for rewards)
  //     }

  //     // 6. Update user bonus balance (only immediate cashback)
  //     const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }

  //     user.bonusBalance = Number(user.bonusBalance) + immediateCashback;
  //     await queryRunner.manager.save(User, user);

  //     // Commit transaction
  //     await queryRunner.commitTransaction();

  //     // 7. Return response
  //     return {
  //       orderId: savedOrder.id,
  //       orderDate: savedOrder.createdAt,
  //       totalAmount,
  //       bonusEarned,
  //       itemCount: savedItems.length,
  //       items: savedItems.map(item => ({
  //         productId: item.product.id,
  //         productName: item.product.name,
  //         quantity: item.quantity,
  //         unitPrice: item.unitPrice,
  //         totalPrice: item.totalPrice,
  //       })),
  //     };

  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderCreatedResponseDto> {
    const { bonusCardNumber, items } = createOrderDto;

    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');

    // Use transaction for atomicity
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Verify bonus card belongs to user
      const bonusCard = await queryRunner.manager.findOne(BonusCard, {
        where: { cardNumber: bonusCardNumber, isActive: true },
      });

      if (!bonusCard) {
        throw new BadRequestException('Invalid bonus card');
      }

      // if (bonusCard.userId !== user.id) {
      //   throw new ForbiddenException('Bonus card does not belong to user');
      // }

      const userId = bonusCard.userId;

      // 2. Verify all products exist and get their prices
      const productIds = items.map(item => item.productId);
      const products = await queryRunner.manager.find(Product, {
        where: {
          id: In(productIds),
          isActive: true
        }
      });

      if (products.length !== productIds.length) {
        throw new BadRequestException('One or more products not found or inactive');
      }

      // Create product map for easy lookup
      const productMap = new Map(products.map(p => [p.id, p]));

      // 3. Calculate order totals
      let totalAmount = 0;
      const orderItemsData = items.map(item => {
        const product = productMap.get(item.productId);
        if (!product) {
          throw new BadRequestException(`Product ${item.productId} not found`);
        }

        const unitPrice = Number(product.price);
        const totalPrice = unitPrice * item.quantity;
        totalAmount += totalPrice;

        return {
          productId: item.productId,
          product,
          quantity: item.quantity,
          unitPrice,
          totalPrice,
        };
      });

      // Calculate 2% cashback on purchase
      const bonusEarned = totalAmount * PURCHASE_CASHBACK_RATE;

      // 4. Create order
      const order = queryRunner.manager.create(Order, {
        userId,
        bonusCardNumber,
        totalAmount,
        marketId: createOrderDto.marketId,
        bonusEarned,
      });

      const savedOrder = await queryRunner.manager.save(Order, order);

      // 5. Create order items and allocate STATIC CREDIT
      const savedItems: Array<OrderItem & { product: Product }> = [];

      for (const itemData of orderItemsData) {
        const orderItem = queryRunner.manager.create(OrderItem, {
          orderId: savedOrder.id,
          productId: itemData.productId,
          quantity: itemData.quantity,
          unitPrice: itemData.unitPrice,
          totalPrice: itemData.totalPrice,
        });

        const saved = await queryRunner.manager.save(OrderItem, orderItem);
        savedItems.push({
          ...saved,
          product: itemData.product,
        });

        // Check if this product has a static reward amount
        // AND if rating is allowed for this product
        if (Number(itemData.product.rewardAmount) > 0) {
          const rewardAmount = Number(itemData.product.rewardAmount);

          // Calculate points: 10 points = $0.01 => 1 point = $0.001
          // Points = Amount / 0.001
          const points = Math.round(rewardAmount / 0.001);

          const productCredit = queryRunner.manager.create(ProductCredit, {
            orderId: savedOrder.id,
            productId: itemData.productId,
            productPrice: itemData.totalPrice,
            allocatedCredit: rewardAmount,
            ratingPoints: points,
            isClaimed: false,
          });

          await queryRunner.manager.save(ProductCredit, productCredit);
        }
      }

      // 6. Update user bonus balance (only immediate cashback)
      const userToUpdate = await queryRunner.manager.findOne(User, { where: { id: userId } });
      if (!userToUpdate) {
        throw new NotFoundException('User not found');
      }

      userToUpdate.bonusBalance = Number(userToUpdate.bonusBalance) + bonusEarned;
      await queryRunner.manager.save(User, userToUpdate);

      // Commit transaction
      await queryRunner.commitTransaction();

      // 7. Return response with allowedRating info for frontend
      return {
        orderId: savedOrder.id,
        orderDate: savedOrder.createdAt,
        totalAmount,
        bonusEarned,
        itemCount: savedItems.length,
        items: savedItems.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          isPrivateLabel: item.product.isPrivateLabel,
          allowedRating: true, // Always allowed now, subject to purchase verification
          rewardAmount: Number(item.product.rewardAmount),
        })),
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  /**
   * Admin: Get all orders with pagination
   */
  async findAll(params: GetMyOrdersQueryDto): Promise<PaginatedResponseDto<MyOrdersResponseDto>> {
    const { page = 1, limit = 10, startDate, endDate } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (startDate && endDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.createdAt = MoreThanOrEqual(new Date(startDate));
    } else if (endDate) {
      where.createdAt = LessThanOrEqual(new Date(endDate));
    }

    const [orders, total] = await this.ordersRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    const enrichedOrders = await this.enrichOrders(orders, ''); // Empty userId for admin bypass

    return {
      data: enrichedOrders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Get user's order history with products sorted by PL status and rating count
   */
  async getMyOrders(query: GetMyOrdersQueryDto): Promise<PaginatedResponseDto<MyOrdersResponseDto>> {
    const { page = 1, limit = 50, startDate, endDate } = query;
    const skip = (page - 1) * limit;

    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');
    const userId = user.id;

    const where: any = { userId };
    if (startDate && endDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.createdAt = MoreThanOrEqual(new Date(startDate));
    } else if (endDate) {
      where.createdAt = LessThanOrEqual(new Date(endDate));
    }

    // Get all orders for the user
    const [orders, total] = await this.ordersRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: skip,
      take: limit,
    });

    const enrichedOrders = await this.enrichOrders(orders, userId);

    return {
      data: enrichedOrders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Get a single order by ID (User safe)
   */
  async getOrderById(orderId: string): Promise<MyOrdersResponseDto> {
    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');

    const order = await this.ordersRepository.findOne({
      where: { id: orderId }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to access this order');
    }

    const [enrichedOrder] = await this.enrichOrders([order], user.id);
    return enrichedOrder;
  }

  /**
   * Get a single order by ID (Admin)
   */
  async getOrderByIdAdmin(orderId: string): Promise<MyOrdersResponseDto> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId }
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const [enrichedOrder] = await this.enrichOrders([order], order.userId);
    return enrichedOrder;
  }

  private async enrichOrders(orders: Order[], userId: string): Promise<MyOrdersResponseDto[]> {
    if (orders.length === 0) {
      return [];
    }

    // Get all order items with products, using the composite index for efficient sorting
    const orderIds = orders.map(order => order.id);

    const orderItems = await this.orderItemsRepository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('orderItem.orderId IN (:...orderIds)', { orderIds })
      .orderBy('product.isPrivateLabel', 'DESC')  // PL products first
      .addOrderBy('product.ratingCount', 'DESC')   // Then by rating count
      .getMany();

    // Get user's ratings for these products
    const productIds = orderItems.map(item => item.productId).filter(id => !!id);
    const userRatings = productIds.length > 0
      ? await this.ratingsRepository.find({
        where: {
          userId,
          productId: In(productIds)
        }
      })
      : [];

    // Get product credits for these products from user's orders
    const productCredits = await this.productCreditsRepository.find({
      where: {
        orderId: In(orderIds),
        isClaimed: false, // Only unclaimed credits
      }
    });

    // Create a map for quick rating lookup
    const ratingMap = new Map(
      userRatings.map(rating => [rating.productId, rating])
    );

    // Create a map for product credits (keyed by orderId-productId)
    const creditMap = new Map(
      productCredits.map(credit => [
        `${credit.orderId}-${credit.productId}`,
        credit
      ])
    );

    // Group order items by order ID
    const orderItemsMap = new Map<string, OrderItem[]>();
    orderItems.forEach(item => {
      if (!orderItemsMap.has(item.orderId)) {
        orderItemsMap.set(item.orderId, []);
      }
      orderItemsMap.get(item.orderId)!.push(item);
    });

    // Build response with sorted products
    return orders.map(order => {
      const items = orderItemsMap.get(order.id) || [];

      const products: ProductInOrderDto[] = items.map(item => {
        const userRating = item.productId ? ratingMap.get(item.productId) : undefined;
        const creditKey = `${order.id}-${item.productId}`;
        const productCredit = creditMap.get(creditKey);

        if (!item.product) {
          return {
            id: item.productId || 'deleted',
            name: 'Deleted Product',
            description: 'This product is no longer available',
            price: Number(item.unitPrice),
            isPrivateLabel: false,
            ratingCount: 0,
            averageRating: 0,
            quantity: item.quantity,
            rateable: false,
            totalPrice: Number(item.totalPrice),
            hasUserRated: !!userRating,
            rewardAmount: 0,
            userRating: userRating ? {
              score: userRating.score,
              comment: userRating.comment,
              createdAt: userRating.createdAt,
              id: userRating.id
            } : undefined,
            rewardInfo: undefined
          };
        }

        return {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: Number(item.product.price),
          isPrivateLabel: item.product.isPrivateLabel,
          ratingCount: item.product.ratingCount,
          averageRating: Number(item.product.averageRating),
          quantity: item.quantity,
          rateable: true, // Always true if in order
          totalPrice: Number(item.totalPrice),
          hasUserRated: !!userRating,
          rewardAmount: Number(item.product.rewardAmount),
          userRating: userRating ? {
            score: userRating.score,
            comment: userRating.comment,
            createdAt: userRating.createdAt,
            id: userRating.id
          } : undefined,
          rewardInfo: productCredit ? {
            allocatedCredit: Number(productCredit.allocatedCredit),
            ratingPoints: productCredit.ratingPoints,
            canEarnReward: true
          } : undefined
        };
      });

      return {
        orderId: order.id,
        orderDate: order.createdAt,
        totalAmount: Number(order.totalAmount),
        bonusEarned: Number(order.bonusEarned),
        products,
        createdAt: order.createdAt
      };
    });
  }

  /**
   * Get products from user's orders that haven't been rated yet
   */
  async getUnratedProducts(): Promise<ProductInOrderDto[]> {

    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');
    const userId = user.id;

    // Get all completed orders (first page)
    const response = await this.getMyOrders({ limit: 100 });
    const orders = response.data;

    // Flatten and filter to only unrated products
    const unratedProducts: ProductInOrderDto[] = [];

    orders.forEach(order => {
      order.products.forEach(product => {
        if (!product.hasUserRated && product.rateable) {
          unratedProducts.push(product);
        }
      });
    });

    // Remove duplicates
    const uniqueProducts = Array.from(
      new Map(unratedProducts.map(p => [p.id, p])).values()
    );

    // Sort: PL first, then by rating count
    return uniqueProducts.sort((a, b) => {
      if (a.isPrivateLabel !== b.isPrivateLabel) {
        return a.isPrivateLabel ? -1 : 1;
      }
      return b.ratingCount - a.ratingCount;
    });
  }

  /**
   * Get order statistics for a user
   */
  async getOrderStats() {

    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');
    const userId = user.id;

    const stats = await this.ordersRepository
      .createQueryBuilder('order')
      .select('COUNT(*)', 'totalOrders')
      .addSelect('SUM(order.totalAmount)', 'totalSpent')
      .addSelect('SUM(order.bonusEarned)', 'totalBonusEarned')
      .where('order.userId = :userId', { userId })
      .getRawOne();

    return {
      totalOrders: parseInt(stats.totalOrders) || 0,
      totalSpent: parseFloat(stats.totalSpent) || 0,
      totalBonusEarned: parseFloat(stats.totalBonusEarned) || 0
    };
  }

  /**
   * Delete an order and all its related items (Admin only)
   * Cascades handle OrderItem and ProductCredit cleanup
   */
  async deleteOrder(id: string): Promise<{ id: string; message: string; deletedAt: Date }> {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.ordersRepository.remove(order);

    return {
      id,
      message: 'Order deleted successfully',
      deletedAt: new Date(),
    };
  }
}