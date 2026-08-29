import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { TextMarquee } from "../components/common/TextMarquee";
import { AboutSection } from "../components/home/AboutSection";
import { LatestProjectsSection } from "../components/home/LatestProjectsSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { SkillsSection } from "../components/home/SkillsSection";
import { ShowcaseSection } from "../components/home/ShowcaseSection";
import { ContactSection } from "../components/home/ContactSection";
import { RecentBlogsSection } from "../components/home/RecentBlogsSection";
import { Project, Blog } from "../types";

interface HomePageProps {
  projects: Project[];
  blogs: Blog[];
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  blogs,
  onNavigate,
}) => {
  return (
    <main className="flex flex-col w-full overflow-x-clip">
      <HeroSection onNavigate={onNavigate} />
      <TextMarquee />
      <AboutSection onNavigate={onNavigate} />
      <LatestProjectsSection projects={projects} onNavigate={onNavigate} />
      <ServicesSection />
      <SkillsSection />
      <ShowcaseSection projects={projects} onNavigate={onNavigate} />
      <ContactSection />
      <RecentBlogsSection blogs={blogs} onNavigate={onNavigate} />
    </main>
  );
};
