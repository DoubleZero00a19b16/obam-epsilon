// dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, Min, MaxLength } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Organic Apple',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: 'Fresh organic apples from local farm',
    description: 'Detailed description of the product',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'APP-001',
    description: 'Stock Keeping Unit',
  })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({
    example: true,
    description: 'Whether users can rate this product',
    default: true,
  })
  @IsBoolean()
  allowedRating: boolean;

  @ApiProperty({
    example: 0.10,
    description: 'Static reward amount in dollars for rating this product',
    default: 0.00,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  rewardAmount?: number;

  @ApiProperty({
    example: 2.99,
    description: 'Price of the product',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Is this a Private Label product?',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrivateLabel?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Is product active in catalog?',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Is this a new product?',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isNew?: boolean;
}

