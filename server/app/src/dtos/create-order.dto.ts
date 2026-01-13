import { IsNotEmpty, IsString, IsArray, ValidateNested, IsNumber, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'Product ID to add to order',
    example: '550e8400-e29b-41d4-a716-446655440012',
  })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 2,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Bonus card number used for this purchase',
    example: 'BC-2024-001234',
  })
  @IsNotEmpty()
  @IsString()
  bonusCardNumber: string;

  @ApiProperty({
    description: 'List of products and quantities to order',
    type: [CreateOrderItemDto],
    example: [
      { productId: '550e8400-e29b-41d4-a716-446655440012', quantity: 2 },
      { productId: '550e8400-e29b-41d4-a716-446655440020', quantity: 1 },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({
    description: 'Market Id',
    example: '94021cad-e008-11f0-a98e-7440e2b1cdee',
  })
  @IsNotEmpty()
  @IsString()
  marketId: string;
}

export class OrderCreatedResponseDto {
  @ApiProperty({ description: 'Order ID', example: '550e8400-e29b-41d4-a716-446655440030' })
  orderId: string;

  @ApiProperty({ description: 'Order creation date', example: '2024-12-20T15:30:00.000Z' })
  orderDate: Date;

  @ApiProperty({ description: 'Total order amount', example: 45.92 })
  totalAmount: number;

  @ApiProperty({ description: 'Bonus earned from this purchase (5% cashback)', example: 2.30 })
  bonusEarned: number;

  @ApiProperty({ description: 'Number of items in order', example: 3 })
  itemCount: number;

  @ApiProperty({
    description: 'Products ordered',
    example: [
      {
        productId: '550e8400-e29b-41d4-a716-446655440012',
        productName: 'Signature Chocolate Cookies',
        quantity: 2,
        unitPrice: 6.99,
        totalPrice: 13.98,
      },
    ],
  })
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}