import React from "react";
import { tools } from "../../data/portfolio";

/** Skills, part B: the tools used day to day. */
const ToolsIndex: React.FC = () => (
  <div role="region" aria-labelledby="tools-title" className="tone-cream py-20 md:py-28">
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
      <p className="eyebrow">Toolbox</p>
      <h3 id="tools-title" className="display mt-6 text-[clamp(2.2rem,4.5vw,4rem)]">
        Tools &amp; Technologies I Use Daily
      </h3>
      <ul className="mt-12 grid border-t border-fg/25 lg:grid-cols-2 lg:gap-x-12">
        {tools.map((t) => (
          <li key={t.name} className="flex gap-4 border-b border-fg/25 py-4">
            <t.icon size={18} className="mt-1 shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="font-display text-lg font-medium">{t.name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-fg/75">{t.category}</p>
              </div>
              <p className="mt-0.5 text-sm text-fg/85">{t.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ToolsIndex;
