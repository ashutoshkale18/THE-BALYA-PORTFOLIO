import React from 'react';

interface GreenDividerProps {
  className?: string;
  heightClass?: string;
}

export const GreenDivider: React.FC<GreenDividerProps> = ({
  className = '',
  heightClass = 'h-6 sm:h-10 md:h-12'
}) => {
  return (
    <div className={`w-full overflow-hidden flex bg-[#00F000] ${heightClass} ${className}`}>
      {/* Left diagonal striped section — narrow black slashes on green like reference design */}
      <div className="w-[200px] sm:w-[300px] md:w-[400px] h-full flex-shrink-0 relative overflow-hidden">
        <svg className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="divider-stripes" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
              <rect width="32" height="32" fill="#00F000" />
              <rect width="10" height="32" fill="#080808" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#divider-stripes)" />
        </svg>
      </div>

      {/* Right solid electric green section */}
      <div className="flex-1 bg-[#00F000]" />
    </div>
  );
};
