import React, { useState, useRef, useEffect } from "react";
import { SplitWords } from "../common/SplitWords";

interface ProjectsHeroProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export const ProjectsHero: React.FC<ProjectsHeroProps> = ({
  activeCategory,
  onSelectCategory,
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayCategoryLabel =
    activeCategory === "All" || activeCategory === "all"
      ? "Search by category"
      : activeCategory;

  return (
    <section className="px-4 pt-6 md:pt-8 2xl:container mx-auto relative min-h-[40vh] md:min-h-[45vh] 2xl:min-h-[40vh] overflow-y-clip md:overflow-y-visible">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          {/* Hero Badge */}
          <div className="hero-badge flex items-center gap-3 px-4 py-2 border border-text-secondary/30 w-fit rounded-full">
            <span className="size-3 bg-primary rounded-full"></span>
            <strong className="font-medium text-sm md:text-lg">
              Project Portofolio
            </strong>
          </div>

          {/* Hero Title and Subtitle */}
          <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
            <h1 className="hero-title font-semibold text-[32px] leading-[1.2] md:text-6xl md:leading-[1.3] mb-2 md:mb-4">
              <SplitWords text="Selected Projects" />
            </h1>
            <h2 className="hero-subtitle font-medium lg:w-[90%] md:text-xl text-text-secondary">
              From ideas to real projects that actually work.
            </h2>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div ref={dropdownRef} className="filter-wrapper relative z-40">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-card text-text-primary justify-between w-72 pl-6 pr-4 py-3 rounded-full border border-neutral-100/50 hover:border-neutral-200/80 shadow-xs"
            >
              <p className="font-medium text-text-secondary">
                {displayCategoryLabel}
              </p>
              <div className="size-9 flex items-center justify-center group-hover:btn-hover bg-linear-to-br from-primary to-secondary text-white rounded-full btn-hover transition-transform duration-300">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className={`text-lg text-white transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                </svg>
              </div>
            </button>

            <div
              className={`absolute top-full left-0 mt-3 w-72 bg-white border border-neutral-100 rounded-2xl p-2 z-80 flex flex-col gap-1 origin-top transition-all duration-300 shadow-xl ${
                isOpen
                  ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                  : "opacity-0 scale-95 pointer-events-none -translate-y-2"
              }`}
            >
              <button
                onClick={() => {
                  onSelectCategory("All");
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeCategory === "All" || activeCategory === "all"
                    ? "bg-card/70 text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-neutral-50"
                }`}
              >
                <span>All Categories</span>
                {(activeCategory === "All" || activeCategory === "all") && (
                  <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                )}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm text-left transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    activeCategory === cat
                      ? "bg-card/70 text-primary font-semibold"
                      : "text-text-secondary hover:text-text-primary hover:bg-neutral-50"
                  }`}
                >
                  <span>{cat}</span>
                  {activeCategory === cat && (
                    <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Particles */}
      <img
        alt=""
        width="900"
        height="900"
        decoding="async"
        className="hero-bg-particle absolute -right-48 lg:-right-96 -bottom-32 lg:-bottom-72 -z-1 pointer-events-none select-none"
        src="/particle/purple.png"
      />
      <img
        alt=""
        width="900"
        height="900"
        decoding="async"
        className="hero-bg-particle absolute -left-48 lg:-left-96 -bottom-32 lg:-bottom-72 -z-1 pointer-events-none select-none"
        src="/particle/blue.png"
      />
    </section>
  );
};
