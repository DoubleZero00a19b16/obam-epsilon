import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductInOrderDto {
  @ApiProperty({ description: 'Product ID', example: '550e8400-e29b-41d4-a716-446655440012' })
  id: string;

  @ApiProperty({ description: 'Product name', example: 'Signature Chocolate Cookies' })
  name: string;

  @ApiProperty({ description: 'Product description', example: 'Decadent chocolate chip cookies' })
  description: string;

  @ApiProperty({ description: 'Product price', example: 6.99 })
  price: number;

  @ApiProperty({ description: 'Is this a Private Label product', example: true })
  isPrivateLabel: boolean;

  @ApiProperty({ description: 'Total number of ratings', example: 421 })
  ratingCount: number;

  @ApiProperty({ description: 'Average rating score', example: 4.8 })
  averageRating: number;

  @ApiProperty({ description: 'Quantity ordered', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Total price for this product', example: 13.98 })
  totalPrice: number;

  @ApiProperty({ description: 'Has the user rated this product', example: false })
  hasUserRated: boolean;

  @ApiProperty({ description: 'Can this product be rated', example: true })
  rateable: boolean;

  @ApiProperty({ description: 'Standard reward amount for rating this product', example: 0.10 })
  rewardAmount: number;

  @ApiPropertyOptional({
    description: 'User\'s rating for this product if exists',
    example: { score: 5, comment: 'Great!', createdAt: '2024-12-20T15:30:00.000Z' },
  })
  userRating?: {
    score: number;
    comment: string | null;
    createdAt: Date;
  };
}

export class MyOrdersResponseDto {
  @ApiProperty({ description: 'Order ID', example: '550e8400-e29b-41d4-a716-446655440030' })
  orderId: string;

  @ApiProperty({ description: 'Order date', example: '2024-12-15T10:30:00.000Z' })
  orderDate: Date;

  @ApiProperty({ description: 'Total order amount', example: 45.92 })
  totalAmount: number;

  @ApiProperty({ description: 'Bonus earned from purchase', example: 2.30 })
  bonusEarned: number;

  @ApiProperty({ description: 'Products in this order', type: [ProductInOrderDto] })
  products: ProductInOrderDto[];
}

export class GetMyOrdersQueryDto {
  @ApiPropertyOptional({
    description: 'Maximum number of orders to return',
    example: 50,
    default: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Number of orders to skip for pagination',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}

export class DeleteOrderResponseDto {
  @ApiProperty({ description: 'Order ID', example: '550e8400-e29b-41d4-a716-446655440030' })
  id: string;

  @ApiProperty({ description: 'Status message', example: 'Order deleted successfully' })
  message: string;

  @ApiProperty({ description: 'Timestamp of deletion', example: '2024-12-20T15:30:00.000Z' })
  deletedAt: Date;
}
