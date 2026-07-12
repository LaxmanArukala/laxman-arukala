import React from "react";

interface GradientBlobsProps {
  variant?: "cool" | "warm" | "mixed";
}

const PALETTES: Record<string, string[]> = {
  cool: ["bg-blue-400/20", "bg-indigo-400/20", "bg-cyan-300/20"],
  warm: ["bg-pink-400/20", "bg-orange-300/20", "bg-purple-400/20"],
  mixed: ["bg-emerald-300/20", "bg-purple-400/20", "bg-blue-300/20"],
};

const GradientBlobs: React.FC<GradientBlobsProps> = ({ variant = "cool" }) => {
  const [a, b, c] = PALETTES[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -top-24 -left-16 w-80 h-80 ${a} rounded-full blur-3xl`}
      />
      <div
        className={`absolute top-1/3 -right-20 w-96 h-96 ${b} rounded-full blur-3xl`}
      />
      <div
        className={`absolute -bottom-24 left-1/3 w-72 h-72 ${c} rounded-full blur-3xl`}
      />
    </div>
  );
};

export default GradientBlobs;
