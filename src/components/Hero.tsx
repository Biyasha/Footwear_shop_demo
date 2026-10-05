import React from 'react';
import { ArrowUpRight, Zap, Shield, Compass } from 'lucide-react';
import { HERO_CAMPAIGN_IMAGE } from '../data/products';

interface HeroProps {
  onExploreCollection: () => void;
  onExploreEngineering: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onExploreEngineering,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0d0f14] border-b border-[#1e222b] pt-12 pb-16 lg:py-20">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ff5500]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial & Technical Prose */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Unboxed Metadata (Anti-Pill compliant) */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ff5500]">
              <span>Series 04</span>
              <span aria-hidden="true" className="text-[#454a59]">·</span>
              <span>Cadence Architecture</span>
              <span aria-hidden="true" className="text-[#454a59]">·</span>
              <span>Civitanova Marche & Portland</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Engineered For Unbroken Cadence.
            </h1>

            {/* Body measure 65-75ch */}
            <p className="text-[#a0a6b8] text-base sm:text-lg leading-relaxed max-w-xl">
              Precision road racers, technical scree trail tools, and Italian nubuck atelier silhouettes. 
              Forged with nitrogen-supercritical foam cores and 3D curved carbon-fiber propulsion plates.
            </p>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="bg-[#ff5500] hover:bg-[#ff661a] text-white font-semibold text-xs tracking-wider uppercase px-6 py-3.5 rounded transition-all shadow-lg shadow-[#ff5500]/20 flex items-center gap-2 group cursor-pointer active:scale-95"
              >
                <span>Explore Series 04</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onExploreEngineering}
                className="bg-[#171922] hover:bg-[#202430] text-[#c5c9d6] hover:text-white border border-[#2b303e] font-semibold text-xs tracking-wider uppercase px-5 py-3.5 rounded transition-colors cursor-pointer"
              >
                View Tri-Density Anatomy
              </button>
            </div>

            {/* Claim-to-Proof Quantitative Adjacency */}
            <div className="pt-8 border-t border-[#1e222d] grid grid-cols-3 gap-6">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">91%</div>
                <div className="text-xs text-[#7d8496] mt-1 font-medium">Kinetic Energy Return</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">178g</div>
                <div className="text-xs text-[#7d8496] mt-1 font-medium">Race Day Spec (US 9)</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">30-Day</div>
                <div className="text-xs text-[#7d8496] mt-1 font-medium">Road Wear Trial</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#14171f] border border-[#232733] shadow-2xl group">
              <div className="aspect-[16/10] sm:aspect-[16/11] overflow-hidden relative">
                <img
                  src={HERO_CAMPAIGN_IMAGE}
                  alt="Aeroform running shoe floating mid-air with sculpted sole architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle scrim overlay for editorial text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-transparent opacity-80" />

                {/* Quiet Floating Technical Specs callout */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between bg-[#12141c]/90 backdrop-blur-md border border-[#2a2f3e] p-3 sm:p-4 rounded-xl">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#ff5500]">Flagship Silhouette</div>
                    <div className="text-sm font-bold text-white">Cadence Carbon Evo 01</div>
                  </div>
                  <div className="text-right font-mono text-xs text-[#a0a6b8]">
                    <div>39.5mm Stack</div>
                    <div className="text-[#ff5500] font-bold">World Athletics Legal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality badges unboxed */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#6e7587] px-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#ff5500]" />
                Supercritical Nitrogen Core
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#ff5500]" />
                Hand-Calibrated Plate
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#ff5500]" />
                Zero Hot-Spot Last
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
