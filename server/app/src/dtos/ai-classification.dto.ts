import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class AiClassificationDto {
  @ApiProperty({
    description: 'Classification ID',
    example: 1,
  })
  classificationId: number;

  @ApiProperty({
    description: 'Rating ID this classification belongs to',
    example: '550e8400-e29b-41d4-a716-446655440100',
  })
  ratingId: string;

  @ApiProperty({
    description: 'Topic label identified by AI',
    example: 'Quality',
    enum: ['Quality', 'Price', 'Packaging', 'Taste', 'Service', 'Delivery', 'Other'],
  })
  topicLabel: string;

  @ApiProperty({
    description: 'AI model confidence score (0-1)',
    example: 0.95,
    minimum: 0,
    maximum: 1,
  })
  topicConfidence: number;

  @ApiProperty({
    description: 'The comment text that was classified',
    example: 'The product quality is excellent!',
  })
  comment: string;

  @ApiProperty({
    description: 'Classification creation date',
    example: '2024-12-23T10:30:00.000Z',
  })
  createdAt: Date;
}

export class CreateAiClassificationDto {
  @ApiProperty({
    description: 'Rating ID to classify',
    example: '550e8400-e29b-41d4-a716-446655440100',
  })
  @IsNotEmpty()
  @IsString()
  ratingId: string;

  @ApiProperty({
    description: 'Topic label',
    example: 'Quality',
  })
  @IsNotEmpty()
  @IsString()
  topicLabel: string;

  @ApiProperty({
    description: 'Confidence score (0-1)',
    example: 0.95,
    minimum: 0,
    maximum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  topicConfidence: number;

  @ApiPropertyOptional({
    description: 'Comment text',
    example: 'The product quality is excellent!',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class ClassificationStatsDto {
  @ApiProperty({
    description: 'Topic label',
    example: 'Quality',
  })
  topicLabel: string;

  @ApiProperty({
    description: 'Number of mentions',
    example: 125,
  })
  count: number;

  @ApiProperty({
    description: 'Average confidence score',
    example: 0.87,
  })
  averageConfidence: number;

  @ApiProperty({
    description: 'Percentage of total classifications',
    example: 35.5,
  })
  percentage: number;
}