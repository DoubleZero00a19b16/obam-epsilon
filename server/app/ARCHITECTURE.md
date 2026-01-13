# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT APPLICATION                        │
│                     (Mobile/Web Interface)                       │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │ HTTP/REST API
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│                         NestJS API Server                        │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Controllers Layer                          │   │
│  │  • OrdersController  • RatingsController               │   │
│  └────────────────────┬────────────────────────────────────┘   │
│                       │                                          │
│  ┌────────────────────▼───────────────────────────────────┐    │
│  │              Services Layer                            │    │
│  │  • OrdersService   • RatingsService                    │    │
│  │  • Business Logic  • Validation                        │    │
│  └────────────────────┬───────────────────────────────────┘    │
│                       │                                          │
│  ┌────────────────────▼───────────────────────────────────┐    │
│  │              TypeORM Repository Layer                  │    │
│  │  • Entity Managers  • Query Builders                   │    │
│  └────────────────────┬───────────────────────────────────┘    │
└───────────────────────┼──────────────────────────────────────────┘
                        │
                        │ MySQL Protocol
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                      MySQL Database                              │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    users     │  │bonus_cards   │  │  products    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   orders     │  │ order_items  │  │   ratings    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌─────────────────────────────┐                                │
│  │  reward_transactions        │                                │
│  └─────────────────────────────┘                                │
└──────────────────────────────────────────────────────────────────┘
```

## Database Schema Relationships

```
┌──────────────┐           ┌──────────────┐
│    users     │◄─────────┤ bonus_cards  │
│              │   1:1     │              │
│ • id (PK)    │           │ • userId (FK)│
│ • email      │           │ • cardNumber │
│ • bonusBalance          │              │
└──────┬───────┘           └──────────────┘
       │
       │ 1:N
       │
┌──────▼───────┐           ┌──────────────┐
│   orders     │◄──────────┤ order_items  │
│              │   1:N     │              │
│ • id (PK)    │           │ • orderId(FK)│
│ • userId(FK) │           │ • productId  │
│ • status     │           │   (FK)       │
└──────────────┘           └──────┬───────┘
                                  │
                                  │ N:1
                                  │
                           ┌──────▼───────┐
                           │  products    │
                           │              │
                           │ • id (PK)    │
       ┌───────────────────┤ • isPrivate  │
       │                   │   Label      │
       │                   │ • ratingCount│
       │ N:1               └──────┬───────┘
       │                          │
       │                          │ 1:N
┌──────▼───────┐           ┌──────▼───────┐
│   ratings    │           │              │
│              │───────────►              │
│ • id (PK)    │   N:1     │              │
│ • userId(FK) │           │              │
│ • productId  │           │              │
│   (FK)       │           │              │
│ • score      │           │              │
│ • rewardPts  │           │              │
└──────┬───────┘           └──────────────┘
       │
       │ 1:1
       │
┌──────▼─────────────────┐
│ reward_transactions    │
│                        │
│ • id (PK)              │
│ • userId (FK)          │
│ • ratingId (FK)        │
│ • amount               │
│ • balanceAfter         │
└────────────────────────┘
```

## Data Flow: Rating Submission

```
┌───────────────────────────────────────────────────────────────────┐
│                       1. User Submits Rating                      │
│                                                                   │
│  Request: POST /api/v1/ratings                                   │
│  Body: { productId, score, comment }                             │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────────────┐
│                    2. Controller Validation                       │
│                                                                   │
│  • Validate DTO (score 1-5, comment if score ≤3)                │
│  • Extract authenticated user ID                                 │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────────────┐
│                    3. Service Layer Processing                    │
│                                                                   │
│  RatingsService.createRating()                                   │
│  ├─ Verify product exists                                        │
│  ├─ Verify user purchased product                                │
│  ├─ Check if already rated                                       │
│  └─ Calculate reward (30pts PL, 10pts normal)                   │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────────────┐
│              4. Database Transaction (ATOMIC)                     │
│                                                                   │
│  START TRANSACTION                                               │
│  ├─ INSERT INTO ratings                                          │
│  ├─ UPDATE products SET ratingCount++, averageRating            │
│  ├─ UPDATE users SET bonusBalance += reward                     │
│  └─ INSERT INTO reward_transactions                              │
│  COMMIT                                                          │
│                                                                   │
│  ↓ If any step fails → ROLLBACK all changes                     │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────────────┐
│                    5. Response to Client                          │
│                                                                   │
│  {                                                               │
│    message: "You earned 30 points!",                            │
│    data: { rating details, reward info }                        │
│  }                                                               │
└───────────────────────────────────────────────────────────────────┘
```

## Sorting Algorithm Flow

```
┌───────────────────────────────────────────────────────────────────┐
│              User Requests: GET /orders/my-orders                 │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────────────┐
│                   Query Orders by User ID                         │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────────────┐
│            Join Order Items with Products                         │
│                                                                   │
│  SELECT * FROM order_items                                        │
│  JOIN products ON order_items.productId = products.id            │
│  WHERE order_items.orderId IN (user's orders)                    │
│  ORDER BY                                                         │
│    products.is_private_label DESC,  ← PL first                  │
│    products.rating_count DESC        ← Most popular first        │
│                                                                   │
│  ✓ Uses composite index: idx_product_sorting                     │
└─────────────────────────┬─────────────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────────────┐
│                    Results Sorted:                                │
│                                                                   │
│  1. PL Product A (ratingCount: 421) ← Highest rated PL          │
│  2. PL Product B (ratingCount: 245)                              │
│  3. PL Product C (ratingCount: 189)                              │
│  4. Normal Product X (ratingCount: 1234) ← Highest rated normal  │
│  5. Normal Product Y (ratingCount: 892)                          │
│  6. Normal Product Z (ratingCount: 567)                          │
└───────────────────────────────────────────────────────────────────┘
```

## Key Performance Optimizations

### 1. Database Indexes
```sql
-- Composite index for efficient sorting
CREATE INDEX idx_product_sorting 
ON products(is_private_label DESC, rating_count DESC);

-- Individual indexes for flexible queries
CREATE INDEX idx_is_private_label ON products(is_private_label);
CREATE INDEX idx_rating_count ON products(rating_count);

-- User-product uniqueness for ratings
CREATE UNIQUE INDEX idx_user_product_unique 
ON ratings(userId, productId);
```

### 2. Transaction Isolation
```typescript
// Ensures ACID properties
await queryRunner.startTransaction();
try {
  // All operations
  await queryRunner.commitTransaction();
} catch (error) {
  await queryRunner.rollbackTransaction();
}
```

### 3. Eager Loading
```typescript
// Reduce N+1 queries
await repository.find({
  relations: ['product', 'user'],
  order: { createdAt: 'DESC' }
});
```

## Security Considerations

1. **Input Validation**: All DTOs use class-validator
2. **SQL Injection Prevention**: TypeORM parameterized queries
3. **Transaction Atomicity**: Prevents partial updates
4. **Duplicate Prevention**: Unique index on (userId, productId)
5. **Purchase Verification**: Users can only rate purchased products

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer in front
- Multiple NestJS instances

### Database Optimization
- Read replicas for heavy read operations
- Connection pooling
- Query result caching
- Partition large tables by date

### Caching Strategy
```
GET /products → Cache for 5 minutes
GET /orders/my-orders → Cache per user, 1 minute
POST /ratings → Invalidate related caches
```

## Budget Allocation Model

```
┌─────────────────────────────────────────────────────────────┐
│            Total Bonus Card Budget: 100%                    │
└──────────────────┬──────────────────────────────────────────┘
                   │
          ┌────────┴────────┐
          │                 │
┌─────────▼────────┐ ┌──────▼──────────┐
│  Standard Pool   │ │  Rating Pool    │
│      50%         │ │      50%        │
│                  │ │                 │
│ • Purchase       │ │ • PL: 30 pts   │
│   Cashback       │ │ • Normal: 10pts│
│ • Regular bonus  │ │ • Per review   │
└──────────────────┘ └─────────────────┘

Conversion: 10 points = $0.01
```

## Error Handling Flow

```
┌──────────────────┐
│ Rating Request   │
└────────┬─────────┘
         │
    ┌────▼─────────────────────────────┐
    │  Validation Error?               │
    │  (score, comment, format)        │
    └─────┬──────────────┬─────────────┘
          │ YES          │ NO
          │              │
   ┌──────▼──────┐      │
   │ 400 Bad     │      │
   │ Request     │      │
   └─────────────┘      │
                   ┌────▼───────────────────┐
                   │ Product Exists?        │
                   └────┬────────────┬──────┘
                        │ NO         │ YES
                 ┌──────▼────┐      │
                 │ 404 Not   │      │
                 │ Found     │      │
                 └───────────┘      │
                             ┌──────▼──────────────┐
                             │ Already Rated?      │
                             └──────┬──────┬───────┘
                                    │ YES  │ NO
                             ┌──────▼───┐  │
                             │ 409      │  │
                             │ Conflict │  │
                             └──────────┘  │
                                      ┌────▼─────┐
                                      │ Process  │
                                      │ Rating   │
                                      └──────────┘
```
