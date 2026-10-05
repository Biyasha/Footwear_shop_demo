import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface SizingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizingGuideModal: React.FC<SizingGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'measure' | 'arch'>('matrix');

  if (!isOpen) return null;

  const sizeTable = [
    { usMen: '7.0', usWomen: '8.5', uk: '6.5', eu: '40.0', cm: '25.0', inch: '9.8' },
    { usMen: '7.5', usWomen: '9.0', uk: '7.0', eu: '40.5', cm: '25.5', inch: '10.0' },
    { usMen: '8.0', usWomen: '9.5', uk: '7.5', eu: '41.0', cm: '26.0', inch: '10.2' },
    { usMen: '8.5', usWomen: '10.0', uk: '8.0', eu: '42.0', cm: '26.5', inch: '10.4' },
    { usMen: '9.0', usWomen: '10.5', uk: '8.5', eu: '42.5', cm: '27.0', inch: '10.6' },
    { usMen: '9.5', usWomen: '11.0', uk: '9.0', eu: '43.0', cm: '27.5', inch: '10.8' },
    { usMen: '10.0', usWomen: '11.5', uk: '9.5', eu: '44.0', cm: '28.0', inch: '11.0' },
    { usMen: '10.5', usWomen: '12.0', uk: '10.0', eu: '44.5', cm: '28.5', inch: '11.2' },
    { usMen: '11.0', usWomen: '12.5', uk: '10.5', eu: '45.0', cm: '29.0', inch: '11.4' },
    { usMen: '11.5', usWomen: '13.0', uk: '11.0', eu: '45.5', cm: '29.5', inch: '11.6' },
    { usMen: '12.0', usWomen: '13.5', uk: '11.5', eu: '46.0', cm: '30.0', inch: '11.8' },
    { usMen: '13.0', usWomen: '14.5', uk: '12.5', eu: '47.5', cm: '31.0', inch: '12.2' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#11131a] border border-[#262b3a] rounded-2xl w-full max-w-3xl my-6 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#202533] flex items-center justify-between bg-[#141721]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff5500]">
              Biomechanical Fit Protocol
            </span>
            <h2 className="font-display font-bold text-white text-lg sm:text-xl">
              Precision Sizing & Last Anatomy
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8d94a6] hover:text-white rounded-lg hover:bg-[#1b1f2b] transition-colors"
            aria-label="Close sizing guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#202533] px-6 bg-[#13151e] gap-4">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
              activeTab === 'matrix' ? 'border-[#ff5500] text-white' : 'border-transparent text-[#7e8597] hover:text-white'
            }`}
          >
            International Conversion
          </button>
          <button
            onClick={() => setActiveTab('measure')}
            className={`py-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
              activeTab === 'measure' ? 'border-[#ff5500] text-white' : 'border-transparent text-[#7e8597] hover:text-white'
            }`}
          >
            How To Measure
          </button>
          <button
            onClick={() => setActiveTab('arch')}
            className={`py-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
              activeTab === 'arch' ? 'border-[#ff5500] text-white' : 'border-transparent text-[#7e8597] hover:text-white'
            }`}
          >
            Arch Profile Match
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'matrix' && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono tabular-nums">
                  <thead>
                    <tr className="border-b border-[#242939] text-[#7d8496]">
                      <th className="py-2 px-3">US MEN</th>
                      <th className="py-2 px-3">US WOMEN</th>
                      <th className="py-2 px-3">UK</th>
                      <th className="py-2 px-3">EU</th>
                      <th className="py-2 px-3">FOOT (CM)</th>
                      <th className="py-2 px-3">FOOT (INCH)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b1f2c] text-[#c7cddc]">
                    {sizeTable.map((row) => (
                      <tr key={row.usMen} className="hover:bg-[#161a25] transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white">{row.usMen}</td>
                        <td className="py-2.5 px-3">{row.usWomen}</td>
                        <td className="py-2.5 px-3">{row.uk}</td>
                        <td className="py-2.5 px-3 text-[#ff5500]">{row.eu}</td>
                        <td className="py-2.5 px-3">{row.cm}</td>
                        <td className="py-2.5 px-3 text-[#7d8496]">{row.inch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#808799] mt-4 font-mono">
                * Note: Cadence Carbon racing models feature an aerodynamic racing lock. If you wear thick merino socks or prefer a thumb-width room ahead of your longest toe, size up 0.5 US.
              </p>
            </div>
          )}

          {activeTab === 'measure' && (
            <div className="space-y-4 text-xs font-mono text-[#a5acbd] leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#151822] p-4 rounded-xl border border-[#232838] space-y-2">
                  <div className="text-white font-bold text-sm">01. Trace Foot</div>
                  <p>Step barefoot onto a blank sheet of paper positioned flat against an uncarpeted wall with your heel flush to the baseboard.</p>
                </div>
                <div className="bg-[#151822] p-4 rounded-xl border border-[#232838] space-y-2">
                  <div className="text-white font-bold text-sm">02. Mark Longest Toe</div>
                  <p>Hold a pencil vertically and mark the apex of your longest toe. Measure in centimeters from the edge of the paper to this mark.</p>
                </div>
                <div className="bg-[#151822] p-4 rounded-xl border border-[#232838] space-y-2">
                  <div className="text-white font-bold text-sm">03. Add Cadence Allowance</div>
                  <p>Add 4mm to 7mm for foot swell during high-cadence distance running and match to our international conversion table.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'arch' && (
            <div className="space-y-4 text-xs font-mono text-[#a5acbd]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#151822] p-4 rounded-xl border border-[#232838] space-y-2">
                  <div className="text-white font-bold text-sm">Neutral Cadence</div>
                  <p className="text-[11px] text-[#7d8496]">Standard impact dispersal across metatarsal pad.</p>
                  <div className="text-[#ff5500] font-semibold mt-2">Recommended: Aeroform Pulse 01</div>
                </div>
                <div className="bg-[#151822] p-4 rounded-xl border border-[#232838] space-y-2">
                  <div className="text-white font-bold text-sm">High Rigid Arch</div>
                  <p className="text-[11px] text-[#7d8496]">High peak forces requiring maximum energy dissipation.</p>
                  <div className="text-[#ff5500] font-semibold mt-2">Recommended: Cadence Carbon Evo</div>
                </div>
                <div className="bg-[#151822] p-4 rounded-xl border border-[#232838] space-y-2">
                  <div className="text-white font-bold text-sm">Low Arch / Pronator</div>
                  <p className="text-[11px] text-[#7d8496]">Requires torsional chassis control and firm medial heel wrap.</p>
                  <div className="text-[#ff5500] font-semibold mt-2">Recommended: Terraform Ridge</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#202533] bg-[#141721] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#ff5500] hover:bg-[#ff661a] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
