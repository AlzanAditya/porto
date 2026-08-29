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
    <div
      data-cursor="ROLES"
      className="relative w-[110%] overflow-hidden bg-text-primary border-y border-foreground/5 py-6 md:py-8 select-none -rotate-3 md:-rotate-1 -translate-x-4 -translate-y-4 z-10"
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
  );
};

