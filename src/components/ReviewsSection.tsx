import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0d0f14] border-t border-[#1e222d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#ff5500]">
              Field Verification & Race Log
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Tested Over Thousands of Kilometers.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-[#8a92a5]">
            4.9 / 5.0 Composite Fleet Rating <span className="text-[#3b4152]">·</span> 440+ Verified Logged Runs
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#12151e] border border-[#212635] p-6 rounded-2xl flex flex-col justify-between space-y-6"
            >
              <div>
                {/* Unboxed Metadata: Shoe & Verified Mileage */}
                <div className="flex items-center justify-between text-xs font-mono text-[#787f91] mb-3">
                  <span className="text-[#ff5500] font-semibold">{rev.shoe}</span>
                  <span className="flex items-center gap-1 text-[#8c93a4]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {rev.verifiedMileage}
                  </span>
                </div>

                {/* Attributable Quote */}
                <p className="text-sm text-[#c8cedd] leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Attribution */}
              <div className="pt-4 border-t border-[#1e222f] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{rev.author}</div>
                  <div className="text-xs text-[#7d8496] font-mono">{rev.role}</div>
                </div>
                <div className="text-xs text-[#6a7182] font-mono">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
