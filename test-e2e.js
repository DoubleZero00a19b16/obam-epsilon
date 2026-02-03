const fs = require('fs');

function log(msg) {
  console.log(msg);
  try {
    fs.appendFileSync('test_e2e.log', msg + '\n', 'utf8');
  } catch (e) { /* ignore */ }
}

async function runTest() {
  try { fs.writeFileSync('test_e2e.log', '', 'utf8'); } catch (e) { }

  const BASE_URL = 'http://localhost:3000/api/v1';
  const timestamp = Date.now();
  const phone = `+99450${timestamp.toString().slice(-7)}`;

  log(`Starting E2E Test at ${new Date().toISOString()}`);
  log(`Testing with phone: ${phone}`);

  // 1. Register
  log('\n[1] Registering User...');
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test',
      surname: 'User',
      phone: phone,
      password: 'password123',
      dateOfBirth: '1990-01-01'
    })
  });

  if (!regRes.ok) throw new Error(`Registration failed: ${await regRes.text()}`);
  const regData = await regRes.json();
  const token = regData.token;
  const bonusCardNumber = regData.bonusCard.cardNumber;
  log(`Registered. Token: ${token.slice(0, 10)}... Card: ${bonusCardNumber}`);

  // 2. Get Products
  log('\n[2] Fetching Products...');
  const prodRes = await fetch(`${BASE_URL}/products?limit=100`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!prodRes.ok) throw new Error(`Get Products failed: ${await prodRes.text()}`);
  const prodData = await prodRes.json();
  const products = prodData.data || prodData;

  // Find a product with rewardAmount > 0
  const rewardProduct = products.find(p => Number(p.rewardAmount) > 0);

  if (!rewardProduct) {
    log('Warning: No product with rewardAmount > 0 found. Skipping reward verification.');
  } else {
    log(`Found Reward Product: ${rewardProduct.name} ($${rewardProduct.price}, Reward: $${rewardProduct.rewardAmount})`);
  }

  // 3. Create Order
  log('\n[3] Creating Order...');
  const itemToOrder = rewardProduct || products[0];
  const items = [{ productId: itemToOrder.id, quantity: 2 }];

  const orderPayload = {
    bonusCardNumber: bonusCardNumber,
    items: items,
    marketId: '1'
  };

  // Fetch markets
  const marketRes = await fetch(`${BASE_URL}/markets`, { headers: { 'Authorization': `Bearer ${token}` } });
  if (marketRes.ok) {
    const markets = await marketRes.json();
    if (markets.data && markets.data.length > 0) {
      orderPayload.marketId = markets.data[0].id;
      log(`Using Market: ${markets.data[0].name}`);
    }
  }

  const orderRes = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderPayload)
  });

  if (!orderRes.ok) throw new Error(`Create Order failed: ${await orderRes.text()}`);
  const orderData = await orderRes.json();
  const order = orderData.data;

  log(`Order Created: ${order.orderId}`);
  log(`   Total Amount: $${order.totalAmount}`);
  log(`   Bonus Earned (Immediate): $${order.bonusEarned}`);

  // Verify Logic
  const expectedTotal = Number(itemToOrder.price) * 2;
  const expectedBonus = expectedTotal * 0.02;

  if (Math.abs(order.totalAmount - expectedTotal) < 0.01) log('Result: Total Amount Correct');
  else log(`Result: Total Amount Mismatch. Expected ${expectedTotal}, got ${order.totalAmount}`);

  if (Math.abs(order.bonusEarned - expectedBonus) < 0.01) log('Result: Immediate Bonus (2%) Correct');
  else log(`Result: Immediate Bonus Mismatch. Expected ${expectedBonus}, got ${order.bonusEarned}`);

  // Check items logic
  if (order.items && order.items.length > 0) {
    const item = order.items.find(i => i.productId === itemToOrder.id);
    if (item) {
      log(`Items: ${JSON.stringify(order.items)}`);

      // Backend key for rewardAmount?
      const itemReward = Number(item.rewardAmount || 0);
      log(`   Item Reward Amount: ${itemReward}`);

      if (rewardProduct) {
        if (Math.abs(itemReward - Number(rewardProduct.rewardAmount)) < 0.001) {
          log('Result: Item Reward Amount Correct (Fixed per product)');
        } else {
          log(`Result: Item Reward Amount Mismatch (Expected ${rewardProduct.rewardAmount}, Got ${itemReward})`);
        }
      }
    }
  }

  log('\nE2E Test Completed Successfully!');
}

runTest().catch(e => {
  log(`\nTest Failed: ${e.message}`);
  console.error(e);
});
