import React from "react";
import { SplitWords } from "../common/SplitWords";

export const BlogsHero: React.FC = () => {
  return (
    <section className="px-4 pt-6 md:pt-8 2xl:container mx-auto relative min-h-[40vh] md:min-h-[45vh] 2xl:min-h-[40vh] overflow-y-visible select-none">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center">
          {/* Hero Badge */}
          <div className="hero-badge flex items-center gap-3 px-4 py-2 border border-text-secondary/30 w-fit rounded-full">
            <span className="size-3 bg-primary rounded-full"></span>
            <strong className="font-medium text-sm md:text-lg">
              Blog &amp; Article
            </strong>
          </div>

          {/* Hero Title and Subtitle */}
          <div className="mt-6 md:mt-8 flex flex-col items-center text-center">
            <h1 className="hero-title font-semibold text-[32px] leading-[1.2] md:text-6xl md:leading-[1.3] mb-2 md:mb-6">
              <span className="inline-block pb-1">
                <span className="word inline-block">Ideas,&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">insights,&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">&amp;&nbsp;</span>
              </span>
              <span className="inline-block pb-1">
                <span className="word inline-block">inspiration</span>
              </span>
            </h1>
            <h2 className="hero-subtitle font-medium lg:w-[60%] md:text-xl text-text-secondary">
              Thoughts on web dev, freelancing, and creative growth, shared to
              inform, encourage, and spark new perspectives
            </h2>
          </div>
        </div>
      </div>

      {/* Hero Ambient Background Particles */}
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
