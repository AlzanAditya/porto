import React from "react";

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const SplitWords: React.FC<SplitWordsProps> = ({
  text,
  className = "",
  wordClassName = "word inline-block",
}) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className={wordClassName}>
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
};
