import mysql.connector
from faker import Faker
import uuid
import random

fake = Faker()

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="OkuBoku7002!",
    database="bonus_card_rating",
    port=3306
)

cursor = conn.cursor()

users = []

for _ in range(150):
    user_id = str(uuid.uuid4())
    users.append(user_id)

    cursor.execute("""
        INSERT INTO users (id, name, surname, phone, dateOfBirth, password, bonusBalance)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (
        user_id,
        fake.first_name(),
        fake.last_name(),
        fake.unique.phone_number()[:20],
        fake.date_between(start_date='-40y', end_date='-18y'),
        "Password123",   # hashed by TypeORM if inserted via app
        0.00
    ))

    cursor.execute("""
        INSERT INTO bonus_cards (id, cardNumber, userId, isActive)
        VALUES (%s,%s,%s,%s)
    """, (
        str(uuid.uuid4()),
        fake.unique.bothify("BC-########"),
        user_id,
        True
    ))


conn.commit()

products = []

for _ in range(300):
    product_id = str(uuid.uuid4())
    products.append(product_id)

    is_pl = random.random() < 0.25

    cursor.execute("""
        INSERT INTO products
        (id, name, description, sku, price, is_private_label, rating_count, average_rating, is_active)
        VALUES (%s,%s,%s,%s,%s,%s,0,0,1)
    """, (
        product_id,
        fake.word().capitalize(),
        fake.text(120),
        fake.unique.bothify("SKU-#####"),
        round(random.uniform(0.5, 50), 2),
        is_pl
    ))

conn.commit()

markets = [
  {
    "id": "94020ed4-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Elmlər Akademiyası",
    "description": "",
    "address": "Elmlər Akad. metrosu yaxınlığı, Bakı",
    "latitude": 40.37598,
    "longitude": 49.81342,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "94021cad-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – İnşaatçılar",
    "description": "",
    "address": "İnşaatçılar prospekti, Bakı",
    "latitude": 40.37821,
    "longitude": 49.80015,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "94021d58-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Nərimanov",
    "description": "",
    "address": "Əhməd Rəcəbli küç., Bakı",
    "latitude": 40.40378,
    "longitude": 49.86123,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "94021d9e-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Gənclik",
    "description": "",
    "address": "Atatürk prospekti, Bakı",
    "latitude": 40.40095,
    "longitude": 49.85214,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "94021e01-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – 28 May",
    "description": "",
    "address": "28 May küç., Bakı",
    "latitude": 40.37987,
    "longitude": 49.84893,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "94021e41-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Ağ Şəhər",
    "description": "",
    "address": "Ağ Şəhər, Xətai, Bakı",
    "latitude": 40.39244,
    "longitude": 49.88821,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "94021e79-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Bayıl",
    "description": "",
    "address": "Bayıl qəsəbəsi, Bakı",
    "latitude": 40.33472,
    "longitude": 49.82291,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "94021eaf-e008-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Badamdar",
    "description": "",
    "address": "Badamdar qəsəbəsi, Bakı",
    "latitude": 40.33998,
    "longitude": 49.80123,
    "isActive": 1,
    "createdAt": "2025-12-23 18:06:29.000000",
    "updatedAt": "2025-12-23 18:06:29.000000"
  },
  {
    "id": "b4454f4f-e007-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Mikayil Müşfiq",
    "description": "",
    "address": "Mikayil Müşfiq küç. 10, Bakı",
    "latitude": 40.365038,
    "longitude": 49.821724,
    "isActive": 1,
    "createdAt": "2025-12-23 18:00:14.000000",
    "updatedAt": "2025-12-23 18:00:14.000000"
  },
  {
    "id": "b446aa40-e007-11f0-a98e-7440e2b1cdee",
    "name": "OBA Market – Sumqayıt Cəfər Cabbarlı",
    "description": "",
    "address": "Cəfər Cabbarlı küç. 12, Sumqayıt",
    "latitude": 40.58998,
    "longitude": 49.66824,
    "isActive": 1,
    "createdAt": "2025-12-23 18:00:14.000000",
    "updatedAt": "2025-12-23 18:00:14.000000"
  },
  {
    "id": "mkt-001",
    "name": "OBA Market – Elmlər Akademiyası",
    "description": "",
    "address": "Elmlər Akad. metrosu yaxınlığı, Bakı",
    "latitude": 40.37598,
    "longitude": 49.81342,
    "isActive": 1,
    "createdAt": "2025-12-24 08:57:54.886652",
    "updatedAt": "2025-12-24 08:57:54.886652"
  },
  {
    "id": "mkt-002",
    "name": "OBA Market – İnşaatçılar",
    "description": "",
    "address": "İnşaatçılar prospekti, Bakı",
    "latitude": 40.37821,
    "longitude": 49.80015,
    "isActive": 1,
    "createdAt": "2025-12-24 08:57:54.886652",
    "updatedAt": "2025-12-24 08:57:54.886652"
  },
  {
    "id": "mkt-003",
    "name": "OBA Market – Nərimanov",
    "description": "",
    "address": "Əhməd Rəcəbli küç., Bakı",
    "latitude": 40.40378,
    "longitude": 49.86123,
    "isActive": 1,
    "createdAt": "2025-12-24 08:57:54.886652",
    "updatedAt": "2025-12-24 08:57:54.886652"
  }
]


orders = []

for _ in range(1200):
    order_id = str(uuid.uuid4())
    user_id = random.choice(users)
    market_id = random.choice(markets)["id"]

    cursor.execute("""
        INSERT INTO orders
        (id, userId, bonusCardNumber, totalAmount, bonusEarned, marketId)
        VALUES (%s,%s,%s,0,0,%s)
    """, (
        order_id,
        user_id,
        fake.bothify("BC-########"),
        market_id
    ))

    total = 0
    items = random.randint(1, 5)

    for _ in range(items):
        product_id = random.choice(products)
        quantity = random.randint(1, 4)
        unit_price = round(random.uniform(1, 40), 2)
        line_total = unit_price * quantity
        total += line_total

        cursor.execute("""
            INSERT INTO order_items
            (id, orderId, productId, quantity, unitPrice, totalPrice)
            VALUES (%s,%s,%s,%s,%s,%s)
        """, (
            str(uuid.uuid4()),
            order_id,
            product_id,
            quantity,
            unit_price,
            line_total
        ))

        cursor.execute("""
            INSERT INTO product_credits
            (id, orderId, productId, productPrice, allocatedCredit, ratingPoints, isClaimed)
            VALUES (%s,%s,%s,%s,%s,%s,0)
        """, (
            str(uuid.uuid4()),
            order_id,
            product_id,
            unit_price,
            round(unit_price * 0.05, 2),
            30 if random.random() < 0.25 else 10
        ))

    cursor.execute("""
        UPDATE orders SET totalAmount=%s, bonusEarned=%s WHERE id=%s
    """, (
        round(total, 2),
        round(total * 0.05, 2),
        order_id
    ))

conn.commit()

rated_pairs = set()

for _ in range(2000):
    user_id = random.choice(users)
    product_id = random.choice(products)

    if (user_id, product_id) in rated_pairs:
        continue
    rated_pairs.add((user_id, product_id))

    score = random.randint(1, 5)
    comment = fake.sentence() if score <= 3 else None
    rating_id = str(uuid.uuid4())

    reward_points = 30 if random.random() < 0.25 else 10
    reward_amount = reward_points * 0.01

    cursor.execute("""
        INSERT INTO ratings
        (id, userId, productId, score, comment, rewardPoints, rewardAmount)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (
        rating_id,
        user_id,
        product_id,
        score,
        comment,
        reward_points,
        reward_amount
    ))

    cursor.execute("""
        INSERT INTO reward_transactions
        (id, userId, ratingId, type, points, amount, balanceAfter, description)
        VALUES (%s,%s,%s,'rating_reward',%s,%s,%s,%s)
    """, (
        str(uuid.uuid4()),
        user_id,
        rating_id,
        reward_points,
        reward_amount,
        reward_amount,
        "Reward for product rating"
    ))

    if comment:
        cursor.execute("""
            INSERT INTO ai_classifications
            (ratingId, topicLabel, topicConfidence, comment)
            VALUES (%s,%s,%s,%s)
        """, (
            rating_id,
            random.choice(["price", "quality", "service", "availability"]),
            round(random.uniform(0.70, 0.99), 2),
            comment
        ))

conn.commit()

cursor.close()
conn.close()
print("✅ Fully consistent data inserted")
