import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export const ComingSoonCard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="project-card-wrapper">
      <div className="flex flex-col gap-4 group h-full select-none">
        <div className="w-full h-76 overflow-hidden rounded-xl relative bg-card border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-4 transition-all duration-300 group-hover:border-primary/40">
          <div className="size-16 bg-white rounded-full flex items-center justify-center shadow-sm">
            <div className="size-12 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-primary font-semibold">Coming Soon</span>
            <span className="text-xs text-text-secondary">
              {t("projects.comingSoonDesc")}
            </span>
          </div>
        </div>
        <div className="px-2">
          <h3 className="text-xl md:text-lg font-medium mb-3 text-text-secondary/50">
            {t("projects.comingSoonTitle")}
          </h3>
          <div className="flex items-center gap-3 bg-card/50 rounded-full pl-3 pr-4 py-2 w-fit">
            <div className="size-4 bg-text-secondary/20 rounded-full"></div>
            <strong className="text-sm md:text-xs font-semibold text-text-secondary/40">
              {t("projects.comingSoonBadge")}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
