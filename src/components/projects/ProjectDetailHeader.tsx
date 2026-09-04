import React from "react";
import { Project } from "../../types";
import { useLanguage } from "../../context/LanguageContext";
import { Button } from "../ui/button";
import { Breadcrumb } from "../common/breadcrumb";

interface ProjectDetailHeaderProps {
  project: Project;
  onNavigate: (path: string) => void;
}

export const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({
  project,
  onNavigate,
}) => {
  const { lang, t } = useLanguage();

  const title = (lang === "id" ? project.title_id : project.title_en) || project.title;
  const category = (lang === "id" ? project.category_id : project.category_en) || project.category;
  const words = title.split(" ");
  const sourceCodeUrl = project.sourceCodeUrl || project.githubUrl;

  return (
    <div
      id="project-detail-header-grid"
      className="grid lg:grid-cols-12 mt-8 md:mt-12 gap-6 md:gap-5 mb-8 md:mb-12"
    >
      <div className="lg:col-span-7 flex flex-col gap-4 md:gap-3 min-w-0">
        {/* Breadcrumb */}
        <Breadcrumb
          className="w-full min-w-0"
          items={[
            {
              id: "breadcrumb-projects-link",
              label: t("projectDetail.breadcrumb.projects") || "Projects",
              href: "/projects",
              onClick: () => onNavigate("/projects"),
            },
            {
              id: "breadcrumb-category-link",
              label: category,
              href: "/projects",
              onClick: () => onNavigate("/projects"),
            },
            {
              id: "breadcrumb-current-title",
              label: title,
              isCurrent: true,
            },
          ]}
        />

        {/* Title */}
        <h1
          id="project-detail-main-title"
          className="text-2xl md:text-4xl font-medium md:leading-[1.4] animate-title"
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block pb-1">
              <span className="word inline-block">{word}&nbsp;</span>
            </span>
          ))}
        </h1>
      </div>

      {/* Action Buttons */}
      <div
        id="project-detail-action-buttons"
        className="lg:col-span-5 flex gap-3 items-center md:items-end lg:justify-end animate-buttons"
      >
        {Boolean(project.demoUrl && project.demoUrl.trim()) && (
          <Button
            id="view-live-demo-button"
            variant="primary"
            scrollText
            target="_blank"
            rel="noopener noreferrer"
            href={project.demoUrl}
            iconLeft={
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                className="text-xl transition-all duration-300 ease-in-out group-hover:scale-120"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
              </svg>
            }
          >
            {t("projectDetail.viewDemo")}
          </Button>
        )}

        {sourceCodeUrl && (
          <Button
            id="view-source-code-button"
            variant="secondary"
            scrollText
            target="_blank"
            rel="noopener noreferrer"
            href={sourceCodeUrl}
            iconRight={
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="text-lg -rotate-45 transition-all duration-300 ease-in-out group-hover:scale-120 group-hover:text-background"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
              </svg>
            }
          >
            {t("projectDetail.sourceCode")}
          </Button>
        )}
      </div>
    </div>
  );
};
