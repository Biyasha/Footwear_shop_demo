import React, { useState, useEffect, useMemo } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizingGuideModal } from './components/SizingGuideModal';
import { SearchModal } from './components/SearchModal';
import { TechnologySection } from './components/TechnologySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/products';
import { Product, CartItem, Currency, Category, ProductColorway } from './types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function App() {
  // Cart state with localStorage hydration
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kinetic_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kinetic_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  // Currency
  const [currency, setCurrency] = useState<Currency>('USD');

  // Filter & Sort
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight'>('featured');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizingGuideOpen, setIsSizingGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedSize: number,
    sizeUnit: 'US' | 'EU' | 'UK',
    selectedColorway: ProductColorway,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedSize}-${sizeUnit}-${selectedColorway.id}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize,
          sizeUnit,
          selectedColorway,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'weight') {
      result.sort((a, b) => {
        const wA = parseInt(a.specs.weight, 10) || 0;
        const wB = parseInt(b.specs.weight, 10) || 0;
        return wA - wB;
      });
    }

    return result;
  }, [selectedCategory, sortBy]);

  const categories = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'running', label: 'Road Running' },
    { id: 'racing', label: 'Marathon Super-Shoes' },
    { id: 'trail', label: 'Trail & Off-Road' },
    { id: 'court', label: 'Atelier Court' },
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e8ebf2] flex flex-col selection:bg-[#ff5500] selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Contract */}
      <Navbar
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSizingGuide={() => setIsSizingGuideOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
        onSelectCategory={(cat) => setSelectedCategory(cat as Category)}
      />

      {/* 3. Hero Section */}
      <Hero
        onExploreCollection={() => {
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreEngineering={() => {
          const el = document.getElementById('engineering-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Product Catalog & Filter Bar */}
      <section id="catalog-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Catalog Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#212635]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#ff5500]">
              The Fleet Catalog
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white mt-1">
              Engineered Footwear
            </h2>
          </div>

          {/* Interactive Filter Tabs / Segmented Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#141720] border border-[#222736] rounded-lg overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#ff5500] text-white shadow-sm font-semibold'
                      : 'text-[#8b92a4] hover:text-white hover:bg-[#1a1e2b]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-1.5 bg-[#141720] border border-[#222736] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#8b92a4]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#6c7486]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white outline-none cursor-pointer text-xs"
              >
                <option value="featured" className="bg-[#141720]">Featured Calibration</option>
                <option value="price-asc" className="bg-[#141720]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#141720]">Price: High to Low</option>
                <option value="weight" className="bg-[#141720]">Weight: Lightest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="py-4 flex items-center justify-between text-xs font-mono text-[#767e91]">
          <span>Displaying {filteredProducts.length} precision silhouettes</span>
          <span className="hidden sm:inline">All pairs include 30-day road wear test guarantee</span>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              onOpenQuickView={(p) => setQuickViewProduct(p)}
              onQuickAdd={(p, size, colorway) => handleAddToCart(p, size, 'US', colorway, 1)}
            />
          ))}
        </div>
      </section>

      {/* 5. The Architecture of Motion (Engineering Deep Dive) */}
      <TechnologySection />

      {/* 6. Field Verification & Attributable Reviews */}
      <ReviewsSection />

      {/* 7. Footer */}
      <Footer
        onOpenSizingGuide={() => setIsSizingGuideOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as Category);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, size, unit, colorway, qty) => {
          handleAddToCart(product, size, unit, colorway, qty);
          setQuickViewProduct(null);
        }}
        onOpenSizingGuide={() => setIsSizingGuideOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        onClearCart={handleClearCart}
      />

      {/* Sizing Guide Modal */}
      <SizingGuideModal
        isOpen={isSizingGuideOpen}
        onClose={() => setIsSizingGuideOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currency={currency}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />
    </div>
  );
}
