import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#181a20] text-[#a0a6b5] text-xs border-b border-[#262933] py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-[#7e8597]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500]" />
          <span>Atelier Certified Direct · Civitanova & Portland Labs</span>
        </div>

        <div className="flex-1 text-center font-medium text-[#dcdfe6] text-xs">
          Complimentary express worldwide dispatch on orders over $150 <span className="text-[#656c7d] mx-2">·</span> 30-day road wear test guarantee
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-[#7e8597] hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
