import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, ChevronDown, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { BrandIcon } from '../components/BrandLogos';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { formatINR } from '../utils/currency';

const CATEGORIES = [
  'All Categories',
  'Smartphones',
  'Laptops',
  'Audio & Sound',
  'Smart Watches',
  'Gaming & Consoles',
  'Cameras',
  'Smart Home',
  'Accessories',
  'Deals',
];

const BRANDS = [
  { name: 'Apple', key: 'Apple' },
  { name: 'Samsung', key: 'Samsung' },
  { name: 'Sony', key: 'Sony' },
  { name: 'Xiaomi', key: 'Xiaomi' },
  { name: 'Dell', key: 'Dell' },
  { name: 'HP', key: 'HP' },
];

const EXTRA_BRANDS = [
  { name: 'Asus', key: 'Asus' },
  { name: 'Lenovo', key: 'Lenovo' },
  { name: 'Bose', key: 'Bose' },
  { name: 'Logitech', key: 'Logitech' },
];

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Category (default 'All Categories' for comprehensive electronic store experience)
  const activeCategory = searchParams.get('category') || 'All Categories';
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  // Filter States
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [ratingFilter, setRatingFilter] = useState(4); // 4 Stars & up by default
  const [selectedBrands, setSelectedBrands] = useState([
    'Apple',
    'Samsung',
    'Sony',
    'Xiaomi',
    'Dell',
    'HP',
  ]);
  const [deliveryOption, setDeliveryOption] = useState('Standard');
  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState(['prod-001', 'prod-008']);

  // Products from backend or fallback to rich mock data
  const [backendProducts, setBackendProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFromApi = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBackendProducts(data);
          }
        }
      } catch (err) {
        // Fallback to MOCK_PRODUCTS cleanly
      } finally {
        setLoading(false);
      }
    };
    fetchFromApi();
  }, []);

  // Base catalog
  const catalog = useMemo(() => {
    if (backendProducts && Array.isArray(backendProducts) && backendProducts.length > 0) {
      const existingNames = new Set(MOCK_PRODUCTS.map((p) => p.name.toLowerCase()));
      const extraBackend = backendProducts.filter((p) => !existingNames.has(p.name?.toLowerCase()));
      return [...MOCK_PRODUCTS, ...extraBackend];
    }
    return MOCK_PRODUCTS;
  }, [backendProducts]);

  // Brand item counts
  const brandCounts = useMemo(() => {
    const counts = {};
    catalog.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, [catalog]);

  // Filtered & Sorted products calculation
  const filteredProducts = useMemo(() => {
    let list = catalog.filter((product) => {
      // Favourites filter
      if (filterParam === 'favourites') {
        if (!favorites.includes(product._id)) return false;
      }

      // Category filter
      if (activeCategory !== 'All Categories') {
        const matchesCat =
          product.category === activeCategory ||
          (product.categories && product.categories.includes(activeCategory));
        if (!matchesCat) return false;
      }

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (ratingFilter && product.rating < ratingFilter) {
        return false;
      }

      // Brand filter (if brands are selected)
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [catalog, activeCategory, searchQuery, filterParam, favorites, minPrice, maxPrice, ratingFilter, selectedBrands, sortBy]);

  // Dynamic average price
  const averagePrice = useMemo(() => {
    if (filteredProducts.length === 0) return 300;
    const sum = filteredProducts.reduce((acc, p) => acc + p.price, 0);
    return Math.round(sum / filteredProducts.length);
  }, [filteredProducts]);

  // Handlers
  const handleCategorySelect = (cat) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All Categories') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', cat);
    }
    nextParams.delete('filter');
    setSearchParams(nextParams);
  };

  const handleBrandToggle = (brandKey) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandKey)) {
        return prev.filter((b) => b !== brandKey);
      } else {
        return [...prev, brandKey];
      }
    });
  };

  const handleResetBrands = () => {
    setSelectedBrands(BRANDS.map((b) => b.key));
  };

  const handleResetPrice = () => {
    setMinPrice(20);
    setMaxPrice(2500);
  };

  const handleToggleFavorite = (prodId, isFav) => {
    setFavorites((prev) => {
      if (isFav) {
        return prev.includes(prodId) ? prev : [...prev, prodId];
      } else {
        return prev.filter((id) => id !== prodId);
      }
    });
  };

  const displayedBrands = showMoreBrands ? [...BRANDS, ...EXTRA_BRANDS] : BRANDS;

  return (
    <div className="showcase-outer-canvas">
      {/* Main Showcase Rounded Container */}
      <div className="showcase-card-container">
        {/* Category Filter Pills Bar */}
        <section className="categories-pill-bar">
          <div className="categories-pill-scroll">
            {CATEGORIES.map((cat) => {
              const isActive =
                (activeCategory === cat && !filterParam) ||
                (cat === 'All Categories' && !searchParams.get('category') && !filterParam);
              return (
                <button
                  key={cat}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Two-Column Showcase Layout */}
        <div className="showcase-layout">
          {/* Left Sidebar Filters */}
          <aside className="filters-sidebar">
            {/* 1. Price Range */}
            <div className="filter-group price-filter-group">
              <div className="filter-header-row">
                <h3 className="filter-title">Price Range</h3>
                <button onClick={handleResetPrice} className="filter-reset-btn">
                  Reset
                </button>
              </div>

              <div className="filter-subtitle">
                The average price is {formatINR(averagePrice, true)}
              </div>

              {/* Decorative Price Distribution Wave Histogram */}
              <div className="price-wave-wrap">
                <svg
                  viewBox="0 0 240 64"
                  className="price-wave-svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="waveFillGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8C7CFA" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="#A597FA" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#C4BCFC" stopOpacity="0.08" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 54 
                       C 20 54, 30 38, 45 38 
                       C 55 38, 62 48, 75 48 
                       C 88 48, 96 22, 110 22 
                       C 124 22, 130 32, 142 32 
                       C 152 32, 160 12, 175 12 
                       C 190 12, 198 34, 210 34 
                       C 222 34, 230 52, 240 54 
                       L 240 64 L 0 64 Z"
                    fill="url(#waveFillGrad)"
                  />
                  <path
                    d="M 0 54 
                       C 20 54, 30 38, 45 38 
                       C 55 38, 62 48, 75 48 
                       C 88 48, 96 22, 110 22 
                       C 124 22, 130 32, 142 32 
                       C 152 32, 160 12, 175 12 
                       C 190 12, 198 34, 210 34 
                       C 222 34, 230 52, 240 54"
                    fill="none"
                    stroke="#7D6AF8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Dual Pill Handles & Range Track */}
                <div className="slider-track-wrap">
                  <div className="slider-track-bg"></div>
                  <div
                    className="slider-track-highlight"
                    style={{
                      left: `${((minPrice - 0) / 2500) * 100}%`,
                      right: `${100 - ((maxPrice - 0) / 2500) * 100}%`,
                    }}
                  ></div>

                  {/* Min Pill Badge */}
                  <div
                    className="price-pill-badge min-pill"
                    style={{
                      left: `${Math.min(Math.max(((minPrice - 0) / 2500) * 100, 2), 70)}%`,
                    }}
                  >
                    {formatINR(minPrice, true)}
                  </div>

                  {/* Max Pill Badge */}
                  <div
                    className="price-pill-badge max-pill"
                    style={{
                      left: `${Math.min(Math.max(((maxPrice - 0) / 2500) * 100, 20), 84)}%`,
                    }}
                  >
                    {formatINR(maxPrice, true)}
                  </div>

                  {/* Range Sliders */}
                  <input
                    type="range"
                    min="0"
                    max="2500"
                    step="10"
                    value={minPrice}
                    onChange={(e) => {
                      const v = Math.min(Number(e.target.value), maxPrice - 20);
                      setMinPrice(v);
                    }}
                    className="range-input-hidden"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => {
                      const v = Math.max(Number(e.target.value), minPrice + 20);
                      setMaxPrice(v);
                    }}
                    className="range-input-hidden"
                  />
                </div>
              </div>
            </div>

            {/* 2. Star Rating */}
            <div className="filter-group">
              <h3 className="filter-title">Star Rating</h3>
              <div
                className={`rating-selector-row ${ratingFilter === 4 ? 'active' : ''}`}
                onClick={() => setRatingFilter(ratingFilter === 4 ? 0 : 4)}
                title="Filter by 4 Stars & up"
              >
                <div className="stars-row">
                  <Star size={16} fill="#FACC15" color="#FACC15" />
                  <Star size={16} fill="#FACC15" color="#FACC15" />
                  <Star size={16} fill="#FACC15" color="#FACC15" />
                  <Star size={16} fill="#FACC15" color="#FACC15" />
                  <Star size={16} fill="#E2E8F0" color="#E2E8F0" />
                </div>
                <span className="rating-text-label">4 Stars & up</span>
              </div>
            </div>

            {/* 3. Brand Filter */}
            <div className="filter-group">
              <div className="filter-header-row">
                <h3 className="filter-title">Brand</h3>
                <button onClick={handleResetBrands} className="filter-reset-btn">
                  Reset
                </button>
              </div>

              <div className="brand-list">
                {displayedBrands.map((brand) => {
                  const isChecked = selectedBrands.includes(brand.key);
                  const count = brandCounts[brand.key] || 0;
                  return (
                    <div
                      key={brand.key}
                      className="brand-item-row"
                      onClick={() => handleBrandToggle(brand.key)}
                    >
                      <div className="brand-left">
                        <span className="brand-logo-icon">
                          <BrandIcon brand={brand.name} size={18} />
                        </span>
                        <span className="brand-item-name">{brand.name}</span>
                        {count > 0 && <span className="brand-count-chip">({count})</span>}
                      </div>

                      {/* Purple Checkbox */}
                      <div className={`brand-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                className="more-brands-btn"
                onClick={() => setShowMoreBrands(!showMoreBrands)}
              >
                <span>{showMoreBrands ? 'Fewer Brands' : 'More Brand'}</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: showMoreBrands ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>
            </div>

            {/* 4. Delivery Options */}
            <div className="filter-group delivery-group">
              <h3 className="filter-title">Delivery Options</h3>
              <div className="delivery-toggle-container">
                <button
                  className={`delivery-toggle-btn ${deliveryOption === 'Standard' ? 'active' : ''}`}
                  onClick={() => setDeliveryOption('Standard')}
                >
                  Standard
                </button>
                <button
                  className={`delivery-toggle-btn ${deliveryOption === 'Pick Up' ? 'active' : ''}`}
                  onClick={() => setDeliveryOption('Pick Up')}
                >
                  Pick Up
                </button>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="products-showcase-main">
            {/* Catalog Toolbar Header */}
            <div className="catalog-toolbar">
              <div className="catalog-toolbar-left">
                <span className="products-count-badge">
                  {filteredProducts.length} items found
                </span>
                {filterParam === 'favourites' && (
                  <span className="active-filter-pill">Favourites Only</span>
                )}
                {searchQuery && (
                  <span className="active-filter-pill">Search: "{searchQuery}"</span>
                )}
              </div>

              <div className="catalog-toolbar-right">
                <label className="sort-label">
                  <ArrowUpDown size={14} />
                  <span>Sort by:</span>
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select-box"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products-box">
                <h4>No products match your filters</h4>
                <p>Try expanding your price range or resetting selected brands.</p>
                <button
                  onClick={() => {
                    handleResetPrice();
                    handleResetBrands();
                    setRatingFilter(0);
                    handleCategorySelect('All Categories');
                  }}
                  className="reset-all-filters-btn"
                >
                  <RotateCcw size={15} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="showcase-cards-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isFavorite={favorites.includes(product._id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
