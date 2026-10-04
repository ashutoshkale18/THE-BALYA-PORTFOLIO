import React from 'react';

interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  company,
  role,
  period,
  highlights
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 py-6 sm:py-8 border-b border-neutral-300">
      <div className="flex-1 pr-0 sm:pr-4">
        <h3 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#080808]">
          {company}
        </h3>
        <p className="font-mono text-xs sm:text-sm md:text-base text-neutral-600 mt-1 mb-3 sm:mb-4">
          {role}
        </p>

        <ul className="space-y-1.5 sm:space-y-2">
          {highlights.map((item, idx) => (
            <li key={idx} className="font-body text-xs sm:text-sm md:text-base text-neutral-800 leading-relaxed flex items-start">
              <span className="text-[#00F000] mr-2 font-mono select-none">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dashed green period badge as seen in About reference */}
      <div className="self-start sm:self-start mt-1 sm:mt-0 px-3 sm:px-4 py-1 sm:py-1.5 border-2 border-dashed border-[#00F000] font-mono text-xs sm:text-sm md:text-base font-bold text-[#080808] whitespace-nowrap flex-shrink-0">
        {period}
      </div>
    </div>
  );
};
