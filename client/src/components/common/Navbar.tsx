import React from 'react';

interface NavbarProps {
  currentRoute: 'landing' | 'about' | 'work';
  onNavigate: (route: 'landing' | 'about' | 'work') => void;
  darkHero?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, darkHero = false }) => {
  const isLightText = darkHero && currentRoute === 'landing';

  return (
    <header className="w-full z-50 transition-colors duration-200">
      <nav className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-5 md:py-6 flex items-center justify-between">
        {/* Left: ABOUT */}
        <button
          onClick={() => onNavigate('about')}
          className={`min-h-[44px] min-w-[44px] px-2 sm:px-3 py-2 flex items-center font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.25em] uppercase font-bold transition-all duration-200 cursor-pointer ${
            currentRoute === 'about'
              ? 'text-[#00F000]'
              : isLightText
              ? 'text-white/90 hover:text-[#00F000]'
              : 'text-[#080808]/90 hover:text-[#00F000]'
          }`}
        >
          ABOUT
        </button>

        {/* Center: THE BALYA */}
        <button
          onClick={() => onNavigate('landing')}
          className={`min-h-[44px] px-2 sm:px-4 py-2 flex items-center font-display text-lg sm:text-xl md:text-2xl tracking-[0.08em] sm:tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer ${
            isLightText ? 'text-white hover:text-[#00F000]' : 'text-[#080808] hover:text-[#00F000]'
          }`}
        >
          THE BALYA
        </button>

        {/* Right: WORK */}
        <button
          onClick={() => onNavigate('work')}
          className={`min-h-[44px] min-w-[44px] px-2 sm:px-3 py-2 flex items-center justify-end font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.25em] uppercase font-bold transition-all duration-200 cursor-pointer ${
            currentRoute === 'work'
              ? 'text-[#00F000]'
              : isLightText
              ? 'text-white/90 hover:text-[#00F000]'
              : 'text-[#080808]/90 hover:text-[#00F000]'
          }`}
        >
          WORK
        </button>
      </nav>
    </header>
  );
};
