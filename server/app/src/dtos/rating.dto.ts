import { IsNotEmpty, IsUUID, IsInt, Min, Max, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationParamsDto, PaginatedResponseDto } from './pagination.dto';

export class CreateRatingDto {
  @ApiProperty({
    description: 'UUID of the product to rate',
    example: '550e8400-e29b-41d4-a716-446655440012',
  })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'Rating score from 1 to 5 stars',
    minimum: 1,
    maximum: 5,
    example: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Rating score must be at least 1' })
  @Max(5, { message: 'Rating score must be at most 5' })
  score: number;

  @ApiPropertyOptional({
    description: 'Optional comment about the product (will be automatically classified by AI)',
    example: 'Amazing product! The quality is excellent and price is reasonable.',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({
    description: 'Reason for low rating (manual selection or AI classified)',
    example: 'Price',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class UpdateRatingDto {
  @ApiPropertyOptional({ description: 'New rating score', minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  score?: number;

  @ApiPropertyOptional({ description: 'New user comment', maxLength: 500 })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  comment?: string;

  @ApiPropertyOptional({ description: 'Reason for rating change' })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class RatingResponseDto {
  @ApiProperty({ description: 'Rating ID', example: '550e8400-e29b-41d4-a716-446655440100' })
  id: string;

  @ApiProperty({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440012' })
  productId: string;

  @ApiProperty({ description: 'Product name', example: 'Signature Chocolate Cookies' })
  productName: string;

  @ApiProperty({ description: 'Rating score (1-5)', example: 5, minimum: 1, maximum: 5 })
  score: number;

  @ApiProperty({ description: 'User comment', example: 'Amazing cookies!', nullable: true })
  comment: string | null;

  @ApiProperty({ description: 'Reason for rating', example: 'Quality', nullable: true })
  reason: string | null;

  @ApiProperty({ description: 'Reward points earned', example: 520 })
  rewardPoints: number;

  @ApiProperty({ description: 'Reward amount in dollars', example: 0.52 })
  rewardAmount: number;

  @ApiProperty({ description: 'Rating creation date', example: '2024-12-23T15:30:00.000Z' })
  createdAt: Date;
}

export class RatingWithClassificationsDto extends RatingResponseDto {
  @ApiProperty({
    description: 'AI-generated topic classifications',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        topicLabel: { type: 'string', example: 'Quality' },
        topicConfidence: { type: 'number', example: 0.87 },
      },
    },
  })
  aiClassifications: Array<{
    topicLabel: string;
    topicConfidence: number;
  }>;
}


export class ProductRatingStatsDto {
  @ApiProperty({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440012' })
  productId: string;

  @ApiProperty({ description: 'Average rating score', example: 4.8 })
  averageRating: number;

  @ApiProperty({ description: 'Total number of ratings', example: 421 })
  totalRatings: number;

  @ApiProperty({
    description: 'Distribution of ratings by score',
    example: { 1: 2, 2: 5, 3: 18, 4: 94, 5: 302 },
  })
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };

  @ApiProperty({
    description: 'Most common topics mentioned in comments',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        topicLabel: { type: 'string', example: 'Quality' },
        count: { type: 'number', example: 125 },
        percentage: { type: 'number', example: 35.5 },
      },
    },
  })
  topTopics: Array<{
    topicLabel: string;
    count: number;
    percentage: number;
  }>;
}