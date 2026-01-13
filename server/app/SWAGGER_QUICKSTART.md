# Swagger Quick Reference

## 🚀 Quick Start

```bash
# Start the application
npm run start:dev

# Access Swagger UI
open http://localhost:3000/api/docs
```

## 📍 Key URLs

| URL | Description |
|-----|-------------|
| `http://localhost:3000/api/docs` | Swagger UI (Interactive) |
| `http://localhost:3000/api/docs-json` | OpenAPI JSON Spec |

## 🎯 Swagger Features Implemented

### ✅ Complete Coverage
- **8 Endpoints** fully documented
- **All DTOs** with examples and validation
- **Request/Response** schemas with types
- **Error responses** documented (400, 404, 409)
- **Query parameters** with validation rules
- **Path parameters** with examples

### ✅ Interactive Testing
- Try all endpoints in browser
- No external tools needed
- Automatic request validation
- Live response preview

### ✅ Authentication Ready
- Bearer token configuration
- JWT support prepared
- Authorization persistence
- Token refresh ready

## 📋 Available Endpoints

### Orders (Tag: orders)
```
GET  /api/v1/orders/my-orders         - Get purchase history
GET  /api/v1/orders/:orderId          - Get specific order
GET  /api/v1/orders/my-orders/unrated - Get unrated products
GET  /api/v1/orders/my-orders/stats   - Get order statistics
```

### Ratings (Tag: ratings)
```
POST /api/v1/ratings                     - Submit rating
GET  /api/v1/ratings/product/:productId  - Get product ratings
GET  /api/v1/ratings/product/:productId/stats - Get rating stats
GET  /api/v1/ratings/my-ratings          - Get my ratings
```

## 🧪 Testing Flow

1. **Start Application**
   ```bash
   npm run seed  # Load sample data
   npm run start:dev
   ```

2. **Open Swagger**
   - Navigate to `http://localhost:3000/api/docs`

3. **Try GET /orders/my-orders**
   - Click endpoint → "Try it out" → "Execute"
   - See products sorted by PL status and popularity

4. **Try POST /ratings**
   - Click endpoint → "Try it out"
   - Use sample product ID from previous step
   - Submit rating with score and comment
   - See bonus points awarded

5. **Verify Updates**
   - Check "my-ratings" endpoint
   - Verify product rating count increased

## 💡 Tips

### Copy Sample Product IDs
From seed data:
```
PL Products:
- 550e8400-e29b-41d4-a716-446655440010 (Coffee)
- 550e8400-e29b-41d4-a716-446655440011 (Milk)
- 550e8400-e29b-41d4-a716-446655440012 (Cookies)

Normal Products:
- 550e8400-e29b-41d4-a716-446655440020 (Coca-Cola)
- 550e8400-e29b-41d4-a716-446655440021 (Chips)
```

### Sample Rating Request
```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440012",
  "score": 5,
  "comment": "Excellent product!"
}
```

### Test Low Rating (Requires Comment)
```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440020",
  "score": 2,
  "comment": "Product quality was below expectations. Not fresh."
}
```

## 📦 Export OpenAPI Spec

From Swagger UI:
1. Click on `/api/docs-json` link (top of page)
2. Copy JSON specification
3. Use with:
   - Postman (import collection)
   - Code generators
   - Frontend TypeScript types

## 🎨 Swagger Decorators Used

### Controllers
```typescript
@ApiTags('ratings')
@ApiOperation({ summary: '...', description: '...' })
@ApiResponse({ status: 201, type: RatingResponseDto })
@ApiParam({ name: 'id', description: '...' })
@ApiQuery({ name: 'status', enum: OrderStatus })
```

### DTOs
```typescript
@ApiProperty({ description: '...', example: 5 })
@ApiPropertyOptional({ description: '...', minLength: 10 })
```

## ⚙️ Configuration

Location: `src/main.ts`

```typescript
const config = new DocumentBuilder()
  .setTitle('Bonus Card Rating System API')
  .setDescription('...')
  .setVersion('1.0')
  .addTag('orders')
  .addTag('ratings')
  .addBearerAuth()
  .build();
```

## 🔗 Related Documentation

- **Full Guide**: [SWAGGER_GUIDE.md](SWAGGER_GUIDE.md)
- **API Docs**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Setup**: [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

**Status**: ✅ Production Ready  
**Coverage**: 100% of endpoints  
**Interactive**: Yes  
**Authentication**: JWT Ready
