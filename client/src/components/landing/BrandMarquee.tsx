import React from 'react';
import type { BrandItem } from '../../data/portfolio';

interface BrandMarqueeProps {
  brands: BrandItem[];
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ brands }) => {
  // Duplicate for continuous seamless ticker
  const marqueeList = [...brands, ...brands, ...brands, ...brands];

  return (
    <section id="brand-marquee" className="w-full bg-white py-4 sm:py-8 md:py-12 border-b border-neutral-200 overflow-hidden relative">
      <div className="flex w-full overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-6 sm:gap-14 md:gap-24 pl-3 sm:pl-8 will-change-transform">
          {marqueeList.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center justify-center h-7 sm:h-11 md:h-16 w-24 sm:w-36 md:w-48 flex-shrink-0 grayscale opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
