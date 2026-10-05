import React, { useState } from 'react';
import { Layers, Zap, Compass, Wind, Activity } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      title: '01. Supercritical Aeroflex PEBA Core',
      metric: '91% Rebound',
      detail: 'Formulated in liquid nitrogen chambers without blowing agents, yielding an ultra-closed-cell foam matrix that resists temperature degradation from -20°C to +40°C.',
      icon: Zap,
      spec: 'Density: 0.11 g/cm³ · Energy Return: 91.4%',
    },
    {
      title: '02. 3K Contoured Carbon Propulsion Cradle',
      metric: '1.4mm Thickness',
      detail: 'Anatomically molded with a parabolic scoop geometry. Unlike planar stiffening plates, the 3D scoop flexes on heel transition and unloads with explosive longitudinal stiffness at toe-off.',
      icon: Activity,
      spec: 'Modulus: 240 GPa · Longitudinal Pop: +4.2%',
    },
    {
      title: '03. Laser-Siped Griptec Outsole Compound',
      metric: '0.8mm Base Web',
      detail: 'Liquid-injected micro-lugged rubber matrix with directional hydro-siping that disperses surface water in 12 milliseconds, maintaining high friction coefficient on wet painted road lines.',
      icon: Compass,
      spec: 'Wet Grip Coeff: 0.88μ · Weight: 32g total',
    },
  ];

  return (
    <section id="engineering-section" className="py-20 bg-[#0e1016] border-t border-[#1e222e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-[#ff5500]">
            Engineering & Biomechanics
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2 [text-wrap:balance]">
            The Tri-Density Anatomy of Motion.
          </h2>
          <p className="text-sm sm:text-base text-[#9198aa] mt-3 leading-relaxed">
            Every millimeter of the chassis is tuned in our Portland motion laboratory and hand-assembled in Civitanova Marche. 
            Zero extraneous plastics. Pure propulsive mechanics.
          </p>
        </div>

        {/* Interactive Layer Breakdown */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls list */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              const isActive = activeLayer === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-[#161a25] border-[#ff5500] shadow-lg shadow-[#ff5500]/10'
                      : 'bg-[#12141c] border-[#222736] hover:border-[#353c50] opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-[#ff5500] text-white' : 'bg-[#1a1e2b] text-[#7d8496]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display text-sm font-bold text-white">
                        {layer.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#ff5500]">{layer.metric}</span>
                  </div>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-[#252b3d] text-xs text-[#9ea5b8] space-y-2 animate-in fade-in">
                      <p className="leading-relaxed">{layer.detail}</p>
                      <div className="font-mono text-[11px] text-[#ff5500] bg-[#1a1e2b] p-2 rounded">
                        {layer.spec}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Visual Technical Diagram Panel */}
          <div className="lg:col-span-7">
            <div className="bg-[#12151e] border border-[#232838] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#232838] pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#8a92a5]">
                  <Layers className="w-4 h-4 text-[#ff5500]" />
                  <span>CADENCE LABORATORY // VIRTUAL SOLE EXPLODED STACK</span>
                </div>
                <span className="text-xs font-mono text-[#ff5500] font-bold">CALIBRATION 04</span>
              </div>

              {/* Graphical Stack Visualization */}
              <div className="space-y-4">
                {/* Upper Knit */}
                <div className={`p-4 rounded-xl border transition-all ${activeLayer === 0 ? 'border-[#384055] bg-[#181c28]' : 'border-[#222635] bg-[#141722]'}`}>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white font-semibold">Engineered Circular Monomesh Upper</span>
                    <span className="text-[#7d8496]">42g Single Layer</span>
                  </div>
                </div>

                {/* Layer 1: PEBA Midsole */}
                <div className={`p-4 rounded-xl border transition-all ${activeLayer === 0 ? 'border-[#ff5500] bg-[#ff5500]/10 scale-[1.02]' : 'border-[#222635] bg-[#141722]'}`}>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500]" />
                      <span className="text-white font-semibold">Supercritical PEBA Midsole Foam</span>
                    </div>
                    <span className="text-[#ff5500] font-bold">39.5mm Stack Apex</span>
                  </div>
                </div>

                {/* Layer 2: Carbon Fork */}
                <div className={`p-4 rounded-xl border transition-all ${activeLayer === 1 ? 'border-[#ff5500] bg-[#ff5500]/10 scale-[1.02]' : 'border-[#222635] bg-[#141722]'}`}>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      <span className="text-white font-semibold">3K Aerospace Carbon-Composite Propulsion Shank</span>
                    </div>
                    <span className="text-white font-bold">1.4mm Full Length</span>
                  </div>
                </div>

                {/* Layer 3: Outsole */}
                <div className={`p-4 rounded-xl border transition-all ${activeLayer === 2 ? 'border-[#ff5500] bg-[#ff5500]/10 scale-[1.02]' : 'border-[#222635] bg-[#141722]'}`}>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-white font-semibold">Griptec Laser-Siped Wet Traction Rubber</span>
                    </div>
                    <span className="text-emerald-400 font-bold">0.8mm Web Depth</span>
                  </div>
                </div>
              </div>

              {/* Lab verification callout */}
              <div className="mt-6 pt-4 border-t border-[#232838] flex flex-wrap items-center justify-between text-xs font-mono text-[#787f92] gap-4">
                <span>Tested over 12,000 continuous road kilometers</span>
                <span className="text-white font-medium">World Athletics Spec Approved</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
