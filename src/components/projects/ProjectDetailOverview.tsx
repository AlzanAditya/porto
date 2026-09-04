import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Badge } from "../ui/badge";

interface ProjectDetailOverviewProps {
  overview: string;
  tags: string[];
}

export const ProjectDetailOverview: React.FC<ProjectDetailOverviewProps> = ({
  overview,
  tags,
}) => {
  const { t } = useLanguage();

  return (
    <div
      id="project-detail-overview-column"
      className="lg:col-span-7 flex flex-col gap-8 md:gap-12"
    >
      {/* Project Overview */}
      <div id="project-overview-section" className="animate-overview">
        <h2 className="text-2xl md:text-3xl font-medium mb-3 md:mb-4 text-text-primary">
          {t("projectDetail.overviewTitle")}
        </h2>
        <p className="md:text-lg font-medium text-text-secondary leading-relaxed">
          {overview}
        </p>
      </div>

      {/* Project Tags */}
      {tags && tags.length > 0 && (
        <div id="project-tags-section">
          <h3 className="text-xl md:text-2xl font-medium mb-5 animate-tags-title text-text-primary">
            {t("projectDetail.tagsTitle")}
          </h3>
          <div className="flex flex-wrap gap-2 gap-y-3">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                type="simple"
                className="animate-tags"
                label={tag}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
