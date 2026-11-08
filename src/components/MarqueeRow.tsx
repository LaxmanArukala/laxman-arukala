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
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  const renderItems = (hidden: boolean) =>
    items.map((item, i) => (
      <li
        key={`${hidden ? "b" : "a"}-${i}`}
        aria-hidden={hidden || undefined}
        className="flex flex-shrink-0 items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
      >
        <span className="flex-shrink-0">{item.icon}</span>
        <span className="whitespace-nowrap font-display text-[15px] text-white/80">
          {item.name}
        </span>
      </li>
    ));

  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className={`flex w-max gap-4 ${animClass} group-hover:[animation-play-state:paused]`}>
        {renderItems(false)}
        {renderItems(true)}
      </ul>
    </div>
  );
};

export default MarqueeRow;
