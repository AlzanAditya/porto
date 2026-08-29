import React from "react";
import { Project } from "../../types";

interface ProjectGridItemProps {
  project: Project;
  onNavigate: (path: string) => void;
}

export const ProjectGridItem: React.FC<ProjectGridItemProps> = ({
  project,
  onNavigate,
}) => {
  const primaryImg =
    project.images[0] ||
    "/projects/Taksu Explore - Tour & Travel Booking/cover.png";
  const hoverImg =
    project.images[1] ||
    project.images[0] ||
    "/projects/Taksu Explore - Tour & Travel Booking/content-1.png";

  return (
    <div className="project-card-wrapper">
      <a
        href={`/projects/${project.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(`/projects/${project.slug}`);
        }}
        className="block"
      >
        <div className="flex flex-col gap-4 group cursor-pointer">
          {/* Card Media with dual-image vertical slide on hover */}
          <div className="w-full h-76 overflow-hidden rounded-xl relative bg-white">
            <div
              data-cursor="view"
              className="flex flex-col h-full transition-transform duration-500 ease-in-out group-hover:-translate-y-full"
            >
              <div className="w-full h-full shrink-0">
                <img
                  alt={project.title}
                  loading="lazy"
                  width="800"
                  height="600"
                  decoding="async"
                  className="w-full h-full object-cover"
                  src={primaryImg}
                />
              </div>
              <div className="w-full h-full shrink-0">
                <img
                  alt={`${project.title} hover`}
                  loading="lazy"
                  width="800"
                  height="600"
                  decoding="async"
                  className="w-full h-full object-cover"
                  src={hoverImg}
                />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div>
            <h3 className="text-xl md:text-lg font-medium mb-3 px-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-card rounded-full pl-3 pr-4 py-2 w-fit group-hover:btn-hover">
                <div className="size-4 bg-linear-to-br from-primary to-secondary rounded-full"></div>
                <strong className="text-sm md:text-xs font-semibold">
                  {project.category}
                </strong>
              </div>
              <div className="text-text-secondary flex items-center gap-2 text-sm md:text-xs">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"></path>
                </svg>
                <p className="font-semibold">{project.uploadedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
