# API Documentation

Base URL: `http://localhost:3000/api/v1`

## Authentication
All endpoints require JWT authentication (to be implemented). For development, a mock user ID is used.

---

## Orders Endpoints

### 1. Get My Orders
Retrieve user's purchase history with products sorted by PL status and rating count.

**Endpoint:** `GET /orders/my-orders`

**Query Parameters:**
- `status` (optional): Filter by order status (`pending`, `completed`, `cancelled`, `refunded`)
- `limit` (optional): Number of orders to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/v1/orders/my-orders?status=completed&limit=10"
```

**Example Response:**
```json
{
  "statusCode": 200,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "orderId": "550e8400-e29b-41d4-a716-446655440030",
      "orderDate": "2024-12-15T10:30:00.000Z",
      "orderStatus": "completed",
      "totalAmount": 45.92,
      "bonusEarned": 2.30,
      "products": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440012",
          "name": "Signature Chocolate Cookies",
          "description": "Decadent chocolate chip cookies",
          "price": 6.99,
          "isPrivateLabel": true,
          "ratingCount": 421,
          "averageRating": 4.8,
          "quantity": 2,
          "totalPrice": 13.98,
          "hasUserRated": false
        },
        {
          "id": "550e8400-e29b-41d4-a716-446655440010",
          "name": "Premium Store Brand Coffee",
          "description": "Rich, aromatic coffee beans",
          "price": 12.99,
          "isPrivateLabel": true,
          "ratingCount": 245,
          "averageRating": 4.7,
          "quantity": 1,
          "totalPrice": 12.99,
          "hasUserRated": false
        }
      ]
    }
  ]
}
```

**Sorting Logic:**
Products are sorted by:
1. **Primary:** `isPrivateLabel` (DESC) - PL products appear first
2. **Secondary:** `ratingCount` (DESC) - Most popular products first within each group

---

### 2. Get Unrated Products
Fetch products that the user has purchased but hasn't rated yet.

**Endpoint:** `GET /orders/my-orders/unrated`

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/v1/orders/my-orders/unrated"
```

**Example Response:**
```json
{
  "statusCode": 200,
  "message": "You have 5 product(s) waiting for your review! Rate them to earn bonus points.",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440012",
      "name": "Signature Chocolate Cookies",
      "isPrivateLabel": true,
      "ratingCount": 421,
      "hasUserRated": false
    }
  ]
}
```

---

### 3. Get Order Statistics
Get user's order statistics including total spent and bonus earned.

**Endpoint:** `GET /orders/my-orders/stats`

**Example Response:**
```json
{
  "statusCode": 200,
  "data": {
    "totalOrders": 12,
    "totalSpent": 456.78,
    "totalBonusEarned": 22.84
  }
}
```

---

## Ratings Endpoints

### 1. Submit a Rating
Submit a product rating and earn bonus points.

**Endpoint:** `POST /ratings`

**Request Body:**
```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440012",
  "score": 5,
  "comment": "Amazing cookies! Best I've ever had." // Optional for scores 4-5
}
```

**For Low Ratings (≤3):**
```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440020",
  "score": 2,
  "comment": "Product arrived damaged and tasted stale." // REQUIRED
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/v1/ratings" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "550e8400-e29b-41d4-a716-446655440012",
    "score": 5,
    "comment": "Amazing cookies!"
  }'
```

**Example Response:**
```json
{
  "statusCode": 201,
  "message": "Rating submitted successfully! You earned 30 bonus points ($0.03)",
  "data": {
    "id": "rating-uuid",
    "productId": "550e8400-e29b-41d4-a716-446655440012",
    "productName": "Signature Chocolate Cookies",
    "score": 5,
    "comment": "Amazing cookies!",
    "rewardPoints": 30,
    "rewardAmount": 0.03,
    "createdAt": "2024-12-20T15:30:00.000Z"
  }
}
```

**Reward Calculation:**
- **PL Products:** 30 points = $0.03
- **Normal Products:** 10 points = $0.01

**Validation Rules:**
- Score must be 1-5
- Comment **required** for scores ≤3 (minimum 10 characters)
- Comment **optional** for scores ≥4
- User must have purchased the product
- User can only rate each product once

---

### 2. Get Product Ratings
Retrieve all ratings for a specific product.

**Endpoint:** `GET /ratings/product/:productId`

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/v1/ratings/product/550e8400-e29b-41d4-a716-446655440012"
```

**Example Response:**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "rating-1",
      "productId": "550e8400-e29b-41d4-a716-446655440012",
      "productName": "Signature Chocolate Cookies",
      "score": 5,
      "comment": "Amazing cookies!",
      "rewardPoints": 30,
      "rewardAmount": 0.03,
      "createdAt": "2024-12-20T15:30:00.000Z"
    }
  ]
}
```

---

### 3. Get Product Rating Statistics
Get detailed rating statistics including distribution.

**Endpoint:** `GET /ratings/product/:productId/stats`

**Example Response:**
```json
{
  "statusCode": 200,
  "data": {
    "productId": "550e8400-e29b-41d4-a716-446655440012",
    "averageRating": 4.8,
    "totalRatings": 421,
    "ratingDistribution": {
      "1": 2,
      "2": 5,
      "3": 18,
      "4": 94,
      "5": 302
    }
  }
}
```

---

### 4. Get My Ratings
Retrieve all ratings submitted by the authenticated user.

**Endpoint:** `GET /ratings/my-ratings`

**Example Response:**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "rating-1",
      "productId": "550e8400-e29b-41d4-a716-446655440012",
      "productName": "Signature Chocolate Cookies",
      "score": 5,
      "comment": "Amazing cookies!",
      "rewardPoints": 30,
      "rewardAmount": 0.03,
      "createdAt": "2024-12-20T15:30:00.000Z"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Comment is required for ratings of 3 or below",
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Product not found or is not active",
  "error": "Not Found"
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "You have already rated this product",
  "error": "Conflict"
}
```

---

## Database Transaction Guarantees

When submitting a rating, the following operations occur **atomically** in a single transaction:

1. Create rating record
2. Update product rating statistics (count and average)
3. Update user bonus balance
4. Create reward transaction audit record

If any step fails, **all changes are rolled back** to maintain data consistency.

---

## Testing with Sample Data

After running the seed script, you can test with:

**Test User:**
- Email: john.doe@example.com
- Password: password123
- Bonus Card: BC-2024-001234
- Current Balance: $5.50

**Available Products to Rate:**
- 4 PL Products (30 points each)
- 5 Normal Products (10 points each)
- Total potential earnings: 170 points = $0.17

**Example Flow:**
```bash
# 1. Get your orders
curl -X GET "http://localhost:3000/api/v1/orders/my-orders"

# 2. Get unrated products
curl -X GET "http://localhost:3000/api/v1/orders/my-orders/unrated"

# 3. Rate a PL product (earn 30 points)
curl -X POST "http://localhost:3000/api/v1/ratings" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "550e8400-e29b-41d4-a716-446655440012",
    "score": 5,
    "comment": "Excellent product!"
  }'

# 4. Check your ratings
curl -X GET "http://localhost:3000/api/v1/ratings/my-ratings"
```
