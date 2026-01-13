# Swagger API Documentation Guide

## 📚 Accessing Swagger UI

Once the application is running, you can access the interactive API documentation at:

**URL:** `http://localhost:3000/api/docs`

The Swagger UI provides:
- Interactive API testing
- Request/response schemas
- Example payloads
- Authentication testing
- Automatic validation

## 🎯 What's Included

### Complete OpenAPI Specification

The Swagger documentation includes:

1. **All API Endpoints**
   - Orders endpoints (4 endpoints)
   - Ratings endpoints (4 endpoints)

2. **Request/Response Models**
   - DTOs with validation rules
   - Example values
   - Field descriptions

3. **Authentication Setup**
   - Bearer token configuration (ready for JWT)
   - Authorization persistence

4. **Error Responses**
   - 400 Bad Request
   - 404 Not Found
   - 409 Conflict

## 🚀 Using Swagger UI

### Step 1: Start the Application
```bash
npm run start:dev
```

### Step 2: Open Swagger UI
Navigate to: `http://localhost:3000/api/docs`

### Step 3: Explore Endpoints

**Orders Section:**
- `GET /api/v1/orders/my-orders` - Fetch purchase history
- `GET /api/v1/orders/:orderId` - Get specific order
- `GET /api/v1/orders/my-orders/unrated` - Unrated products
- `GET /api/v1/orders/my-orders/stats` - Order statistics

**Ratings Section:**
- `POST /api/v1/ratings` - Submit rating
- `GET /api/v1/ratings/product/:productId` - Get product ratings
- `GET /api/v1/ratings/product/:productId/stats` - Rating stats
- `GET /api/v1/ratings/my-ratings` - User's ratings

### Step 4: Test Endpoints

#### Example: Submit a Rating

1. Click on `POST /api/v1/ratings`
2. Click "Try it out"
3. Fill in the request body:
```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440012",
  "score": 5,
  "comment": "Amazing product!"
}
```
4. Click "Execute"
5. View the response

## 📊 Response Examples

### Successful Rating Submission (201)
```json
{
  "statusCode": 201,
  "message": "Rating submitted successfully! You earned 30 bonus points ($0.03)",
  "data": {
    "id": "rating-uuid",
    "productId": "product-uuid",
    "productName": "Signature Chocolate Cookies",
    "score": 5,
    "comment": "Amazing cookies!",
    "rewardPoints": 30,
    "rewardAmount": 0.03,
    "createdAt": "2024-12-20T15:30:00.000Z"
  }
}
```

## 🔐 Authentication (Future Implementation)

The Swagger UI is configured with Bearer authentication:

1. Click "Authorize" button (top right)
2. Enter JWT token: `Bearer <your-token>`
3. Click "Authorize"
4. Token will be included in all requests

---

**Swagger Status:** ✅ Fully Implemented  
**Endpoints Documented:** 8/8  
**DTOs with Examples:** All  
**Authentication Ready:** Yes (JWT prepared)
