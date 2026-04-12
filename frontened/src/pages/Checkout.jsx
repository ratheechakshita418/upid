import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI } from '../services/api';
import './Checkout.css';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCartItems(response.data.items || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load cart');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!formData.fullName || !formData.address || !formData.city || !formData.state || !formData.postalCode) {
        setError('Please fill in all address fields');
        setSubmitting(false);
        return;
      }

      const response = await orderAPI.checkout({
        shippingAddress: formData,
        paymentMethod: formData.paymentMethod
      });

      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="checkout-loading">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Your cart is empty</p>
        <button onClick={() => navigate('/cart')} className="back-btn">
          Back to Cart
        </button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = totalPrice * 0.18;
  const finalTotal = totalPrice + tax;

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="checkout-content">
        {/* Shipping Form */}
        <div className="checkout-form">
          <div className="form-section">
            <h3>Shipping Information</h3>
            <form onSubmit={handleSubmit} className="shipping-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>

              <div className="form-section payment-section">
                <h3>Payment Method</h3>
                
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                    />
                    <span>UPI</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="place-order-btn"
              >
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.productId} className="summary-item">
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                  <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-line">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Tax (18%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="summary-line">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/cart')}
              className="edit-cart-btn"
            >
              Edit Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
