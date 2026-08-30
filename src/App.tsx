import React, { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CustomCursor } from "./components/layout/CustomCursor";
import { ProgressiveBlur } from "./components/common/ProgressiveBlur";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { projectsData } from "./data/projectsData";
import { blogsData } from "./data/blogsData";

function AppContent() {
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
    <div className="min-h-screen w-full overflow-x-clip bg-background text-text-primary flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <CustomCursor />
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <div className="flex-1 w-full">{renderContent()}</div>
      <ProgressiveBlur />
      <Footer onNavigate={navigate} />
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

