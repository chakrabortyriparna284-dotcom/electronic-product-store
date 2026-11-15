import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Laptop, Smartphone, Headphones, Watch, MousePointer } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { name: 'All', icon: Sparkles },
  { name: 'Laptops', icon: Laptop },
  { name: 'Smartphones', icon: Smartphone },
  { name: 'Audio', icon: Headphones },
  { name: 'Wearables', icon: Watch },
  { name: 'Accessories', icon: MousePointer },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (activeCategory !== 'All') queryParams.append('category', activeCategory);
        if (searchQuery) queryParams.append('search', searchQuery);

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, searchQuery]);

  const handleCategorySelect = (categoryName) => {
    const nextParams = new URLSearchParams(searchParams);
    if (categoryName === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', categoryName);
    }
    setSearchParams(nextParams);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>MERN Capstone Showcase</span>
          </div>
          <h1 className="hero-title">High-Performance Electronics & Tech</h1>
          <p className="hero-subtitle">
            Explore curated flagship laptops, smartphones, noise-canceling audio, and wearables with lightning-fast delivery.
          </p>
        </div>
      </section>

      <main className="container">
        {/* Category Filters */}
        <div className="category-bar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                className={`category-chip ${isActive ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat.name)}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={16} />
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {activeCategory === 'All' ? 'All Featured Electronics' : `${activeCategory} Collection`}
            </h2>
            {searchQuery && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Search results for: "<strong>{searchQuery}</strong>"
              </p>
            )}
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            {products.length} Products Found
          </span>
        </div>

        {/* Loading / Error / Products Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading electronic gadgets...</p>
          </div>
        ) : error ? (
          <div className="alert-box alert-danger" style={{ textAlign: 'center', padding: '24px' }}>
            <p style={{ fontWeight: 600 }}>Error loading products: {error}</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', background: 'white', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>No products found</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Try resetting your category filter or search keywords.</p>
            <button onClick={() => setSearchParams({})} className="btn-primary">
              View All Products
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
