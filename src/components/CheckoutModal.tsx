import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, ShieldCheck, Printer, ArrowRight } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice, convertSize } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onClearCart,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [orderNumber, setOrderNumber] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@stride-athlete.com',
    phone: '+1 (555) 392-8819',
    street: '742 Evergreen Terrace, Suite 4',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    country: 'United States',
    cardNumber: '4242 •••• •••• 9821',
    cardExp: '08/28',
    cardCvc: '883',
  });

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = rawSubtotal >= 150;
  const shippingCost = isFreeShipping ? 0 : 15;
  const total = rawSubtotal + shippingCost;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `KA-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(newOrderId);
    setStep('confirmation');
    onClearCart();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#11131a] border border-[#262b3a] rounded-2xl w-full max-w-2xl my-6 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#202533] flex items-center justify-between bg-[#141721]">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-lg">
              {step === 'confirmation' ? 'Order Verification Receipt' : 'Secure Atelier Checkout'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8d94a6] hover:text-white rounded-lg hover:bg-[#1b1f2b] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'details' && (
            <form onSubmit={handleSubmitDetails} className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#202533] pb-3">
                <span className="text-xs font-mono uppercase text-[#ff5500] font-semibold">
                  Step 1 of 2: Shipping Destination
                </span>
                <span className="text-xs font-mono text-[#82899c]">
                  Total: {formatPrice(total, currency)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="sm:col-span-2">
                  <label className="block text-[#a0a7ba] mb-1.5 uppercase text-[11px]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#161924] border border-[#272d3e] focus:border-[#ff5500] rounded p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#a0a7ba] mb-1.5 uppercase text-[11px]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161924] border border-[#272d3e] focus:border-[#ff5500] rounded p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#a0a7ba] mb-1.5 uppercase text-[11px]">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#161924] border border-[#272d3e] focus:border-[#ff5500] rounded p-2.5 text-white outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#a0a7ba] mb-1.5 uppercase text-[11px]">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-[#161924] border border-[#272d3e] focus:border-[#ff5500] rounded p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#a0a7ba] mb-1.5 uppercase text-[11px]">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#161924] border border-[#272d3e] focus:border-[#ff5500] rounded p-2.5 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#a0a7ba] mb-1.5 uppercase text-[11px]">Postal / Zip</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full bg-[#161924] border border-[#272d3e] focus:border-[#ff5500] rounded p-2.5 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#a0a7ba] mb-1.5 uppercase text-[11px]">Country</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#161924] border border-[#272d3e] focus:border-[#ff5500] rounded p-2.5 text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#202533] flex items-center justify-between">
                <span className="text-xs text-[#82899b] font-mono">
                  {isFreeShipping ? '✓ Free Expedited Air Courier' : 'Standard Delivery'}
                </span>
                <button
                  type="submit"
                  className="bg-[#ff5500] hover:bg-[#ff661a] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#202533] pb-3">
                <span className="text-xs font-mono uppercase text-[#ff5500] font-semibold">
                  Step 2 of 2: Payment Protocol
                </span>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs font-mono text-[#8a92a5] hover:text-white underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left text-xs font-mono transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#ff5500] bg-[#1a1e2b] text-white ring-1 ring-[#ff5500]'
                      : 'border-[#272d3e] bg-[#141620] text-[#8e96a8]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-2 text-[#ff5500]" />
                  <div className="font-bold">Card</div>
                  <div className="text-[10px] text-[#6d7486]">Visa, MC, Amex</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-lg border text-left text-xs font-mono transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-[#ff5500] bg-[#1a1e2b] text-white ring-1 ring-[#ff5500]'
                      : 'border-[#272d3e] bg-[#141620] text-[#8e96a8]'
                  }`}
                >
                  <div className="text-base mb-1">⚡</div>
                  <div className="font-bold">Express Pay</div>
                  <div className="text-[10px] text-[#6d7486]">Apple / Google</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-left text-xs font-mono transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#ff5500] bg-[#1a1e2b] text-white ring-1 ring-[#ff5500]'
                      : 'border-[#272d3e] bg-[#141620] text-[#8e96a8]'
                  }`}
                >
                  <Truck className="w-4 h-4 mb-2 text-[#ff5500]" />
                  <div className="font-bold">Cash on Delivery</div>
                  <div className="text-[10px] text-[#6d7486]">Pay at doorstep</div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-[#151822] p-4 rounded-xl border border-[#252a3a] text-xs font-mono">
                  <div>
                    <label className="block text-[#a0a7ba] mb-1 uppercase text-[11px]">Card Number</label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full bg-[#181c27] border border-[#2b3143] rounded p-2 text-white outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#a0a7ba] mb-1 uppercase text-[11px]">Expiry</label>
                      <input
                        type="text"
                        required
                        value={formData.cardExp}
                        onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                        className="w-full bg-[#181c27] border border-[#2b3143] rounded p-2 text-white outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[#a0a7ba] mb-1 uppercase text-[11px]">CVC Security</label>
                      <input
                        type="password"
                        required
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-[#181c27] border border-[#2b3143] rounded p-2 text-white outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="bg-[#151822] p-4 rounded-xl border border-[#252a3a] text-xs font-mono text-[#a0a7ba] space-y-2">
                  <div className="text-white font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#ff5500]" />
                    <span>Cash on Delivery Verified</span>
                  </div>
                  <p>
                    Your parcel will be dispatched immediately via tracked courier. Please keep exact cash of{' '}
                    <span className="text-[#ff5500] font-bold">{formatPrice(total, currency)}</span> ready upon arrival.
                  </p>
                </div>
              )}

              {/* Order Final Summary */}
              <div className="bg-[#141721] p-3.5 rounded-lg border border-[#212635] text-xs font-mono flex items-center justify-between">
                <div>
                  <span className="text-[#848b9d]">Dispatching to: </span>
                  <span className="text-white font-medium">{formData.city}, {formData.country}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-white tabular-nums">
                    {formatPrice(total, currency)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#202533] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs font-mono text-[#8a92a5] hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-[#ff5500] hover:bg-[#ff661a] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#ff5500]/25"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize Order · {formatPrice(total, currency)}</span>
                </button>
              </div>
            </form>
          )}

          {step === 'confirmation' && (
            <div className="space-y-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#141822] p-4 rounded-xl border border-[#252b3c]">
                <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                    Order Confirmed & Logged
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Order #{orderNumber} — Preparing Atelier Dispatch
                  </h3>
                  <p className="text-xs text-[#8990a2] mt-0.5">
                    A confirmation dispatch note has been transmitted to <span className="text-white">{formData.email}</span>.
                  </p>
                </div>
                <button
                  onClick={handlePrint}
                  className="p-2.5 bg-[#1e2330] hover:bg-[#282f42] text-[#c2c8d7] hover:text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-mono cursor-pointer"
                  title="Print receipt"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Receipt</span>
                </button>
              </div>

              {/* Receipt Details Breakdown */}
              <div className="bg-[#13161f] border border-[#212635] rounded-xl p-5 text-xs font-mono space-y-3">
                <div className="flex justify-between border-b border-[#212635] pb-2 text-[#7f8698]">
                  <span>RECIPIENT & ROUTING</span>
                  <span>ESTIMATED ARRIVAL</span>
                </div>
                <div className="flex justify-between text-white font-medium">
                  <div>
                    <div>{formData.fullName}</div>
                    <div className="text-[#8e95a7]">{formData.street}, {formData.city}, {formData.country}</div>
                  </div>
                  <div className="text-right text-emerald-400">
                    <div>2–4 Business Days</div>
                    <div className="text-[11px] text-[#7f8698]">Express Courier</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#212635] space-y-1.5 text-[#a2a9ba]">
                  <div className="flex justify-between">
                    <span>Payment Status</span>
                    <span className="text-white">
                      {paymentMethod === 'cod' ? 'Pending on Delivery' : 'Authorized & Captured'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>30-Day Road Wear Trial</span>
                    <span className="text-emerald-400">Active until 30 days post-delivery</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#212635]">
                    <span>Total Amount Charged</span>
                    <span className="text-[#ff5500] font-mono text-base">{formatPrice(total, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="bg-[#ff5500] hover:bg-[#ff661a] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
