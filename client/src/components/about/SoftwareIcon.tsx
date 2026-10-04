import type { SoftwareItem } from '../../data/portfolio';


interface SoftwareIconProps {
  software: SoftwareItem;
}

export const SoftwareIcon: React.FC<SoftwareIconProps> = ({ software }) => {
  return (
    <div className="flex flex-col items-center group w-full max-w-[80px]">
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-black flex items-center justify-center p-2 sm:p-2.5 transition-all duration-300 transform group-hover:scale-105 sm:group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,240,0,0.4)] border border-neutral-800 group-hover:border-[#00F000]">
        <img
          src={software.icon}
          alt={software.name}
          className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
        />
      </div>
      <span className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-mono text-neutral-500 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 text-center truncate max-w-full">
        {software.name}
      </span>
    </div>
  );
};
