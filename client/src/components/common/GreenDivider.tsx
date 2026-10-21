import React from 'react';

interface GreenDividerProps {
  className?: string;
  heightClass?: string;
}

export const GreenDivider: React.FC<GreenDividerProps> = ({
  className = '',
  heightClass = 'h-14 sm:h-16 md:h-20'
}) => {
  return (
    <div className={`w-full overflow-hidden flex bg-[#00FF00] ${heightClass} relative ${className}`}>
      {/* Left diagonal black stripes matching footer stripe exactly */}
      <div className="w-[180px] sm:w-[280px] md:w-[420px] lg:w-[500px] h-full absolute left-0 top-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/header_and_footer_elements/header_and_footer_elements-02.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* Right solid electric green section with seamless #00FF00 match */}
      <div className="flex-1 bg-[#00FF00]" />
    </div>
  );
};
