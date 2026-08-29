import React from "react";

const MARQUEE_ITEMS = [
  { text: "Solopreneur", star: "/particle/star-purple.svg" },
  { text: "Freelance Web Developer", star: "/particle/star-blue.svg" },
  { text: "Software engineer student", star: "/particle/star-purple.svg" },
  { text: "Robotic Enthusiast", star: "/particle/star-blue.svg" },
];

export const TextMarquee: React.FC = () => {
  // 6 sets repeated (24 items total) ensures seamless infinite looping without gaps on any screen width
  const repeated = [
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
    ...MARQUEE_ITEMS,
  ];

  return (
    // Outer clipping wrapper: strictly w-full (never wider than the document flow),
    // so the oversized/rotated inner band below is always clipped to the page width
    // instead of pushing the whole site into horizontal scroll.
    // `isolate` + z-30 forces this to sit above any other page content (hero
    // photos, decorative particles, etc.) regardless of DOM/stacking-context
    // quirks from those sections, while staying below the Navbar (z-50) and
    // CustomCursor (z-9999).
    <div className="relative isolate z-30 w-full overflow-hidden">
      <div
        data-cursor="ROLES"
        className="relative w-[110%] -ml-[5%] overflow-hidden bg-text-primary border-y border-foreground/5 py-6 md:py-8 select-none -rotate-3 md:-rotate-1 -translate-y-4"
      >
        <div className="flex whitespace-nowrap animate-marquee group w-max">
          {repeated.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-6 md:gap-10 px-4 md:px-10 shrink-0"
            >
              <span className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-background">
                {item.text}
              </span>
              <img
                alt=""
                loading="lazy"
                width="40"
                height="40"
                decoding="async"
                className="w-6 h-6 md:w-10 md:h-10 group-hover:rotate-45 transition-all duration-800 shrink-0"
                src={item.star}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

