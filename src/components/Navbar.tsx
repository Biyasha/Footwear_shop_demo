import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenSizingGuide: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenSizingGuide,
  currency,
  onCurrencyChange,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const navLinks = [
    { label: 'Road Running', target: 'running' },
    { label: 'Trail', target: 'trail' },
    { label: 'Atelier Court', target: 'court' },
    { label: 'Engineering', target: 'engineering' },
    { label: 'Fit Guide', action: 'sizing' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f1115]/95 backdrop-blur-md border-b border-[#22252e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-neutral-200 transition-colors shrink-0"
        >
          KINETIC ATELIER
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#9da3b4]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (link.action === 'sizing') {
                  onOpenSizingGuide();
                } else if (link.target === 'engineering') {
                  const el = document.getElementById('engineering-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onSelectCategory(link.target || 'all');
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-white transition-colors cursor-pointer py-1 relative text-xs tracking-wider uppercase font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#ff5500] after:transition-all"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions (Search, Currency, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdown(!currencyDropdown)}
              className="flex items-center gap-1 text-xs text-[#a5abbc] hover:text-white px-2 py-1.5 rounded transition-colors font-mono"
              aria-label="Select currency"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[#707789]" />
            </button>
            {currencyDropdown && (
              <div className="absolute right-0 mt-1 w-20 bg-[#16181f] border border-[#2a2e3a] rounded shadow-xl py-1 z-50">
                {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCurrencyChange(c);
                      setCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors ${
                      currency === c ? 'text-[#ff5500] bg-[#222632]' : 'text-[#a5abbc] hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#a5abbc] hover:text-white transition-colors rounded hover:bg-[#1a1d25]"
            aria-label="Search footwear catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Bag Action */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#ff5500] hover:bg-[#ff661a] text-white px-3.5 py-2 rounded text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
            aria-label={`Shopping Bag, ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono tabular-nums">{cartCount}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#a5abbc] hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#12141a] border-b border-[#242733] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.action === 'sizing') {
                    onOpenSizingGuide();
                  } else if (link.target === 'engineering') {
                    const el = document.getElementById('engineering-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onSelectCategory(link.target || 'all');
                    const el = document.getElementById('catalog-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-left text-sm font-semibold tracking-wider uppercase text-[#c0c5d4] hover:text-[#ff5500] py-1.5 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
