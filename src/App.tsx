import React, { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CustomCursor } from "./components/layout/CustomCursor";
import { TextMarquee } from "./components/common/TextMarquee";
import { HeroSection } from "./components/home/HeroSection";
import { AboutSection } from "./components/home/AboutSection";
import { LatestProjectsSection } from "./components/home/LatestProjectsSection";
import { ServicesSection } from "./components/home/ServicesSection";
import { SkillsSection } from "./components/home/SkillsSection";
import { ShowcaseSection } from "./components/home/ShowcaseSection";
import { RecentBlogsSection } from "./components/home/RecentBlogsSection";
import { ContactSection } from "./components/home/ContactSection";
import { ProjectsView } from "./components/projects/ProjectsView";
import { ProjectDetailPage } from "./components/projects/ProjectDetailPage";
import { BlogsView } from "./components/blogs/BlogsView";
import { BlogDetailPage } from "./components/blogs/BlogDetailPage";
import { AboutPageView } from "./components/about/AboutPageView";
import { ProgressiveBlur } from "./components/common/ProgressiveBlur";

import { projectsData } from "./data/projectsData";
import { blogsData } from "./data/blogsData";

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || "/";
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle programmatic navigation
  const handleNavigate = (path: string) => {
    // If navigating to hash anchor on home page
    if (path.startsWith("/#") || path.startsWith("#")) {
      const hash = path.replace("/", "");
      if (currentPath !== "/") {
        window.history.pushState({}, "", "/");
        setCurrentPath("/");
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Route matching logic
  const renderRoute = () => {
    // 1. Project Detail: /projects/:slug
    if (currentPath.startsWith("/projects/") && currentPath.length > 10) {
      const slug = currentPath.replace("/projects/", "").replace(".html", "").replace("/", "");
      const project =
        projectsData.find((p) => p.slug === slug) ||
        projectsData.find((p) => p.slug.includes(slug)) ||
        projectsData[0];

      return (
        <ProjectDetailPage
          project={project}
          allProjects={projectsData}
          onNavigate={handleNavigate}
        />
      );
    }

    // 2. Projects List: /projects
    if (currentPath === "/projects" || currentPath === "/projects.html") {
      return <ProjectsView projects={projectsData} onNavigate={handleNavigate} />;
    }

    // 3. Blog Detail: /blogs/:slug
    if (currentPath.startsWith("/blogs/") && currentPath.length > 7) {
      const slug = currentPath.replace("/blogs/", "").replace(".html", "").replace("/", "");
      const blog =
        blogsData.find((b) => b.slug === slug) ||
        blogsData.find((b) => b.slug.includes(slug)) ||
        blogsData[0];

      return (
        <BlogDetailPage
          blog={blog}
          allBlogs={blogsData}
          onNavigate={handleNavigate}
        />
      );
    }

    // 4. Blogs List: /blogs
    if (currentPath === "/blogs" || currentPath === "/blogs.html") {
      return <BlogsView blogs={blogsData} onNavigate={handleNavigate} />;
    }

    // 5. About Page: /about
    if (currentPath === "/about" || currentPath === "/about.html") {
      return <AboutPageView onNavigate={handleNavigate} />;
    }

    // 6. Default: Home Page with all 1:1 original sections
    return (
      <>
        <HeroSection onNavigate={handleNavigate} />
        <TextMarquee />
        <AboutSection onNavigate={handleNavigate} />
        <LatestProjectsSection projects={projectsData} onNavigate={handleNavigate} />
        <ServicesSection />
        <SkillsSection />
        <ShowcaseSection projects={projectsData} onNavigate={handleNavigate} />
        <RecentBlogsSection blogs={blogsData} onNavigate={handleNavigate} />
        <ContactSection />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-950 font-['Satoshi'] selection:bg-primary selection:text-white">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Global Navbar */}
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {renderRoute()}
        <ProgressiveBlur />
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
