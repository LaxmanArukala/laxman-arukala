import React, { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, MQ } from "../../lib/gsap";
import { tools } from "../../data/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Skills — part B. A console-style index of daily tools: hover or focus a
 * row and the inspector on the right prints its details.
 */
const ToolsIndex: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const tool = tools[active];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".tools-head > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".tools-row", {
          x: -30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: ".tools-list", start: "top 80%" },
        });
        gsap.from(".tools-inspector", {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".tools-list", start: "top 70%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      role="region"
      aria-labelledby="tools-title"
      className="relative border-t border-white/[0.08] bg-[linear-gradient(180deg,rgba(79,140,255,0.04),transparent_40%)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <div className="tools-head grid gap-6 lg:grid-cols-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent lg:col-span-4">
            03.B / Toolbox
          </p>
          <h3 id="tools-title" className="display text-[clamp(2.2rem,5vw,4.75rem)] lg:col-span-8">
            Tools &amp; Technologies
            <span className="block text-white/40">I Use Daily</span>
          </h3>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Index */}
          <ol className="tools-list border-t border-white/[0.08] lg:col-span-7">
            {tools.map((t, i) => {
              const on = i === active;
              return (
                <li key={t.name} className="tools-row border-b border-white/[0.08]">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="group relative grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-4 text-left md:grid-cols-[3rem_1fr_auto]"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-0 left-0 w-full origin-left bg-accent/[0.06] transition-transform duration-500 ${
                        on ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    <span
                      className={`relative font-mono text-xs tabular-nums transition-colors ${
                        on ? "text-accent" : "text-white/30"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="relative flex items-center gap-3">
                      <t.icon
                        size={17}
                        aria-hidden="true"
                        className={`shrink-0 transition-colors ${on ? "text-accent" : "text-white/35"}`}
                      />
                      <span
                        className={`font-display text-lg tracking-tight transition-all duration-300 md:text-xl ${
                          on ? "translate-x-1 text-white" : "text-white/70"
                        }`}
                      >
                        {t.name}
                      </span>
                    </span>
                    <span className="relative col-start-2 mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35 md:col-start-auto md:mt-0">
                      {t.category}
                    </span>
                    {/* Inline description on small screens */}
                    <span className="relative col-start-2 mt-2 text-sm text-white/50 lg:hidden">
                      {t.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Inspector */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="tools-inspector sticky top-28 overflow-hidden rounded-2xl border border-white/[0.1] bg-ink-900/80 shadow-[0_30px_80px_-30px_rgba(79,140,255,0.35)]">
              <div className="flex items-center gap-2 border-b border-white/[0.08] px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-xs text-white/40">toolbox — inspector</span>
              </div>
              <div className="relative min-h-[340px] p-8" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-mono text-xs text-white/40">
                      <span className="text-accent">$</span> toolbox --describe {pad(active + 1)}
                    </p>
                    <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
                      <tool.icon size={28} aria-hidden="true" />
                    </div>
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-accent/80">
                      {tool.category}
                    </p>
                    <p className="display mt-3 text-4xl">{tool.name}</p>
                    <p className="mt-5 text-[15px] leading-relaxed text-white/60">{tool.description}</p>
                    <p className="mt-8 font-mono text-xs text-white/30">
                      <span className="text-accent">✓</span> in daily use
                      <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-accent align-middle" />
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsIndex;
