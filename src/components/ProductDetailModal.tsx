import React, { useState } from 'react';
import { X, Check, Shield, Truck, RotateCcw, ChevronDown, ChevronUp, Ruler } from 'lucide-react';
import { Product, Currency, ProductColorway } from '../types';
import { formatPrice, convertSize } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, sizeUnit: 'US' | 'EU' | 'UK', colorway: ProductColorway, quantity: number) => void;
  onOpenSizingGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onOpenSizingGuide,
}) => {
  if (!product) return null;

  const [selectedColorway, setSelectedColorway] = useState<ProductColorway>(product.colorways[0]);
  const [selectedSize, setSelectedSize] = useState<number>(9.0);
  const [sizeUnit, setSizeUnit] = useState<'US' | 'EU' | 'UK'>('US');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.heroImage);
  const [openSection, setOpenSection] = useState<'specs' | 'sustainability' | 'guarantee' | null>('specs');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product, selectedSize, sizeUnit, selectedColorway, quantity);
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#11131a] border border-[#262a37] rounded-2xl w-full max-w-5xl my-6 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#171a23]/90 hover:bg-[#202533] text-[#9fa6b8] hover:text-white rounded-full transition-colors border border-[#2b3040]"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Gallery Column (Sticky left on desktop) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Primary Image Viewport */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#161922] border border-[#242938]">
                <img
                  src={activeImage || selectedColorway.image || product.heroImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {product.badge && (
                  <div className="absolute top-3 left-3 text-xs font-mono tracking-wider uppercase text-white bg-[#0e1017]/85 backdrop-blur-sm px-3 py-1 rounded border border-[#262b3a]">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border shrink-0 transition-all ${
                      activeImage === img ? 'border-[#ff5500] ring-2 ring-[#ff5500]/20' : 'border-[#262b3a] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Technical Spec Matrix */}
              <div className="bg-[#141720] border border-[#202533] rounded-xl p-4 text-xs font-mono space-y-2">
                <div className="text-[#a0a7ba] font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-[#242938]">
                  Laboratory Blueprint
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#b0b7ca]">
                  <div>
                    <span className="text-[#6c7385]">Race Weight: </span>
                    <span className="text-white font-medium">{product.specs.weight}</span>
                  </div>
                  <div>
                    <span className="text-[#6c7385]">Heel-to-Toe Drop: </span>
                    <span className="text-white font-medium">{product.specs.heelDrop}</span>
                  </div>
                  <div>
                    <span className="text-[#6c7385]">Stack Height: </span>
                    <span className="text-white font-medium">{product.specs.stackHeight}</span>
                  </div>
                  <div>
                    <span className="text-[#6c7385]">Terrain: </span>
                    <span className="text-white font-medium">{product.specs.surface}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module (Right Column) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div>
                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff5500]">
                  <span>{product.categoryLabel}</span>
                  <span className="text-[#434857]">·</span>
                  <span>{product.specs.midsole.split('+')[0].trim()}</span>
                </div>

                {/* Product Name */}
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {product.name}
                </h1>
                
                <p className="text-sm text-[#8f96a9] mt-1">
                  {product.subtitle}
                </p>

                {/* Price Baseline */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl font-bold text-white font-mono tabular-nums">
                    {formatPrice(product.price, currency)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#6f7687] line-through font-mono tabular-nums">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 ml-2">
                    <Check className="w-3.5 h-3.5" /> In Stock & Ready to Dispatch
                  </span>
                </div>

                <p className="text-sm text-[#a4aab9] leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Colorway Selection */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#9fa6b8] uppercase">Colorway:</span>
                    <span className="text-white font-semibold">{selectedColorway.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colorways.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedColorway(c);
                          setActiveImage(c.image);
                        }}
                        className={`px-3 py-2 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
                          selectedColorway.id === c.id
                            ? 'border-[#ff5500] bg-[#1a1c26] text-white shadow-sm'
                            : 'border-[#262b3a] bg-[#13151e] text-[#8e95a7] hover:text-white hover:border-[#383e50]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/40"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing Section with Unit Toggle and Advisor */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#9fa6b8] uppercase">Select Size:</span>
                      {/* Unit Segmented Control */}
                      <div className="flex items-center bg-[#171a24] rounded border border-[#282d3c] p-0.5">
                        {(['US', 'EU', 'UK'] as const).map((unit) => (
                          <button
                            key={unit}
                            onClick={() => setSizeUnit(unit)}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                              sizeUnit === unit ? 'bg-[#ff5500] text-white font-bold' : 'text-[#878e9f] hover:text-white'
                            }`}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={onOpenSizingGuide}
                      className="flex items-center gap-1 text-[#ff5500] hover:text-[#ff7733] transition-colors"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Sizing Guide</span>
                    </button>
                  </div>

                  {/* Sizing Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.availableSizes.map((s) => {
                      const displayLabel = convertSize(s.size, sizeUnit);
                      const isSelected = selectedSize === s.size;
                      return (
                        <button
                          key={s.size}
                          disabled={!s.inStock}
                          onClick={() => setSelectedSize(s.size)}
                          className={`py-2 text-xs font-mono rounded-lg border transition-all ${
                            isSelected
                              ? 'border-[#ff5500] bg-[#ff5500] text-white font-bold shadow-md'
                              : s.inStock
                              ? 'border-[#262b3a] bg-[#14161f] text-[#c0c6d6] hover:border-[#42495d] hover:text-white'
                              : 'border-[#1b1e28] bg-[#0e1016] text-[#424756] cursor-not-allowed line-through'
                          }`}
                        >
                          {sizeUnit} {displayLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Fit Note banner */}
                  <div className="mt-2.5 text-xs text-[#82899b] bg-[#141721] border border-[#202533] p-2.5 rounded-lg flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
                    <span>{product.fitNote}</span>
                  </div>
                </div>

                {/* Primary Buy Button & Quantity Stepper */}
                <div className="mt-8 flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#151722] border border-[#272c3b] rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-[#8e95a7] hover:text-white hover:bg-[#202534] rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#8e95a7] hover:text-white hover:bg-[#202534] rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Buy CTA */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 bg-[#ff5500] hover:bg-[#ff661a] disabled:bg-[#ff5500]/70 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-[#ff5500]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {isAdding ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <span>Add to Bag · {formatPrice(product.price * quantity, currency)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust Markers */}
                <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] text-[#787f91] border-t border-[#1f232f] pt-4 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>Free Global Dispatch</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>30-Day Wear Test</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#ff5500]" />
                    <span>2-Yr Craft Warranty</span>
                  </div>
                </div>

                {/* Collapsible Deep-Dive Details */}
                <div className="mt-6 border-t border-[#1f232f] divide-y divide-[#1f232f] text-xs">
                  
                  {/* Highlights & Biomechanics */}
                  <div>
                    <button
                      onClick={() => setOpenSection(openSection === 'specs' ? null : 'specs')}
                      className="w-full py-3 flex items-center justify-between text-left font-semibold text-[#c8cee0] hover:text-white transition-colors"
                    >
                      <span>Biomechanics & Dynamic Cushioning</span>
                      {openSection === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSection === 'specs' && (
                      <ul className="pb-3 space-y-1.5 text-[#9299ab] pl-3 list-disc">
                        {product.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Material & Circularity */}
                  <div>
                    <button
                      onClick={() => setOpenSection(openSection === 'sustainability' ? null : 'sustainability')}
                      className="w-full py-3 flex items-center justify-between text-left font-semibold text-[#c8cee0] hover:text-white transition-colors"
                    >
                      <span>Materials, Sourcing & Circularity</span>
                      {openSection === 'sustainability' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSection === 'sustainability' && (
                      <div className="pb-3 text-[#9299ab] space-y-1">
                        <p>100% bio-circular PEBA midsole scrap reclaimed and molded into secondary trail lugs.</p>
                        <p>Upper constructed from recycled polyester monomesh sourced with GRS (Global Recycled Standard) certification.</p>
                      </div>
                    )}
                  </div>

                  {/* 30-Day Guarantee */}
                  <div>
                    <button
                      onClick={() => setOpenSection(openSection === 'guarantee' ? null : 'guarantee')}
                      className="w-full py-3 flex items-center justify-between text-left font-semibold text-[#c8cee0] hover:text-white transition-colors"
                    >
                      <span>The 30-Day Road & Scree Guarantee</span>
                      {openSection === 'guarantee' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openSection === 'guarantee' && (
                      <div className="pb-3 text-[#9299ab]">
                        <p>Run, hike, or train in your shoes for 30 full days. If they don’t transform your stride comfort, return them for a 100% refund, no questions asked. Return shipping labels provided free.</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
