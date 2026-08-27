import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project } from "../../types";
import { ProjectsHero } from "./ProjectsHero";
import { RecentProjectSection } from "./RecentProjectSection";
import { ProjectGridItem } from "./ProjectGridItem";
import { ComingSoonCard } from "./ComingSoonCard";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsViewProps {
  projects: Project[];
  onNavigate: (path: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ["Dashboard System", "Web App", "Website"];

  const filteredProjects =
    selectedCategory === "All" || selectedCategory === "All Categories"
      ? projects
      : projects.filter((p) => {
          if (selectedCategory === "Dashboard System") {
            return (
              p.category === "Dashboard System" ||
              p.category === "System & ERP"
            );
          }
          return p.category === selectedCategory;
        });

  // Recent delivered project (Taksu Explore or first project)
  const recentProject =
    projects.find(
      (p) => p.slug === "taksu-explore-tour-and-travel-booking"
    ) || projects[0];

  useGSAP(
    () => {
      // Hero entrance animations
      gsap
        .timeline()
        .from(".hero-badge", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-title .word",
          {
            y: 60,
            opacity: 0,
            filter: "blur(15px)",
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".filter-wrapper",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Section 1: Recently Delivered Projects
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#recent-projects",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        })
        .from(".recent-title", {
          y: 30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".recent-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".recent-project-card",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Section 2: Everything I've Built
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#all-projects-section",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        })
        .from(".everything-title", {
          y: 30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".everything-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".project-card-wrapper",
          {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* 1. Hero Section */}
      <ProjectsHero
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        categories={categories}
      />

      {/* 2. Recently Delivered Projects Section */}
      {recentProject && (
        <RecentProjectSection
          project={recentProject}
          onNavigate={onNavigate}
        />
      )}

      {/* 3. Everything I've Built Section */}
      <section
        id="all-projects-section"
        className="pt-12 lg:pt-20 px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 md:mb-12 lg:mb-20">
          <h2 className="everything-title project-title font-semibold text-3xl md:text-5xl mb-2 lg:mb-0 leading-[1.2]">
            Everything I've Built
          </h2>
          <p className="everything-desc project-desc md:text-lg font-medium text-text-secondary lg:text-right">
            All my projects in one place.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-clip gap-8 md:gap-5 md:gap-y-8">
          {filteredProjects.map((project) => (
            <ProjectGridItem
              key={project.id}
              project={project}
              onNavigate={onNavigate}
            />
          ))}

          {/* 10th Card: Coming Soon (shown when viewing all categories or web app) */}
          {(selectedCategory === "All" ||
            selectedCategory === "All Categories") && <ComingSoonCard />}
        </div>
      </section>
    </div>
  );
};
