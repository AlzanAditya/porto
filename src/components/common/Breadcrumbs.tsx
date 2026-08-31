import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ActivePage } from '../../types';

interface BreadcrumbsProps {
  items: { label: string; page?: ActivePage; onClick?: () => void }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-6 py-2 px-3 rounded-full bg-zinc-100/80 w-fit border border-zinc-200/60">
      <div className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors">
        <Home className="w-3.5 h-3.5 text-[#5e2cd1]" />
        <span>ZANXA STUDIO</span>
      </div>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            {isLast || !item.onClick ? (
              <span className="font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-zinc-900 transition-colors font-medium cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
