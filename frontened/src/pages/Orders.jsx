import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
        return;
      }

      const response = await orderAPI.getOrders();
      setOrders(response.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'confirmed':
        return 'status-confirmed';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'shipped':
        return '📦';
      case 'delivered':
        return '🎉';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <button onClick={() => navigate('/')} className="shop-now-btn">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="order-meta">
                  <div className={`status-badge ${getStatusColor(order.status)}`}>
                    <span className="status-icon">{getStatusIcon(order.status)}</span>
                    <span className="status-text">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                  <p className="order-total">₹{order.totalPrice.toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                className="expand-btn"
              >
                {expandedOrder === order._id ? '▼' : '▶'} Details
              </button>

              {expandedOrder === order._id && (
                <div className="order-details">
                  {/* Shipping Address */}
                  <div className="details-section">
                    <h4>Shipping Address</h4>
                    <div className="address-info">
                      <p><strong>{order.shippingAddress.fullName}</strong></p>
                      <p>{order.shippingAddress.address}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="details-section">
                    <h4>Items Ordered</h4>
                    <div className="items-list">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-qty">Quantity: {item.quantity}</p>
                            <p className="item-price">₹{item.price} each</p>
                          </div>
                          <p className="item-subtotal">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="details-section">
                    <h4>Order Summary</h4>
                    <div className="order-summary">
                      <div className="summary-line">
                        <span>Subtotal:</span>
                        <span>₹{order.totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="summary-line">
                        <span>Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className="summary-divider"></div>
                      <div className="summary-total">
                        <span>Total:</span>
                        <span>₹{order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="details-section">
                    <h4>Payment Information</h4>
                    <div className="payment-info">
                      <p>
                        <strong>Method:</strong> {
                          order.paymentMethod === 'cod' ? 'Cash on Delivery' :
                          order.paymentMethod === 'card' ? 'Credit/Debit Card' :
                          order.paymentMethod === 'upi' ? 'UPI' : order.paymentMethod
                        }
                      </p>
                      <p>
                        <strong>Status:</strong> <span className={`status-badge ${getStatusColor(order.status)}`}>{order.status}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
