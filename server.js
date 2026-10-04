console.log('connected server.js');

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to Supabase PostgreSQL Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase SSL connections
});

// Test Database Connection on startup
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to Supabase database:', err.stack);
  }
  console.log(' Successfully connected to Supabase PostgreSQL Database!');
  release();
});

// 2. API Endpoint: Get all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// 3. API Endpoint: Create a new Sale / Checkout
app.post('/api/checkout', async (req, res) => {
  const { items, paymentMethod } = req.body; // items: [{ id, quantity, price }]
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start SQL Transaction

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Insert into sales table
    const saleResult = await client.query(
      'INSERT INTO sales (total_amount, payment_method) VALUES ($1, $2) RETURNING id',
      [totalAmount, paymentMethod || 'Cash']
    );
    const saleId = saleResult.rows[0].id;

    // Insert sale_items and update inventory stock for each product
    for (const item of items) {
      await client.query(
        'INSERT INTO sale_items (sale_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
        [saleId, item.id, item.quantity, item.price]
      );

      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, item.id]
      );
    }

    await client.query('COMMIT'); // Commit Transaction
    res.json({ success: true, saleId, totalAmount });
  } catch (err) {
    await client.query('ROLLBACK'); // Rollback if error occurs
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  } finally {
    client.release();
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 POS Server running on http://localhost:${PORT}`);
});