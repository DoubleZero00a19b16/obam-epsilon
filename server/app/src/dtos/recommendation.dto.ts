import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsOptional, IsString, Max, Min } from 'class-validator';
import { RecommendationActionType, RecommendationStatus } from '@/entities/recommendation.entity';

export class CreateRecommendationDto {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Main market where action applies' })
  @IsString()
  marketId: string;

  @ApiProperty({ enum: RecommendationActionType })
  @IsEnum(RecommendationActionType)
  actionType: RecommendationActionType;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  actionPayload?: Record<string, any>;

  @ApiPropertyOptional({ type: Object, description: 'Alias for actionPayload' })
  @IsOptional()
  @IsObject()
  payload?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ minimum: 0, maximum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  confidenceScore?: number;
}

export class RecommendationResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  productId: string;

  @ApiProperty({ format: 'uuid' })
  marketId: string;

  @ApiProperty({ enum: RecommendationActionType })
  actionType: RecommendationActionType;

  @ApiPropertyOptional({ type: Object })
  actionPayload?: Record<string, any>;

  @ApiProperty({ enum: RecommendationStatus })
  status: RecommendationStatus;

  @ApiPropertyOptional()
  reason?: string;

  @ApiPropertyOptional({ minimum: 0, maximum: 1 })
  confidenceScore?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  lastEvaluatedAt?: Date;

  @ApiPropertyOptional({ format: 'uuid' })
  approvedBy?: string;

  @ApiPropertyOptional()
  approvedAt?: Date;
}

export class GetRecommendationsQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(1000)
  limit?: number = 10;

  @ApiPropertyOptional({ enum: RecommendationStatus })
  @IsOptional()
  @IsEnum(RecommendationStatus)
  status?: RecommendationStatus;
}
