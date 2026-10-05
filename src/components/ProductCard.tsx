import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { Product, Currency, ProductColorway } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onOpenQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, size: number, colorway: ProductColorway) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onOpenQuickView,
  onQuickAdd,
}) => {
  const [selectedColorway, setSelectedColorway] = useState<ProductColorway>(product.colorways[0]);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleSizeClick = (e: React.MouseEvent, size: number) => {
    e.stopPropagation();
    onQuickAdd(product, size, selectedColorway);
    setShowQuickSizes(false);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1600);
  };

  return (
    <article
      onClick={() => onOpenQuickView(product)}
      className="group relative bg-[#13161e] border border-[#202430] hover:border-[#353c4f] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer"
    >
      {/* Visual Lead: Product image (65-75% height) */}
      <div className="relative aspect-[4/3] bg-[#171a23] overflow-hidden flex items-center justify-center">
        <img
          src={selectedColorway.image || product.heroImage}
          alt={`${product.name} - ${selectedColorway.name}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Minimal single text badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-[11px] font-mono tracking-wider uppercase text-[#c2c7d4] bg-[#0d0f14]/80 backdrop-blur-sm px-2.5 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickView(product);
          }}
          className="absolute top-3 right-3 p-2 bg-[#0d0f14]/80 hover:bg-[#0d0f14] text-[#a0a6b8] hover:text-white rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Quick view ${product.name}`}
          title="Quick view"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Quick Add overlay bar when triggered */}
        {showQuickSizes && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-[#0e1017]/95 backdrop-blur-md p-4 flex flex-col justify-center animate-in fade-in duration-200 z-10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-[#9ea5b7]">Select US Size</span>
              <button
                onClick={() => setShowQuickSizes(false)}
                className="text-xs text-[#7d8496] hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {product.availableSizes.map((s) => (
                <button
                  key={s.size}
                  disabled={!s.inStock}
                  onClick={(e) => handleSizeClick(e, s.size)}
                  className={`py-1.5 text-xs font-mono rounded transition-colors ${
                    s.inStock
                      ? 'bg-[#1b1f2b] hover:bg-[#ff5500] hover:text-white text-[#d5dae7]'
                      : 'bg-[#12141a] text-[#4d5364] cursor-not-allowed line-through'
                  }`}
                >
                  {s.size % 1 === 0 ? s.size : s.size.toFixed(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Unboxed Metadata: Category & Weight / Drop */}
          <div className="flex items-center justify-between text-xs text-[#7e8597] font-mono uppercase tracking-wider mb-1.5">
            <span>{product.categoryLabel}</span>
            <span className="text-[#9fa6b8]">{product.specs.weight.split(' ')[0]}</span>
          </div>

          {/* Product Name */}
          <h2 className="font-display text-base font-bold text-white group-hover:text-[#ff5500] transition-colors leading-snug">
            {product.name}
          </h2>

          <p className="text-xs text-[#8f96a8] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Colorway Swatches */}
          <div className="mt-3 flex items-center gap-1.5">
            {product.colorways.map((c) => (
              <button
                key={c.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorway(c);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorway.id === c.id
                    ? 'border-[#ff5500] scale-110 ring-2 ring-[#ff5500]/20'
                    : 'border-[#3a4050] hover:border-white'
                }`}
                style={{ backgroundColor: c.hex }}
                aria-label={`Color ${c.name}`}
                title={c.name}
              />
            ))}
            <span className="text-[11px] text-[#6d7485] ml-1 font-mono">
              {product.colorways.length} colors
            </span>
          </div>
        </div>

        {/* Footer: Price and Quick Add Action */}
        <div className="pt-3 border-t border-[#1e222d] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white tabular-nums font-mono">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#6e7587] line-through tabular-nums font-mono">
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
            </div>
            <div className="text-[11px] text-[#6e7587] font-mono">
              Drop {product.specs.heelDrop} · {product.specs.stackHeight.split(' ')[0]}
            </div>
          </div>

          {/* Quick Add CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickSizes(true);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
              addedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1b1f2b] hover:bg-[#ff5500] text-[#c9cfde] hover:text-white'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
