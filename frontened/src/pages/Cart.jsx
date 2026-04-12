import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cartAPI } from '../services/api';
import './Cart.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    window.addEventListener('cartUpdated', fetchCart);
    return () => window.removeEventListener('cartUpdated', fetchCart);
  }, []);

  const fetchCart = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
        return;
      }

      const response = await cartAPI.getCart();
      setCartItems(response.data.items || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        await handleRemoveItem(productId);
        return;
      }

      await cartAPI.updateItem(productId, { quantity: newQuantity });
      setCartItems(cartItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      alert('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartAPI.removeItem(productId);
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (err) {
      alert('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await cartAPI.clearCart();
        setCartItems([]);
      } catch (err) {
        alert('Failed to clear cart');
      }
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>

            {cartItems.map(item => (
              <div key={item.productId} className="cart-item">
                <div className="item-product">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                  </div>
                </div>

                <div className="item-price">
                  ₹{item.price.toFixed(2)}
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value) || 1)}
                    className="quantity-input"
                    min="1"
                  />
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="remove-btn"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-item">
                <span>Subtotal:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className="summary-item">
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <div className="summary-item">
                <span>Tax:</span>
                <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total:</span>
                <span>₹{(totalPrice * 1.18).toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleClearCart}
                className="clear-cart-btn"
              >
                Clear Cart
              </button>

              <Link to="/" className="continue-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
