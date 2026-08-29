import React, { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CustomCursor } from "./components/layout/CustomCursor";
import { HeroSection } from "./components/home/HeroSection";
import { TextMarquee } from "./components/common/TextMarquee";
import { AboutSection } from "./components/home/AboutSection";
import { LatestProjectsSection } from "./components/home/LatestProjectsSection";
import { ServicesSection } from "./components/home/ServicesSection";
import { SkillsSection } from "./components/home/SkillsSection";
import { ShowcaseSection } from "./components/home/ShowcaseSection";
import { ContactSection } from "./components/home/ContactSection";
import { RecentBlogsSection } from "./components/home/RecentBlogsSection";
import { AboutPageView } from "./components/about/AboutPageView";
import { ProjectsView } from "./components/projects/ProjectsView";
import { ProjectDetailPage } from "./components/projects/ProjectDetailPage";
import { BlogsView } from "./components/blogs/BlogsView";
import { BlogDetailPage } from "./components/blogs/BlogDetailPage";
import { ProgressiveBlur } from "./components/common/ProgressiveBlur";
import { projectsData } from "./data/projectsData";
import { blogsData } from "./data/blogsData";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderContent = () => {
    // 1. Project Detail: /projects/:slug
    if (currentPath.startsWith("/projects/")) {
      const slug = currentPath.replace("/projects/", "").split("/")[0];
      const matchedProject =
        projectsData.find((p) => p.slug === slug || p.id === slug) ||
        projectsData[0];

      return (
        <ProjectDetailPage
          project={matchedProject}
          allProjects={projectsData}
          onNavigate={navigate}
        />
      );
    }

    // 2. Blog Detail: /blogs/:slug or /blog/:slug
    if (currentPath.startsWith("/blogs/") || currentPath.startsWith("/blog/")) {
      const slug = currentPath
        .replace("/blogs/", "")
        .replace("/blog/", "")
        .split("/")[0];
      const matchedBlog =
        blogsData.find((b) => b.slug === slug || b.id === slug) || blogsData[0];

      return (
        <BlogDetailPage
          blog={matchedBlog}
          allBlogs={blogsData}
          onNavigate={navigate}
        />
      );
    }

    // 3. Projects Catalog: /projects
    if (currentPath === "/projects") {
      return (
        <ProjectsView projects={projectsData} onNavigate={navigate} />
      );
    }

    // 4. Blogs View: /blogs or /blog
    if (currentPath === "/blogs" || currentPath === "/blog") {
      return (
        <BlogsView blogs={blogsData} onNavigate={navigate} />
      );
    }

    // 5. About Page: /about
    if (currentPath === "/about") {
      return <AboutPageView onNavigate={navigate} />;
    }

    // 6. Home View: default /
    return (
      <main className="flex flex-col w-full overflow-x-clip">
        <HeroSection onNavigate={navigate} />
        <TextMarquee />
        <AboutSection onNavigate={navigate} />
        <LatestProjectsSection projects={projectsData} onNavigate={navigate} />
        <ServicesSection />
        <SkillsSection />
        <ShowcaseSection projects={projectsData} onNavigate={navigate} />
        <ContactSection />
        <RecentBlogsSection blogs={blogsData} onNavigate={navigate} />
      </main>
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-text-primary flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <CustomCursor />
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <div className="flex-1 w-full">{renderContent()}</div>
      <ProgressiveBlur />
      <Footer onNavigate={navigate} />
    </div>
  );
}
