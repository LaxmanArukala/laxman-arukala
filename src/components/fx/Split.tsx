import React from "react";

/**
 * Splits text into per-character spans for staggered reveals.
 * Screen readers get the full text once via a visually hidden copy.
 */
export const SplitChars: React.FC<{
  text: string;
  className?: string;
  charClassName?: string;
}> = ({ text, className = "", charClassName = "" }) => (
  <span className={`inline-block overflow-hidden ${className}`}>
    <span className="sr-only">{text}</span>
    {Array.from(text).map((ch, i) => (
      <span
        key={i}
        aria-hidden="true"
        className={`split-char inline-block will-change-transform ${charClassName}`}
      >
        {ch === " " ? " " : ch}
      </span>
    ))}
  </span>
);

/** Splits text into per-word spans (optionally masked) for reveal or scrub effects. */
export const SplitWords: React.FC<{
  text: string;
  className?: string;
  wordClassName?: string;
  masked?: boolean;
}> = ({ text, className = "", wordClassName = "", masked = false }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span
            aria-hidden="true"
            className={masked ? "inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top" : "inline"}
          >
            <span className={`split-word inline-block ${wordClassName}`}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
};
