import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { BonusCard } from '../entities/bonus-card.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ProductCredit } from '../entities/product-credit.entity';
import * as bcrypt from 'bcrypt';

export async function seedDatabase(dataSource: DataSource) {
  console.log('🌱 Starting database seeding...');

  const userRepository = dataSource.getRepository(User);
  const bonusCardRepository = dataSource.getRepository(BonusCard);
  const productRepository = dataSource.getRepository(Product);
  const orderRepository = dataSource.getRepository(Order);
  const orderItemRepository = dataSource.getRepository(OrderItem);
  const productCreditRepository = dataSource.getRepository(ProductCredit);

  // Create test user
  console.log('Creating test user...');
  // const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = userRepository.create({
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Admin',
    surname: "Adminov",
    dateOfBirth: new Date(2007, 7, 31),
    phone: "+994701234567",
    password: 'password123',
    bonusBalance: 5.50,
  });
  await userRepository.save(user);

  // Create bonus card for user
  console.log('Creating bonus card...');
  const bonusCard = bonusCardRepository.create({
    id: '550e8400-e29b-41d4-a716-446655440002',
    cardNumber: 'BC-2024-001234',
    userId: user.id,
    isActive: true,
  });
  await bonusCardRepository.save(bonusCard);

  // Create PL (Private Label) Products
  console.log('Creating PL products...');
  const plProducts = [
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      name: 'Premium Store Brand Coffee',
      description: 'Rich, aromatic coffee beans from our exclusive line',
      sku: 'PL-COFFEE-001',
      price: 12.99,
      isPrivateLabel: true,
      ratingCount: 245,
      averageRating: 4.7,
      isActive: true,
      allowedRating: true
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      name: 'Store Brand Organic Milk',
      description: 'Fresh organic milk from local farms',
      sku: 'PL-MILK-001',
      price: 4.99,
      isPrivateLabel: true,
      ratingCount: 189,
      averageRating: 4.5,
      isActive: true,
      allowedRating: false
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      name: 'Signature Chocolate Cookies',
      description: 'Decadent chocolate chip cookies made with premium ingredients',
      sku: 'PL-COOK-001',
      price: 6.99,
      isPrivateLabel: true,
      ratingCount: 421,
      averageRating: 4.8,
      isActive: true,
      allowedRating: false
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440013',
      name: 'House Brand Pasta',
      description: 'Italian-style pasta made with durum wheat',
      sku: 'PL-PASTA-001',
      price: 3.49,
      isPrivateLabel: true,
      ratingCount: 156,
      averageRating: 4.4,
      isActive: true,
      allowedRating: true
    },
  ];

  for (const data of plProducts) {
    const product = productRepository.create(data);
    await productRepository.save(product);
  }

  // Create Normal Products
  console.log('Creating normal products...');
  const normalProducts = [
    {
      id: '550e8400-e29b-41d4-a716-446655440020',
      name: 'Coca-Cola 2L',
      description: 'Classic Coca-Cola soft drink',
      sku: 'BEV-COKE-2L',
      price: 2.99,
      isPrivateLabel: false,
      ratingCount: 1234,
      averageRating: 4.6,
      isActive: true,
      allowedRating: false
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440021',
      name: 'Lay\'s Potato Chips',
      description: 'Crispy potato chips in classic flavor',
      sku: 'SNK-LAYS-001',
      price: 3.99,
      isPrivateLabel: false,
      ratingCount: 892,
      averageRating: 4.4,
      isActive: true,
      allowedRating: false
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440022',
      name: 'Kellogg\'s Corn Flakes',
      description: 'Classic breakfast cereal',
      sku: 'CER-KELL-001',
      price: 5.49,
      isPrivateLabel: false,
      ratingCount: 567,
      averageRating: 4.3,
      isActive: true,
      allowedRating: true
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440023',
      name: 'Tropicana Orange Juice',
      description: 'Fresh squeezed orange juice',
      sku: 'JUI-TROP-001',
      price: 6.99,
      isPrivateLabel: false,
      ratingCount: 345,
      averageRating: 4.5,
      isActive: true,
      allowedRating: true
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440024',
      name: 'Dove Soap Bar',
      description: 'Moisturizing beauty bar',
      sku: 'HYG-DOVE-001',
      price: 4.49,
      isPrivateLabel: false,
      ratingCount: 78,
      averageRating: 4.2,
      isActive: true,
      allowedRating: true
    },
  ];

  for (const data of normalProducts) {
    const product = productRepository.create(data);
    await productRepository.save(product);
  }

  // Create sample orders
  // console.log('Creating sample orders...');
  
  // Order 1 - Mix of PL and Normal products
  // const order1 = orderRepository.create({
  //   id: '550e8400-e29b-41d4-a716-446655440030',
  //   userId: user.id,
  //   bonusCardNumber: bonusCard.cardNumber,
  //   totalAmount: 45.92,
  //   bonusEarned: 2.30, // 5% cashback
  //   marketId: "94021cad-e008-11f0-a98e-7440e2b1cdee"
  // });
  // await orderRepository.save(order1);

  // const order1Items = [
  //   {
  //     orderId: order1.id,
  //     productId: plProducts[0].id, // PL Coffee
  //     quantity: 1,
  //     unitPrice: 12.99,
  //     totalPrice: 12.99,
  //   },
  //   {
  //     orderId: order1.id,
  //     productId: plProducts[1].id, // PL Milk
  //     quantity: 2,
  //     unitPrice: 4.99,
  //     totalPrice: 9.98,
  //   },
  //   {
  //     orderId: order1.id,
  //     productId: normalProducts[0].id, // Coca-Cola
  //     quantity: 2,
  //     unitPrice: 2.99,
  //     totalPrice: 5.98,
  //   },
  //   {
  //     orderId: order1.id,
  //     productId: normalProducts[1].id, // Lay's Chips
  //     quantity: 1,
  //     unitPrice: 3.99,
  //     totalPrice: 3.99,
  //   },
  //   {
  //     orderId: order1.id,
  //     productId: plProducts[2].id, // PL Cookies
  //     quantity: 2,
  //     unitPrice: 6.99,
  //     totalPrice: 13.98,
  //   },
  // ];

  // for (const item of order1Items) {
  //   const orderItem = orderItemRepository.create(item);
  //   await orderItemRepository.save(orderItem);
  // }

  // Order 2 - More recent order
  // const order2 = orderRepository.create({
  //   id: '550e8400-e29b-41d4-a716-446655440031',
  //   userId: user.id,
  //   bonusCardNumber: bonusCard.cardNumber,
  //   totalAmount: 28.44,
  //   bonusEarned: 1.42,
  //   marketId: "94020ed4-e008-11f0-a98e-7440e2b1cdee"
  // });
  // await orderRepository.save(order2);

  // const order2Items = [
  //   {
  //     orderId: order2.id,
  //     productId: normalProducts[2].id, // Corn Flakes
  //     quantity: 1,
  //     unitPrice: 5.49,
  //     totalPrice: 5.49,
  //   },
  //   {
  //     orderId: order2.id,
  //     productId: normalProducts[3].id, // Orange Juice
  //     quantity: 2,
  //     unitPrice: 6.99,
  //     totalPrice: 13.98,
  //   },
  //   {
  //     orderId: order2.id,
  //     productId: plProducts[3].id, // PL Pasta
  //     quantity: 3,
  //     unitPrice: 3.49,
  //     totalPrice: 10.47,
  //   },
  //   {
  //     orderId: order2.id,
  //     productId: normalProducts[4].id, // Dove Soap
  //     quantity: 1,
  //     unitPrice: 4.49,
  //     totalPrice: 4.49,
  //   },
  // ];

  // for (const item of order2Items) {
  //   const orderItem = orderItemRepository.create(item);
  //   await orderItemRepository.save(orderItem);
  // }

  // ===== CREATE PRODUCT CREDITS FOR ORDERS =====
  // console.log('Creating product credits for orders...');

  // const createProductCredits = async (orderId: string, orderItems: any[], orderTotal: number) => {
  //   const RATING_POOL_PERCENTAGE = 0.50;
  //   const PURCHASE_CASHBACK_RATE = 0.02;
  //   const PL_POOL_RATIO = 0.70;
  //   const NORMAL_POOL_RATIO = 0.30;
  //   const MAX_PRIORITY_PRODUCTS = 5;

  //   // Calculate rating reward pool
  //   const bonusEarned = orderTotal * PURCHASE_CASHBACK_RATE;
  //   const ratingRewardPool = bonusEarned * RATING_POOL_PERCENTAGE;

  //   // Get product details for items
  //   const itemsWithProducts = await Promise.all(
  //     orderItems.map(async (item) => {
  //       const product = await productRepository.findOne({ where: { id: item.productId } });
  //       return { ...item, product };
  //     })
  //   );

  //   // Separate PL and normal products
  //   const plProducts = itemsWithProducts.filter(item => item.product.isPrivateLabel);
  //   const normalProducts = itemsWithProducts.filter(item => !item.product.isPrivateLabel);

  //   // Sort by rating count (fewer ratings first)
  //   const sortByRatingCount = (items: any[]) => {
  //     return items.sort((a, b) => a.product.ratingCount - b.product.ratingCount);
  //   };

  //   const sortedPl = sortByRatingCount([...plProducts]);
  //   const sortedNormal = sortByRatingCount([...normalProducts]);

  //   // Take top 5 priority products
  //   const priorityPl = sortedPl.slice(0, MAX_PRIORITY_PRODUCTS);
  //   const priorityNormal = sortedNormal.slice(0, MAX_PRIORITY_PRODUCTS);

  //   // Calculate pool amounts
  //   const plPoolAmount = ratingRewardPool * PL_POOL_RATIO;
  //   const normalPoolAmount = ratingRewardPool * NORMAL_POOL_RATIO;

  //   // Weight calculation
  //   const calculateWeight = (ratingCount: number) => 1 / (ratingCount + 1);

  //   // Calculate total weights
  //   const totalPlWeight = priorityPl.reduce((sum, item) => sum + calculateWeight(item.product.ratingCount), 0);
  //   const totalNormalWeight = priorityNormal.reduce((sum, item) => sum + calculateWeight(item.product.ratingCount), 0);

  //   // Create credits for PL products
  //   if (priorityPl.length > 0 && totalPlWeight > 0) {
  //     for (const item of priorityPl) {
  //       const weight = calculateWeight(item.product.ratingCount);
  //       const allocatedCredit = plPoolAmount * (weight / totalPlWeight);
  //       const proportionalPoints = Math.round(allocatedCredit / 0.001);

  //       const credit = productCreditRepository.create({
  //         orderId,
  //         productId: item.productId,
  //         productPrice: item.totalPrice,
  //         allocatedCredit: Number(allocatedCredit.toFixed(4)),
  //         ratingPoints: proportionalPoints,
  //         isClaimed: false,
  //       });
  //       await productCreditRepository.save(credit);
  //     }
  //   }

  //   // Create credits for normal products
  //   if (priorityNormal.length > 0 && totalNormalWeight > 0) {
  //     for (const item of priorityNormal) {
  //       const weight = calculateWeight(item.product.ratingCount);
  //       const allocatedCredit = normalPoolAmount * (weight / totalNormalWeight);
  //       const proportionalPoints = Math.round(allocatedCredit / 0.001);

  //       const credit = productCreditRepository.create({
  //         orderId,
  //         productId: item.productId,
  //         productPrice: item.totalPrice,
  //         allocatedCredit: Number(allocatedCredit.toFixed(4)),
  //         ratingPoints: proportionalPoints,
  //         isClaimed: false,
  //       });
  //       await productCreditRepository.save(credit);
  //     }
  //   }
  // };

  // Create credits for both orders
  // await createProductCredits(order1.id, order1Items, 45.92);
  // await createProductCredits(order2.id, order2Items, 28.44);

  console.log('✅ Database seeding completed!');
  console.log('');
  console.log('Test User Credentials:');
  console.log('Email: john.doe@example.com');
  console.log('Password: password123');
  console.log('Bonus Card: BC-2024-001234');
  console.log('Current Balance: $5.50');
  console.log('');
  console.log('Sample Data Summary:');
  console.log('- 4 PL Products (30 points reward each)');
  console.log('- 5 Normal Products (10 points reward each)');
  console.log('- 2 Completed Orders with 9 total products');
  console.log('- User can rate all 9 products and earn bonus points!');
}