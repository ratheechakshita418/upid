import { useState, useEffect } from 'react';
import { productAPI, cartAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productAPI.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        ...(selectedCategory !== 'All' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice })
      };

      const response = await productAPI.getAll(params);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm, minPrice, maxPrice]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        alert('Please login first');
        return;
      }

      await cartAPI.addItem({ productId, quantity });
      
      // Update local cart count
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ id: productId, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      alert('Failed to add item to cart');
      console.error(err);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Welcome to ShopHub</h1>
        <p>Explore our amazing collection of products</p>
      </div>

      <div className="home-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3>Filters</h3>
          </div>

          {/* Search */}
          <div className="filter-group">
            <label>Search Products</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="filter-input price-input"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="filter-input price-input"
              />
            </div>
          </div>

          {/* Reset Filters */}
          <button onClick={handleResetFilters} className="reset-btn">
            Reset Filters
          </button>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className="products-count">
                <p>Showing {products.length} product{products.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
