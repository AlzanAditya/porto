import React from "react";

interface ProjectDetailGalleryProps {
  images: string[];
  title: string;
  onOpenLightbox: (index: number) => void;
}

export const ProjectDetailGallery: React.FC<ProjectDetailGalleryProps> = ({
  images,
  title,
  onOpenLightbox,
}) => {
  if (!images || images.length === 0) return null;

  // We display at most 4 slots on the grid
  const displayImages = images.slice(0, 4);
  const remainingCount = images.length > 4 ? images.length - 3 : 0;

  return (
    <div
      id="project-detail-gallery-grid"
      className="grid md:grid-cols-12 gap-4 mb-8 md:mb-12 image-grid"
    >
      {displayImages.map((image, index) => {
        const isLastSlotWithMore = index === 3 && remainingCount > 0;
        const colSpanClass =
          displayImages.length === 1 ? "md:col-span-12" : "md:col-span-6";

        return (
          <div
            key={index}
            id={`project-gallery-item-${index}`}
            className={`${colSpanClass} animate-image relative group overflow-hidden rounded-xl bg-card border border-foreground/5 shadow-xs`}
            onClick={() => onOpenLightbox(index)}
          >
            <img
              alt={`${title} screenshot ${index + 1}`}
              data-cursor="View"
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              className="w-full aspect-4/4 rounded-xl object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
              src={image}
            />

            {isLastSlotWithMore && (
              <div
                id="gallery-view-more-overlay"
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/50"
              >
                <span className="text-white text-4xl md:text-5xl font-bold mb-1">
                  +{remainingCount}
                </span>
                <span className="text-white/80 text-sm md:text-base font-medium tracking-wide uppercase">
                  View More
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
