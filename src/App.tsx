import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CustomCursor } from "./components/layout/CustomCursor";
import { ProgressiveBlur } from "./components/common/ProgressiveBlur";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BlogsPage } from "./pages/BlogsPage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { projectsData } from "./data/projectsData";
import { blogsData } from "./data/blogsData";
import { LanguageProvider } from "./context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

/**
 * Determines if the target route requires the reference loading screen.
 * Based on the reference Next.js App Router architecture:
 * - /projects and /projects/:slug have loading.tsx
 * - /blogs/:slug (or /blog/:slug) has loading.tsx
 * - /, /about, and /blogs (list) DO NOT have loading.tsx
 */
const shouldShowLoading = (path: string): boolean => {
  const clean = path.split("?")[0].split("#")[0];

  // 1. Projects listing: /projects
  if (clean === "/projects" || clean === "/projects/") {
    return true;
  }

  // 2. Project detail: /projects/:slug
  if (clean.startsWith("/projects/") && clean.length > "/projects/".length) {
    return true;
  }

  // 3. Blog detail: /blogs/:slug or /blog/:slug (NOT /blogs or /blog catalog)
  if (
    (clean.startsWith("/blogs/") && clean.length > "/blogs/".length) ||
    (clean.startsWith("/blog/") && clean.length > "/blog/".length)
  ) {
    return true;
  }

  return false;
};

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  // Only show loading screen on initial load if the route actually requires it
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return shouldShowLoading(window.location.pathname || "/");
    }
    return false;
  });
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Disable browser automatic scroll restoration to avoid jumping to old positions
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Handle initial page load if direct route requires loading screen
  useEffect(() => {
    if (isLoading) {
      // Brief duration for entrance animation (~350ms), then slide up
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  const navigate = (path: string) => {
    if (typeof window === "undefined") return;

    // Check if it is purely an in-page anchor scroll on the same page
    if (path.startsWith("#") || (path.startsWith("/#") && currentPath === "/")) {
      const hash = path.includes("#") ? path.substring(path.indexOf("#")) : "";
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Immediately jump to the absolute top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const needsLoading = shouldShowLoading(path);

    if (needsLoading) {
      // Show loading screen
      setIsLoading(true);
      setIsExiting(false);

      // Brief transition delay (~350ms) matching reference route preparation
      // Does NOT wait for all images/assets so top-text entrance animations are visible as curtain lifts
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        window.history.pushState(null, "", path);
        setCurrentPath(path);

        // Trigger curtain slide-up precisely as the new page component mounts
        setIsExiting(true);
        ScrollTrigger.refresh();
      }, 350);
    } else {
      // Direct navigation for /, /about, /blogs listing without loading screen
      window.history.pushState(null, "", path);
      setCurrentPath(path);
      ScrollTrigger.refresh();

      // If target URL contains a hash, scroll to it after rendering
      if (path.includes("#")) {
        const hash = path.substring(path.indexOf("#"));
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  };

  // Browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname || "/";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      if (shouldShowLoading(nextPath)) {
        setIsLoading(true);
        setIsExiting(false);
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          setCurrentPath(nextPath);
          setIsExiting(true);
          ScrollTrigger.refresh();
        }, 350);
      } else {
        setCurrentPath(nextPath);
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleExitComplete = () => {
    setIsLoading(false);
    setIsExiting(false);
    ScrollTrigger.refresh();
  };

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
        <ProjectsPage projects={projectsData} onNavigate={navigate} />
      );
    }

    // 4. Blogs View: /blogs or /blog
    if (currentPath === "/blogs" || currentPath === "/blog") {
      return (
        <BlogsPage blogs={blogsData} onNavigate={navigate} />
      );
    }

    // 5. About Page: /about
    if (currentPath === "/about") {
      return <AboutPage onNavigate={navigate} />;
    }

    // 6. Home Page: default /
    return (
      <HomePage
        projects={projectsData}
        blogs={blogsData}
        onNavigate={navigate}
      />
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-background text-text-primary flex flex-col font-sans selection:bg-primary/20 selection:text-primary relative">
      <LoadingScreen
        isVisible={isLoading}
        isExiting={isExiting}
        onExitComplete={handleExitComplete}
      />
      <CustomCursor />
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <div id="main-content-container" className="flex-1 w-full">
        {renderContent()}
      </div>
      <ProgressiveBlur />
      <Footer key={currentPath} currentPath={currentPath} onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
