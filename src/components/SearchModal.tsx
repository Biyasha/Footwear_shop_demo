import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4);
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.specs.midsole.toLowerCase().includes(q) ||
        p.specs.surface.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#12141c] border border-[#252a39] rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#212635] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ff5500]" />
          <input
            type="text"
            autoFocus
            placeholder="Search footwear by model, foam, terrain (e.g., carbon, trail, PEBA)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#687082] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#7d8496] hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#7d8496] hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-[#1b1f2c]">
          <div className="text-[11px] font-mono uppercase text-[#737a8c] pb-2">
            {query.trim() ? `Found ${filtered.length} matching silhouettes` : 'Suggested Silhouettes'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#7e8597] font-mono">
              No footwear matched "{query}". Try "carbon", "trail", or "court".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center justify-between group cursor-pointer hover:bg-[#161925] px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-[#171a24] border border-[#232837] overflow-hidden shrink-0">
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ff5500] transition-colors">
                      {product.name}
                    </h4>
                    <div className="text-xs text-[#787f91] font-mono">
                      {product.categoryLabel} · {product.specs.weight.split(' ')[0]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-white tabular-nums">
                    {formatPrice(product.price, currency)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#787f91] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Keyboard Quick Navigation hints */}
        <div className="p-3 bg-[#0e1017] border-t border-[#1e2230] text-[11px] font-mono text-[#62697b] flex items-center justify-between">
          <span>Search index includes foam formulations, drop, and outsole compounds</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
