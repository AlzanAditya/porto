import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../../types";
import { SplitWords } from "../common/SplitWords";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseSectionProps {
  projects: Project[];
  onNavigate: (path: string) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  projects,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        })
        .from(".showcase-header", {
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".showcase-container",
          {
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .to(
          ".showcase-overlay",
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "+=0.4"
        )
        .from(
          ".showcase-modal",
          {
            y: 40,
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        )
        .from(
          ".showcase-modal-icon",
          {
            scale: 0,
            rotation: -20,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .from(
          ".showcase-modal-text",
          {
            y: 15,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  // Triple projects for infinite vertical scrolling background columns
  const col1 = [...projects, ...projects, ...projects];
  const col2 = [
    ...projects.slice().reverse(),
    ...projects.slice().reverse(),
    ...projects.slice().reverse(),
  ];
  const col3 = [
    ...projects.slice(2),
    ...projects.slice(0, 2),
    ...projects,
    ...projects,
  ];

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="py-12 lg:py-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-hidden select-none"
    >
      {/* Header */}
      <div className="showcase-header flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
        <h2 className="font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
          <SplitWords text="A Showcase of My Projects" />
        </h2>
        <p className="md:text-lg font-medium text-text-secondary lg:w-[32%] lg:text-right">
          Explore a selection of my latest and most meaningful projects.
        </p>
      </div>

      {/* Interactive Gallery Stage with Centered Overlay Modal */}
      <div className="showcase-container relative h-[550px] md:h-[620px] overflow-hidden rounded-2xl md:rounded-3xl border border-foreground/10 bg-card/30">
        {/* Animated project background streams */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-4 opacity-40 hover:opacity-70 transition-opacity duration-500">
          {/* Column 1 - Scrolling up */}
          <div className="flex flex-col gap-4 animate-marquee-vertical">
            {col1.map((p, idx) => (
              <div
                key={`c1-${idx}`}
                className="group relative shrink-0 bg-linear-to-br from-primary/10 to-secondary/10 rounded-xl border border-foreground/5 overflow-hidden w-full h-56 md:h-64"
              >
                <img
                  alt={p.title}
                  loading="lazy"
                  className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                  src={p.images[0]}
                />
              </div>
            ))}
          </div>

          {/* Column 2 - Scrolling down */}
          <div className="flex flex-col gap-4 animate-marquee-vertical-reverse">
            {col2.map((p, idx) => (
              <div
                key={`c2-${idx}`}
                className="group relative shrink-0 bg-linear-to-br from-primary/10 to-secondary/10 rounded-xl border border-foreground/5 overflow-hidden w-full h-56 md:h-64"
              >
                <img
                  alt={p.title}
                  loading="lazy"
                  className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                  src={p.images[0]}
                />
              </div>
            ))}
          </div>

          {/* Column 3 - Hidden on mobile */}
          <div className="hidden md:flex flex-col gap-4 animate-marquee-vertical">
            {col3.map((p, idx) => (
              <div
                key={`c3-${idx}`}
                className="group relative shrink-0 bg-linear-to-br from-primary/10 to-secondary/10 rounded-xl border border-foreground/5 overflow-hidden w-full h-56 md:h-64"
              >
                <img
                  alt={p.title}
                  loading="lazy"
                  className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                  src={p.images[0]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient backdrop shield */}
        <div className="showcase-overlay absolute inset-0 bg-radial from-background/70 via-background/40 to-transparent pointer-events-none opacity-0"></div>

        {/* Centered Modal Card */}
        <div className="absolute z-10 inset-0 flex justify-center items-center p-4">
          <div className="showcase-modal w-full max-w-sm md:max-w-md p-6 md:p-8 flex flex-col justify-between shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl border border-white/80">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <span className="showcase-modal-icon bg-linear-to-br from-primary to-secondary text-white p-3 rounded-xl shadow-xs">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="text-2xl md:text-3xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"></path>
                  </svg>
                </span>
                <div>
                  <strong className="showcase-modal-text text-2xl md:text-3xl font-bold text-text-primary block">
                    9+
                  </strong>
                  <p className="showcase-modal-text font-medium text-xs md:text-sm text-text-secondary">
                    Projects Published
                  </p>
                </div>
              </div>
              <p className="showcase-modal-text text-text-secondary text-sm md:text-base leading-relaxed">
                Over the past 3 years, I've not only learned the theory but also
                applied it through real-world projects and practical experience.
              </p>
            </div>

            <div className="mt-6 showcase-modal-text">
              <a
                className="flex items-center cursor-pointer font-medium gap-2 group transition-all duration-300 ease-in-out bg-gradient-to-br from-primary to-secondary text-white px-5 py-3 rounded-xl btn-hover shadow-md w-full justify-center"
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/projects");
                }}
              >
                <div className="flex gap-2 items-center justify-center w-full">
                  <span className="scroll-text flex">
                    <span className="font-semibold">View Selected Projects</span>
                    <span className="font-semibold">View Selected Projects</span>
                  </span>
                  <div className="p-1 rounded-full transition-all duration-300 ease-in-out group-hover:bg-white/40">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="-rotate-45"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
