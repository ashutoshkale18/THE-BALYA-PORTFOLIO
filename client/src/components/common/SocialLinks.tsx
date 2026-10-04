import React from 'react';

interface SocialLinksProps {
  className?: string;
  sizeClass?: string;
  variant?: 'dark' | 'light';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  sizeClass = 'w-7 h-7 sm:w-8 sm:h-8',
  variant = 'dark'
}) => {
  return (
    <div className={`flex items-center gap-4 sm:gap-6 ${className}`}>
      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/aryan-nikam-1b378030a/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="group relative transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <img
          src="/assets/header_and_footer_elements/header_and_footer_elements-05.png"
          alt="LinkedIn"
          className={`${sizeClass} object-contain transition-opacity duration-200 ${variant === 'light' ? 'brightness-0 invert' : ''
            }`}
        />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com/thebalya"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Profile"
        className="group relative transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <img
          src="/assets/header_and_footer_elements/header_and_footer_elements-06.png"
          alt="Instagram"
          className={`${sizeClass} object-contain transition-opacity duration-200 ${variant === 'light' ? 'brightness-0 invert' : ''
            }`}
        />
      </a>
    </div>
  );
};
