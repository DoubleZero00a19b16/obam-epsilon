import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AiClassification } from '@/entities/ai-classification.entity';
import { Rating } from '@/entities/rating.entity';
import { CreateAiClassificationDto, ClassificationStatsDto } from '@/dtos/ai-classification.dto';

interface FastAPIClassificationResponse {
  topic_label: string;
  confidence: number;
}

@Injectable()
export class AiClassificationService {
  private readonly fastApiUrl: string;

  constructor(
    @InjectRepository(AiClassification)
    private aiClassificationRepo: Repository<AiClassification>,
    @InjectRepository(Rating)
    private ratingRepo: Repository<Rating>,
    private configService: ConfigService,
  ) {
    // Get FastAPI URL from environment or use default
    this.fastApiUrl = this.configService.get<string>(
      'FASTAPI_URL',
      'http://fastapi-api:8000'
    );
  }

  /**
   * Classify a comment using FastAPI ML model
   * Falls back to keyword-based classification if API is unavailable
   */
  async classifyComment(ratingId: string, comment: string): Promise<AiClassification[]> {
    // Check if rating exists
    const rating = await this.ratingRepo.findOne({ where: { id: ratingId } });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    if (!comment || comment.trim().length === 0) {
      return [];
    }

    try {
      // Call FastAPI classification service
      const classification = await this.callFastAPIClassification(comment);
      
      if (classification.topic_label) {
        // Save classification to database
        const aiClassification = this.aiClassificationRepo.create({
          ratingId,
          topicLabel: classification.topic_label,
          topicConfidence: Number(classification.confidence.toFixed(2)),
          comment,
        });

        const saved = await this.aiClassificationRepo.save(aiClassification);
        return [saved];
      } else {
        // return await this.fallbackKeywordClassification(ratingId, comment);
        throw new ConflictException("CONFLICT HAPPENED!"); ////// ERROR
      }
    } catch (error) {
      console.error('FastAPI classification failed, using fallback:', error);
      // Fallback to keyword-based classification
      return await this.fallbackKeywordClassification(ratingId, comment);
    }
  }

  async rawCommentClassify(comment: string) {
    if (!comment || comment.trim().length === 0) {
      return [];
    }

    try {
      // Call FastAPI classification service
      const classification = await this.callFastAPIClassification(comment);
      
      if (!classification.topic_label) {
        throw new ConflictException("CONFLICT HAPPENED!"); ////// ERROR
      }

      return classification
    } catch (error) {
      console.error('FastAPI classification failed, using fallback:', error);
    }
  }

  /**
   * Call FastAPI classification endpoint
   */
  private async callFastAPIClassification(comment: string): Promise<FastAPIClassificationResponse> {
    const response = await fetch(`${this.fastApiUrl}/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      throw new Error(`FastAPI returned ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Fallback keyword-based classification
   * Used when FastAPI is unavailable or returns "Other"
   */
  private async fallbackKeywordClassification(
    ratingId: string,
    comment: string,
  ): Promise<AiClassification[]> {
    const commentLower = comment.toLowerCase();
    const classifications: CreateAiClassificationDto[] = [];

    // Simple keyword-based detection as fallback
    const topics = {
      Keyfiyyət: {
        keywords: ['keyfiyyət', 'quality', 'yaxşı', 'pis', 'əla', 'mükəmməl'],
        confidence: 0,
      },
      Qiymət: {
        keywords: ['qiymət', 'price', 'bahá', 'ucuz', 'baha', 'əlverişli'],
        confidence: 0,
      },
      Qablaşdırma: {
        keywords: ['qablaşdırma', 'paket', 'qutu', 'bükülmüş'],
        confidence: 0,
      },
      Dad: {
        keywords: ['dad', 'ləzzət', 'taste', 'dadlı', 'ləzzətli'],
        confidence: 0,
      },
      Xidmət: {
        keywords: ['xidmət', 'service', 'işçi', 'personal'],
        confidence: 0,
      },
      Çatdırılma: {
        keywords: ['çatdırılma', 'delivery', 'yetişdirilmə', 'tez', 'gec'],
        confidence: 0,
      },
    };

    // Calculate confidence scores
    Object.entries(topics).forEach(([label, config]) => {
      let matchCount = 0;
      config.keywords.forEach(keyword => {
        if (commentLower.includes(keyword)) {
          matchCount++;
        }
      });

      if (matchCount > 0) {
        const confidence = Math.min(0.5 + (matchCount * 0.15), 0.99);
        classifications.push({
          ratingId,
          topicLabel: label,
          topicConfidence: Number(confidence.toFixed(2)),
          comment,
        });
      }
    });

    // If no topics detected, classify as "Other"
    if (classifications.length === 0) {
      classifications.push({
        ratingId,
        topicLabel: 'Digər',
        topicConfidence: 0.50,
        comment,
      });
    }

    // Save all classifications
    const savedClassifications: AiClassification[] = [];
    for (const classificationDto of classifications) {
      const classification = this.aiClassificationRepo.create(classificationDto);
      const saved = await this.aiClassificationRepo.save(classification);
      savedClassifications.push(saved);
    }

    return savedClassifications;
  }

  /**
   * Get all classifications for a rating
   */
  async getClassificationsByRating(ratingId: string): Promise<AiClassification[]> {
    return await this.aiClassificationRepo.find({
      where: { ratingId },
      order: { topicConfidence: 'DESC' },
    });
  }

  /**
   * Get all classifications for a product
   */
  async getClassificationsByProduct(productId: string): Promise<AiClassification[]> {
    return await this.aiClassificationRepo
      .createQueryBuilder('classification')
      .innerJoin('classification.rating', 'rating')
      .where('rating.productId = :productId', { productId })
      .orderBy('classification.topicConfidence', 'DESC')
      .getMany();
  }

  /**
   * Get classification statistics for a product
   */
  async getProductClassificationStats(productId: string): Promise<ClassificationStatsDto[]> {
    const classifications = await this.aiClassificationRepo
      .createQueryBuilder('classification')
      .select('classification.topicLabel', 'topicLabel')
      .addSelect('COUNT(*)', 'count')
      .addSelect('AVG(classification.topicConfidence)', 'averageConfidence')
      .innerJoin('classification.rating', 'rating')
      .where('rating.productId = :productId', { productId })
      .groupBy('classification.topicLabel')
      .orderBy('count', 'DESC')
      .getRawMany();

    const totalCount = classifications.reduce((sum, item) => sum + parseInt(item.count), 0);

    return classifications.map(item => ({
      topicLabel: item.topicLabel,
      count: parseInt(item.count),
      averageConfidence: parseFloat(parseFloat(item.averageConfidence).toFixed(2)),
      percentage: parseFloat(((parseInt(item.count) / totalCount) * 100).toFixed(1)),
    }));
  }

  /**
   * Classify a rating's comment using the AI classification system
   * This is a transaction-aware wrapper that can be used within transactions
   * Used when creating or updating ratings
   * 
   * @param ratingId - UUID of the rating
   * @param comment - Comment text to classify
   * @param manager - Optional transaction manager for atomic operations
   * @returns Array of AI classifications
   */
  async classifyRating(
    ratingId: string, 
    comment: string, 
    manager?: any
  ): Promise<AiClassification[]> {
    if (!comment || comment.trim().length === 0) {
      return [];
    }

    const commentLower = comment.toLowerCase();
    const classifications: CreateAiClassificationDto[] = [];

    const classification = await this.rawCommentClassify(comment)

    // console.log(classification);

    if (classifications.length === 0 && classification) {
      classifications.push({
        ratingId,
        topicLabel: classification["topic_label"],
        topicConfidence: classification["confidence"],
        comment,
      });
    }

    // Save classifications to database (using transaction manager if provided)
    const savedClassifications: AiClassification[] = [];
    
    if (manager) {
      // Use transaction manager for atomic operations
      for (const classificationDto of classifications) {
        const classification = manager.create(AiClassification, classificationDto);
        const saved = await manager.save(AiClassification, classification);
        savedClassifications.push(saved);
      }
    } else {
      // Use regular repository
      for (const classificationDto of classifications) {
        const classification = this.aiClassificationRepo.create(classificationDto);
        const saved = await this.aiClassificationRepo.save(classification);
        savedClassifications.push(saved);
      }
    }

    return savedClassifications;
  }

  /**
   * Get all classifications with pagination
   */
  async findAll(limit: number = 50, offset: number = 0): Promise<AiClassification[]> {
    return await this.aiClassificationRepo.find({
      relations: ['rating', 'rating.user', 'rating.product'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get classification by ID
   */
  async findOne(classificationId: number): Promise<AiClassification> {
    const classification = await this.aiClassificationRepo.findOne({
      where: { classificationId },
      relations: ['rating', 'rating.user', 'rating.product'],
    });

    if (!classification) {
      throw new NotFoundException('Classification not found');
    }

    return classification;
  }

  /**
   * Delete classification
   */
  async remove(classificationId: number): Promise<void> {
    const classification = await this.findOne(classificationId);
    await this.aiClassificationRepo.remove(classification);
  }

  /**
   * Get topic distribution across all products
   */
  async getGlobalTopicDistribution(): Promise<ClassificationStatsDto[]> {
    const classifications = await this.aiClassificationRepo
      .createQueryBuilder('classification')
      .select('classification.topicLabel', 'topicLabel')
      .addSelect('COUNT(*)', 'count')
      .addSelect('AVG(classification.topicConfidence)', 'averageConfidence')
      .groupBy('classification.topicLabel')
      .orderBy('count', 'DESC')
      .getRawMany();

    const totalCount = classifications.reduce((sum, item) => sum + parseInt(item.count), 0);

    return classifications.map(item => ({
      topicLabel: item.topicLabel,
      count: parseInt(item.count),
      averageConfidence: parseFloat(parseFloat(item.averageConfidence).toFixed(2)),
      percentage: parseFloat(((parseInt(item.count) / totalCount) * 100).toFixed(1)),
    }));
  }

  /**
   * Health check for FastAPI service
   */
  async checkFastAPIHealth(): Promise<{ available: boolean; url: string }> {
    try {
      const response = await fetch(`${this.fastApiUrl}/docs`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000), // 3 second timeout
      });
      return {
        available: response.ok,
        url: this.fastApiUrl,
      };
    } catch (error) {
      return {
        available: false,
        url: this.fastApiUrl,
      };
    }
  }

  
}