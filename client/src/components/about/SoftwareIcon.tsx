import type { SoftwareItem } from '../../data/portfolio';


interface SoftwareIconProps {
  software: SoftwareItem;
}

export const SoftwareIcon: React.FC<SoftwareIconProps> = ({ software }) => {
  return (
    <div className="flex flex-col items-center group w-full max-w-[95px] sm:max-w-[110px]">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-[#080808] flex items-center justify-center p-1 sm:p-1.5 transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1.5 group-hover:shadow-[0_0_25px_rgba(0,255,0,0.35)] border border-neutral-800/80 group-hover:border-[#00FF00] overflow-hidden relative">
        {/* Subtle inner phosphor scanline glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none rounded-2xl sm:rounded-3xl" />
        <img
          src={software.icon}
          alt={software.name}
          className="w-full h-full object-contain scale-[1.38] sm:scale-[1.42] filter group-hover:brightness-125 transition-transform duration-300 group-hover:scale-[1.48]"
        />
      </div>
      <span className="mt-2 text-[10px] sm:text-xs font-mono font-medium text-neutral-500 group-hover:text-[#00FF00] transition-colors duration-200 text-center truncate max-w-full tracking-wider">
        {software.name}
      </span>
    </div>
  );
};
