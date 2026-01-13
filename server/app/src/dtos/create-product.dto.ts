// dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsBoolean()
  allowedRating: boolean;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsBoolean()
  @IsOptional()
  isPrivateLabel?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

