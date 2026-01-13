import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('order_items')
@Index('idx_order_product', ['orderId', 'productId'])
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_order_item_order')
  @Column({ type: 'uuid' })
  orderId: string;

  @Index('idx_order_item_product')
  @Column({ type: 'uuid' })
  productId: string;

  @Column({ 
    type: 'int',
    unsigned: true,
    comment: 'Quantity of this product in the order'
  })
  quantity: number;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    comment: 'Unit price at time of purchase'
  })
  unitPrice: number;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2,
    comment: 'Total price for this line item (quantity × unitPrice)'
  })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => Order, order => order.items)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
