import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice, convertSize } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 150;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const subtotal = rawSubtotal - discountAmount;
  const isFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingCost = isFreeShipping ? 0 : 15;
  const total = subtotal + shippingCost;
  const progressToFreeShipping = Math.min(100, Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'SPEED10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Speed Discount applied!');
    } else if (code === 'ATHLETE20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Athlete Tier Discount applied!');
    } else {
      setPromoError('Invalid code. Try "SPEED10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#11131a] border-l border-[#242938] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-[#202533] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-white">Your Shopping Bag</h2>
              <span className="text-xs font-mono text-[#8d94a6] bg-[#1a1d27] px-2 py-0.5 rounded">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8d94a6] hover:text-white rounded-lg hover:bg-[#1b1f2b] transition-colors"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#151822] border-b border-[#202533]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-[#a1a8bb]">
                {isFreeShipping
                  ? '🎉 Complimentary Global Express Shipping Unlocked'
                  : `Add ${formatPrice(amountToFreeShipping, currency)} more for Free Express Shipping`}
              </span>
              <span className="text-[#ff5500] font-bold">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#252a3a] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff5500] transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Itemized List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#1e2230]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#181b25] border border-[#262b3a] flex items-center justify-center text-[#5b6274]">
                  👟
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your bag is empty</h3>
                  <p className="text-xs text-[#82899b] mt-1 max-w-xs">
                    Explore our engineered road racing and atelier court footwear to begin your test run.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#ff5500] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded hover:bg-[#ff661a] transition-colors"
                >
                  Explore Footwear
                </button>
              </div>
            ) : (
              items.map((item) => {
                const displaySize = convertSize(item.selectedSize, item.sizeUnit);
                return (
                  <div key={item.id} className="py-4 flex gap-4">
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 bg-[#171a24] border border-[#262b3a] rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.selectedColorway.image || item.product.heroImage}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-display text-sm font-bold text-white leading-snug">
                            {item.product.name}
                          </h4>
                          <span className="text-sm font-mono font-bold text-white tabular-nums">
                            {formatPrice(item.product.price * item.quantity, currency)}
                          </span>
                        </div>

                        {/* Unboxed Metadata: Size & Color */}
                        <div className="text-xs text-[#878e9f] font-mono mt-1 flex items-center gap-2">
                          <span>{item.sizeUnit} {displaySize}</span>
                          <span className="text-[#3b4152]">·</span>
                          <span className="truncate max-w-[120px]">{item.selectedColorway.name}</span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-[#181b26] border border-[#272d3e] rounded p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#878e9f] hover:text-white"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#878e9f] hover:text-white"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#6c7385] hover:text-rose-400 p-1 transition-colors"
                          aria-label="Remove item from bag"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#202533] bg-[#0f1117] space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#646b7d]" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SPEED10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#161922] border border-[#262b3a] focus:border-[#ff5500] text-xs text-white pl-8 pr-3 py-2 rounded uppercase font-mono tracking-wider outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#212634] hover:bg-[#2b3144] text-[#c9cfe0] hover:text-white text-xs font-mono px-3 py-2 rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && <div className="text-[11px] text-emerald-400 font-mono">{promoSuccess}</div>}
                {promoError && <div className="text-[11px] text-rose-400 font-mono">{promoError}</div>}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono text-[#8d94a6]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium tabular-nums">
                    {formatPrice(rawSubtotal, currency)}
                  </span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Expedited Dispatch</span>
                  <span className="text-white font-medium">
                    {isFreeShipping ? 'FREE' : formatPrice(shippingCost, currency)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1e2230]">
                  <span>Total</span>
                  <span className="tabular-nums font-mono text-[#ff5500] text-base">
                    {formatPrice(total, currency)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#ff5500] hover:bg-[#ff661a] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-[#ff5500]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#686f80]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>30-Day Road Wear Guarantee & Free Returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
