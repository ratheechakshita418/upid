import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    if (quantity > product.stock) {
      alert('Not enough stock available');
      return;
    }

    onAddToCart(product._id, quantity);
    setQuantity(1);
    alert('Product added to cart!');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.stock === 0 && <div className="out-of-stock">Out of Stock</div>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-category">
          <span className="category-badge">{product.category}</span>
        </div>

        <div className="product-footer">
          <div className="price-section">
            <span className="product-price">₹{product.price}</span>
            <span className="stock-info">Stock: {product.stock}</span>
          </div>

          {product.stock > 0 && (
            <div className="quantity-section">
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="quantity-select"
              >
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="add-to-cart-btn"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    if (quantity > product.stock) {
      alert('Not enough stock available');
      return;
    }

    onAddToCart(product._id, quantity);
    setQuantity(1);
    alert('Product added to cart!');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.stock === 0 && <div className="out-of-stock">Out of Stock</div>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <p className="product-description">{product.description}</p>
        
        <div className="product-category">
          <span className="category-badge">{product.category}</span>
        </div>

        <div className="product-footer">
          <div className="price-section">
            <span className="product-price">₹{product.price}</span>
            <span className="stock-info">Stock: {product.stock}</span>
          </div>

          {product.stock > 0 && (
            <div className="quantity-section">
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="quantity-select"
              >
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="add-to-cart-btn"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
