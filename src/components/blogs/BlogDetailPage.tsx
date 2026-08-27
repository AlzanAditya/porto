import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Blog } from "../../types";
import { SplitWords } from "../common/SplitWords";

gsap.registerPlugin(ScrollTrigger);

interface BlogDetailPageProps {
  blog: Blog;
  allBlogs: Blog[];
  onNavigate: (path: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  blog,
  allBlogs,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const otherBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".blog-cover-sticky", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".blog-nav-crumb",
          {
            y: -10,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .from(
          ".blog-meta-row",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".blog-main-title",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".blog-excerpt-box",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".blog-body-content",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
    },
    { scope: containerRef, dependencies: [blog.id] }
  );

  return (
    <div ref={containerRef} className="min-h-screen py-6 md:py-10">
      <section className="px-4 md:px-12 lg:px-36 xl:px-48 2xl:container mx-auto relative pb-16 md:pb-24">
        {/* Main Grid: Left Cover Image (Sticky) + Right Content */}
        <div className="grid lg:grid-cols-12 mt-4 md:mt-8 gap-8 lg:gap-12 mb-12 md:mb-16">
          {/* Left Column: Sticky Cover Image */}
          <div className="lg:col-span-5">
            <div className="blog-cover-sticky relative overflow-hidden lg:sticky top-28 rounded-2xl aspect-4/5 bg-card w-full shadow-lg border border-foreground/10">
              <img
                alt={blog.title}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                src={blog.coverImage}
              />
            </div>
          </div>

          {/* Right Column: Breadcrumb, Meta, Title, and Article Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav className="blog-nav-crumb flex items-center flex-wrap gap-2 text-sm md:text-base font-medium text-text-secondary">
              <a
                href="/blogs"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/blogs");
                }}
                className="hover:text-text-primary transition-colors duration-300"
              >
                Blogs
              </a>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-xs text-text-secondary/40"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              <span className="text-text-primary font-semibold truncate max-w-xs">
                {blog.tags[0]}
              </span>
            </nav>

            {/* Meta Tags & Dates */}
            <div className="blog-meta-row flex items-center gap-3">
              <div className="flex gap-2 items-center bg-card px-3.5 py-1.5 rounded-full border border-foreground/10">
                <div className="size-2.5 bg-linear-to-br from-primary to-secondary text-white rounded-full"></div>
                <strong className="font-semibold text-xs text-text-primary">
                  {blog.tags[0]}
                </strong>
              </div>
              <span className="text-xs font-medium text-text-secondary">
                {blog.publishDate}
              </span>
              <span className="text-xs text-text-secondary">•</span>
              <span className="text-xs font-medium text-text-secondary">
                {blog.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="blog-main-title text-3xl md:text-5xl font-bold text-text-primary leading-tight">
              <SplitWords text={blog.title} />
            </h1>

            {/* Excerpt Highlight Box */}
            <div className="blog-excerpt-box p-4 md:p-5 bg-card/70 border-l-4 border-primary rounded-r-xl text-text-primary font-medium text-base md:text-lg leading-relaxed">
              {blog.excerpt}
            </div>

            {/* Formatted Content */}
            <div className="blog-body-content text-text-secondary leading-relaxed text-base md:text-lg flex flex-col gap-6 pt-4 border-t border-foreground/10">
              {blog.content.split("\n\n").map((paragraph, pIdx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={pIdx}
                      className="text-xl md:text-2xl font-bold text-text-primary mt-4"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph
                    .split("\n")
                    .map((item) => item.replace("- ", ""));
                  return (
                    <ul
                      key={pIdx}
                      className="list-disc list-inside flex flex-col gap-2 pl-2"
                    >
                      {items.map((item, iIdx) => (
                        <li key={iIdx} className="text-text-secondary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith("1. ")) {
                  const items = paragraph.split("\n");
                  return (
                    <ol
                      key={pIdx}
                      className="list-decimal list-inside flex flex-col gap-2 pl-2"
                    >
                      {items.map((item, iIdx) => (
                        <li key={iIdx} className="text-text-secondary">
                          {item.replace(/^\d+\.\s*/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Author Profile Card */}
            <div className="mt-8 p-6 bg-card rounded-2xl border border-foreground/10 flex flex-col sm:flex-row items-center gap-5 justify-between">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img
                  alt="Mahendra Arya"
                  className="size-16 rounded-full object-cover border-2 border-white shadow-sm"
                  src="/avatar/BebArya.webp"
                />
                <div>
                  <strong className="text-lg font-bold block text-text-primary">
                    Mahendra Arya
                  </strong>
                  <p className="text-xs text-text-secondary">
                    Web Developer &amp; Founder at Karyasite
                  </p>
                </div>
              </div>

              {/* Share & Copy button */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-foreground/10 hover:bg-neutral-50 text-sm font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sm"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span>{copied ? "Link Copied!" : "Share Article"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* More Articles */}
        {otherBlogs.length > 0 && (
          <div className="border-t border-foreground/10 pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
              Recent Articles You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherBlogs.map((b) => (
                <a
                  key={b.id}
                  data-cursor="read"
                  href={`/blogs/${b.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/blogs/${b.slug}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group flex flex-col md:flex-row gap-4 bg-card p-4 rounded-2xl border border-foreground/10 hover:border-primary/40 transition-all duration-300 shadow-xs"
                >
                  <div className="overflow-hidden rounded-xl w-full md:w-44 h-36 shrink-0 bg-card">
                    <img
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                      src={b.coverImage}
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <span className="text-xs font-semibold text-primary">
                        {b.tags[0]}
                      </span>
                      <h4 className="font-semibold text-base text-text-primary group-hover:text-primary transition-colors duration-300 line-clamp-2 mt-1">
                        {b.title}
                      </h4>
                    </div>
                    <span className="text-xs text-text-secondary">
                      {b.publishDate}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
