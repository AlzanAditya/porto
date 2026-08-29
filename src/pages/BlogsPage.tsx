import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Blog } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { BlogsHero } from "../components/blogs/BlogsHero";
import { BlogCardItem } from "../components/blogs/BlogCardItem";

gsap.registerPlugin(ScrollTrigger);

interface BlogsPageProps {
  blogs: Blog[];
  onNavigate: (path: string) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ blogs, onNavigate }) => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Entrance animations for hero badge, title, subtitle, and cards
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
          ".blog-card-wrapper",
          {
            y: 40,
            opacity: 0,
            stagger: 0.1,
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
      <BlogsHero />

      {/* 2. Blog List Section */}
      <section
        id="blog-list"
        className="px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto overflow-x-hidden select-none pb-16 md:pb-24"
      >
        <div className="grid md:grid-cols-2 gap-6 gap-y-10">
          {blogs.map((blog) => (
            <BlogCardItem
              key={blog.id}
              blog={blog}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
