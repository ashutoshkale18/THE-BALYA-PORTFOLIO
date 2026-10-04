import React from 'react';

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, className = '' }) => {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Outer container matching header_and_footer_elements-07 styling */}
      <div className="relative flex items-center h-11 sm:h-13 md:h-15 pl-4 sm:pl-6 pr-3 sm:pr-4">
        {/* Background Graphic Asset Frame */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="/assets/header_and_footer_elements/header_and_footer_elements-07.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-fill"
          />
        </div>

        {/* Title Text positioned inside left open area */}
        <h2 className="relative z-10 font-work text-xl sm:text-2xl md:text-3xl text-[#080808] tracking-tight uppercase mr-16 sm:mr-24 md:mr-32 select-none whitespace-nowrap font-bold">
          {title}
        </h2>
      </div>
    </div>
  );
};
