# Setup & Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- MySQL 8.0+
- Git

## Initial Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd bonus-card-rating-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

**Required Configuration:**
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_secure_password
DB_DATABASE=bonus_card_rating

# Application
PORT=3000
NODE_ENV=development
```

### 4. Create MySQL Database
```bash
mysql -u root -p
```

```sql
CREATE DATABASE bonus_card_rating CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

### 5. Run Database Migrations
```bash
npm run migration:run
```

This will create all required tables with proper indexes:
- `users`
- `bonus_cards`
- `products`
- `orders`
- `order_items`
- `ratings`
- `reward_transactions`

### 6. Seed Sample Data (Optional)
```bash
npm run seed
```

This creates:
- 1 test user (john.doe@example.com)
- 1 bonus card
- 4 PL products
- 5 normal products
- 2 completed orders

---

## Running the Application

### Development Mode
```bash
npm run start:dev
```

The API will be available at: `http://localhost:3000/api/v1`

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

---

## Database Schema Verification

### Check Tables
```sql
USE bonus_card_rating;
SHOW TABLES;
```

Expected output:
```
+--------------------------------+
| Tables_in_bonus_card_rating   |
+--------------------------------+
| bonus_cards                    |
| migrations                     |
| order_items                    |
| orders                         |
| products                       |
| ratings                        |
| reward_transactions            |
| users                          |
+--------------------------------+
```

### Verify Indexes
```sql
-- Check product indexes (crucial for sorting performance)
SHOW INDEX FROM products;

-- Should include:
-- idx_product_sorting (is_private_label, rating_count)
-- idx_is_private_label
-- idx_rating_count
```

### Check Sample Data
```sql
-- Count products by type
SELECT 
  isPrivateLabel,
  COUNT(*) as count,
  AVG(ratingCount) as avg_ratings
FROM products
GROUP BY isPrivateLabel;

-- View orders with items
SELECT 
  o.id,
  o.status,
  o.totalAmount,
  COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.orderId
GROUP BY o.id;
```

---

## Testing the API

### 1. Test Health Check
```bash
curl http://localhost:3000/api/v1/orders/my-orders
```

### 2. Test Rating Submission
```bash
curl -X POST "http://localhost:3000/api/v1/ratings" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "550e8400-e29b-41d4-a716-446655440012",
    "score": 5,
    "comment": "Great product!"
  }'
```

### 3. Verify Transaction Atomicity
```bash
# Check user balance before rating
SELECT id, email, bonusBalance FROM users WHERE email = 'john.doe@example.com';

# Submit a rating (use curl command above)

# Check balance after - should increase by 0.03 for PL product
SELECT id, email, bonusBalance FROM users WHERE email = 'john.doe@example.com';

# Verify reward transaction was created
SELECT * FROM reward_transactions ORDER BY createdAt DESC LIMIT 1;

# Verify product rating count increased
SELECT id, name, ratingCount, averageRating FROM products 
WHERE id = '550e8400-e29b-41d4-a716-446655440012';
```

---

## Performance Optimization

### Index Usage Verification
```sql
-- Explain query plan for sorted products
EXPLAIN SELECT * FROM products 
ORDER BY is_private_label DESC, rating_count DESC;

-- Should show: Using index for ordering
```

### Query Performance Testing
```sql
-- Test sorting performance with large dataset
SELECT 
  p.id,
  p.name,
  p.is_private_label,
  p.rating_count
FROM products p
ORDER BY p.is_private_label DESC, p.rating_count DESC
LIMIT 100;

-- Should execute in < 10ms with proper indexes
```

---

## Common Issues & Solutions

### Issue: Migration Fails
**Solution:**
```bash
# Check if database exists
mysql -u root -p -e "SHOW DATABASES LIKE 'bonus_card_rating';"

# If not, create it
mysql -u root -p -e "CREATE DATABASE bonus_card_rating;"

# Retry migration
npm run migration:run
```

### Issue: Port Already in Use
**Solution:**
```bash
# Change port in .env
PORT=3001

# Or kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: Cannot Connect to MySQL
**Solution:**
```bash
# Verify MySQL is running
sudo systemctl status mysql

# Start MySQL if not running
sudo systemctl start mysql

# Check connection
mysql -u root -p -e "SELECT 1;"
```

### Issue: Seed Data Already Exists
**Solution:**
```sql
-- Clear existing data
TRUNCATE TABLE reward_transactions;
TRUNCATE TABLE ratings;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE bonus_cards;
TRUNCATE TABLE users;

-- Re-run seed
npm run seed
```

---

## Production Deployment

### 1. Environment Configuration
```env
NODE_ENV=production
DB_SYNCHRONIZE=false
DB_LOGGING=false
```

### 2. Security Checklist
- [ ] Change default passwords
- [ ] Enable SSL for MySQL connection
- [ ] Set up JWT authentication
- [ ] Configure CORS for production domains
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### 3. Database Optimization
```sql
-- Add additional indexes if needed
ALTER TABLE ratings ADD INDEX idx_created_desc (createdAt DESC);

-- Analyze tables for query optimization
ANALYZE TABLE products, ratings, orders;

-- Optimize tables
OPTIMIZE TABLE products, ratings, orders;
```

### 4. Backup Strategy
```bash
# Daily database backup
mysqldump -u root -p bonus_card_rating > backup_$(date +%Y%m%d).sql

# Automated backup script
0 2 * * * /usr/bin/mysqldump -u root -pYOURPASS bonus_card_rating | gzip > /backups/bonus_card_rating_$(date +\%Y\%m\%d_\%H\%M\%S).sql.gz
```

---

## Monitoring

### Key Metrics to Track
1. **Rating submission success rate**
2. **Average response time for /my-orders endpoint**
3. **Database query execution time**
4. **Transaction rollback rate**
5. **Bonus balance accuracy**

### Database Monitoring Queries
```sql
-- Check rating activity
SELECT 
  DATE(createdAt) as date,
  COUNT(*) as total_ratings,
  AVG(score) as avg_score
FROM ratings
GROUP BY DATE(createdAt)
ORDER BY date DESC
LIMIT 30;

-- Monitor reward distribution
SELECT 
  type,
  COUNT(*) as count,
  SUM(amount) as total_amount
FROM reward_transactions
GROUP BY type;

-- Check product popularity
SELECT 
  p.name,
  p.isPrivateLabel,
  p.ratingCount,
  p.averageRating
FROM products p
ORDER BY p.ratingCount DESC
LIMIT 20;
```

---

## Development Tips

### Hot Reload
The development server automatically reloads on code changes.

### Database Schema Changes
```bash
# After modifying entities, generate a new migration
npm run migration:generate -- src/migrations/YourMigrationName

# Run the migration
npm run migration:run

# Revert if needed
npm run migration:revert
```

### Testing Transactions
Use MySQL Workbench or DBeaver to:
1. Start a transaction manually
2. Execute rating submission
3. Verify all related tables are updated
4. Test rollback scenarios

---

## Support & Resources

- **API Documentation:** See `API_DOCUMENTATION.md`
- **Entity Documentation:** See inline comments in entity files
- **NestJS Docs:** https://docs.nestjs.com
- **TypeORM Docs:** https://typeorm.io
