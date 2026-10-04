import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 1. Fetch products from Express backend on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setMessage('Error loading products from server. Make sure node server.js is running!');
      setLoading(false);
    }
  };

  // 2. Add product to cart
  const addToCart = (product) => {
    if (product.stock_quantity <= 0) {
      alert('Product out of stock!');
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock_quantity) {
          alert('Cannot exceed available stock!');
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 3. Remove product or decrease quantity
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // 4. Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 5. Handle Checkout transaction
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, paymentMethod })
      });

      const data = await response.json();
      if (data.success) {
        setMessage(`Checkout successful! Sale ID: #${data.saleId}`);
        setCart([]);
        fetchProducts(); // Refresh stock levels from database
      } else {
        setMessage('Checkout failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setMessage('Error connecting to backend API.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
      <h1>🛒 Point of Sale (POS) System</h1>
      {message && <div style={{ padding: '10px', background: '#e0f7fa', marginBottom: '15px', borderRadius: '4px' }}>{message}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left Side: Product Grid */}
        <div>
          <h2>Available Products</h2>
          {loading ? (
            <p>Loading catalog from database...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
              {products.map((p) => (
                <div
                  key={p.id}
                  onClick={() => addToCart(p)}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '15px',
                    cursor: p.stock_quantity > 0 ? 'pointer' : 'not-allowed',
                    background: p.stock_quantity > 0 ? '#fff' : '#f5f5f5',
                    color: '#333',
                    textAlign: 'center'
                  }}
                >
                  <h4 style={{ margin: '0 0 10px 0' }}>{p.name}</h4>
                  <p style={{ color: '#2e7d32', fontWeight: 'bold', margin: '5px 0' }}>RM {parseFloat(p.price).toFixed(2)}</p>
                  <p style={{ fontSize: '12px', color: p.stock_quantity > 0 ? '#666' : 'red' }}>
                    Stock: {p.stock_quantity}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Cashier Cart & Checkout */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fafafa', color: '#333' }}>
          <h2>Current Order</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#888' }}>Cart is empty. Tap a product to add.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                  <div>
                    <div><strong>{item.name}</strong></div>
                    <small>RM {parseFloat(item.price).toFixed(2)} x {item.quantity}</small>
                  </div>
                  <div>
                    <button onClick={() => removeFromCart(item.id)} style={{ padding: '2px 8px', cursor: 'pointer' }}>-</button>
                  </div>
                </div>
              ))}

              <hr />
              <h3>Total: RM {totalAmount.toFixed(2)}</h3>

              <div style={{ marginBottom: '15px' }}>
                <label><strong>Payment Method: </strong></label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ padding: '5px', marginLeft: '5px' }}>
                  <option value="Cash">Cash</option>
                  <option value="DuitNow / QR">DuitNow / QR</option>
                  <option value="Card">Credit/Debit Card</option>
                </select>
              </div>

              <button
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#2e7d32',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Complete Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;