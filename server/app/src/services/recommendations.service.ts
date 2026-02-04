import { CreateRecommendationDto, GetRecommendationsQueryDto, RecommendationResponseDto } from '@/dtos/recommendation.dto';
import { Recommendation, RecommendationStatus } from '@/entities/recommendation.entity';
import { User } from '@/entities/user.entity';
import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';
import { PaginatedResponseDto } from '@/dtos/pagination.dto';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationRepo: Repository<Recommendation>,
    private readonly clsService: ClsService,
  ) { }

  private toDto(entity: Recommendation): RecommendationResponseDto {
    return {
      id: entity.id,
      productId: entity.productId,
      marketId: entity.marketId,
      actionType: entity.actionType,
      actionPayload: entity.actionPayload ?? undefined,
      status: entity.status,
      reason: entity.reason ?? undefined,
      confidenceScore: entity.confidenceScore ?? undefined,
      createdAt: entity.createdAt,
      lastEvaluatedAt: entity.lastEvaluatedAt ?? undefined,
      approvedBy: entity.approvedBy ?? undefined,
      approvedAt: entity.approvedAt ?? undefined,
    };
  }

  private getCurrentAdmin(): User {
    const user = this.clsService.get<User>('user');
    if (!user) throw new ForbiddenException('User not identified');
    return user;
  }

  async create(dto: CreateRecommendationDto): Promise<RecommendationResponseDto> {
    const entity = this.recommendationRepo.create();
    entity.productId = dto.productId;
    entity.marketId = dto.marketId;
    entity.actionType = dto.actionType;
    entity.actionPayload = dto.actionPayload ?? dto.payload;
    entity.reason = dto.reason;
    entity.confidenceScore = dto.confidenceScore;
    entity.status = RecommendationStatus.ACTIVE;

    const saved = await this.recommendationRepo.save(entity);
    return this.toDto(saved);
  }

  async createMany(dtos: CreateRecommendationDto[]): Promise<RecommendationResponseDto[]> {
    const entities = dtos.map((dto) => {
      const entity = this.recommendationRepo.create();
      entity.productId = dto.productId;
      entity.marketId = dto.marketId;
      entity.actionType = dto.actionType;
      entity.actionPayload = dto.actionPayload ?? dto.payload;
      entity.reason = dto.reason;
      entity.confidenceScore = dto.confidenceScore;
      entity.status = RecommendationStatus.ACTIVE;
      return entity;
    });

    const saved = await this.recommendationRepo.save(entities);
    return saved.map((s) => this.toDto(s));
  }

  async findAll(query: GetRecommendationsQueryDto): Promise<PaginatedResponseDto<RecommendationResponseDto>> {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;

    const [items, total] = await this.recommendationRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      take: limit,
      skip,
    });

    return {
      data: items.map((i) => this.toDto(i)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<RecommendationResponseDto> {
    const entity = await this.recommendationRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Recommendation not found');
    return this.toDto(entity);
  }

  async approve(id: string): Promise<RecommendationResponseDto> {
    const admin = this.getCurrentAdmin();

    const entity = await this.recommendationRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Recommendation not found');

    if (entity.status !== RecommendationStatus.ACTIVE) {
      throw new ConflictException('Only active recommendations can be approved');
    }

    if (entity.approvedAt) {
      throw new ConflictException('Recommendation is already approved/denied');
    }

    entity.approvedBy = admin.id;
    entity.approvedAt = new Date();

    const saved = await this.recommendationRepo.save(entity);
    return this.toDto(saved);
  }

  async deny(id: string): Promise<RecommendationResponseDto> {
    const admin = this.getCurrentAdmin();

    const entity = await this.recommendationRepo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Recommendation not found');

    if (entity.status !== RecommendationStatus.ACTIVE) {
      throw new ConflictException('Only active recommendations can be denied');
    }

    if (entity.approvedAt) {
      throw new ConflictException('Recommendation is already approved/denied');
    }

    entity.status = RecommendationStatus.STOPPED;
    entity.approvedBy = admin.id;
    entity.approvedAt = new Date();

    const saved = await this.recommendationRepo.save(entity);
    return this.toDto(saved);
  }

  async checkExists(productId: string, marketId: string): Promise<{ value: 0 | 1 }> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const rec = await this.recommendationRepo.findOne({
      where: {
        productId: String(productId),
        marketId: String(marketId),
      },
      order: { createdAt: 'DESC' },
    });

    if (!rec) {
      return { value: 1 };
    }

    const isWithin7Days = rec.createdAt >= sevenDaysAgo;
    return { value: isWithin7Days ? 0 : 1 };
  }
}
