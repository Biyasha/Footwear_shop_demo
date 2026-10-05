import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenSizingGuide: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizingGuide,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#0b0c10] border-t border-[#1b1e28] text-xs font-mono text-[#81889a] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1b1e28]">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-display text-xl font-bold text-white tracking-tight">
              KINETIC ATELIER
            </div>
            <p className="text-xs text-[#8e95a7] leading-relaxed max-w-sm">
              Dedicated to mechanical energy return and architectural footwear minimalism. 
              Dual-developed between our biomechanics lab in Portland, Oregon and our precision shoe atelier in Civitanova Marche, Italy.
            </p>
            <div className="text-[11px] text-[#697082] pt-2">
              © {new Date().getFullYear()} Kinetic Atelier Footwear Co. All rights reserved.
            </div>
          </div>

          {/* Catalog Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-bold uppercase text-[11px] tracking-wider">Silhouettes</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('running')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Road Running
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('racing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Marathon Super-Shoes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('trail')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Technical Trail
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('court')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Italian Nubuck Court
                </button>
              </li>
            </ul>
          </div>

          {/* Craftsmanship & Guidance */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-white font-bold uppercase text-[11px] tracking-wider">Engineering & Care</div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenSizingGuide}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sizing Matrix & Arch Lasts
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Supercritical PEBA Recycling
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  30-Day Road Wear Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Free Carbon-Neutral Returns
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatch */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-white font-bold uppercase text-[11px] tracking-wider">
              The Dispatch · Early Run Access
            </div>
            <p className="text-xs text-[#8e95a7] leading-relaxed">
              Receive confidential laboratory drop schedules, prototype wear-tester calls, and race-day launch allotments.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="runner@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#13161f] border border-[#232838] focus:border-[#ff5500] rounded p-2.5 text-xs text-white placeholder-[#687082] outline-none font-mono"
                />
                <button
                  type="submit"
                  className="bg-[#ff5500] hover:bg-[#ff661a] text-white p-2.5 rounded transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 font-mono">
                  ✓ Dispatch clearance confirmed. Welcome to the cohort.
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Quiet Bottom Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#636a7b]">
          <div className="flex items-center gap-4">
            <span>Portland Motion Lab: 45.5152° N, 122.6784° W</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Civitanova Atelier: 43.3072° N, 13.7289° E</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy & Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Supply Chain Audit</span>
            <span className="hover:text-white transition-colors cursor-pointer">Declaration of Conformity</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
