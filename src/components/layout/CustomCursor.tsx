import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over element with data-cursor attribute or interactive links
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        const interactive = (e.target as HTMLElement)?.closest("a, button, input, textarea") as HTMLElement | null;
        if (interactive) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "width 0.25s ease, height 0.25s ease, background-color 0.3s, transform 0.1s ease",
      }}
      className={`fixed pointer-events-none z-9999 hidden lg:flex items-center justify-center text-white font-bold uppercase tracking-wider overflow-hidden rounded-full shadow-md ${
        cursorText
          ? "w-18 h-18 bg-primary text-[10px] scale-100"
          : isHovered
          ? "w-8 h-8 bg-primary/80 text-[6px] scale-100"
          : "w-3.5 h-3.5 bg-primary text-[4px]"
      } ${isClicked ? "scale-90" : ""}`}
    >
      {cursorText && <span className="animate-in fade-in zoom-in-75 duration-200">{cursorText}</span>}
    </div>
  );
};
