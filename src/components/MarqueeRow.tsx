import React from "react";

interface MarqueeItem {
  icon: React.ReactNode;
  name: string;
}

interface MarqueeRowProps {
  items: MarqueeItem[];
  direction?: "left" | "right";
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = "left" }) => {
  const doubled = [...items, ...items];
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max gap-4 ${animClass} group-hover:[animation-play-state:paused]`}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex flex-shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-sm"
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="whitespace-nowrap text-sm font-medium text-gray-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeRow;
