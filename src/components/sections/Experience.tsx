import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Minus, Plus } from "lucide-react";
import { gsap, MQ, ScrollTrigger } from "../../lib/gsap";
import { SplitWords } from "../fx/Split";
import { education, experiences, type Experience as Job } from "../../data/portfolio";

const VISIBLE_POINTS = 4;
const pad = (n: number) => String(n).padStart(2, "0");

interface PathData {
  d: string;
  /** Path length at each node, and node y positions (same order). */
  nodeLens: number[];
  nodeYs: number[];
  total: number;
  height: number;
}

/**
 * Builds the serpentine path. On desktop the line leaves each node
 * horizontally, sweeps out to the page edge beside the next role (never across
 * its text) and comes back into the next node. On mobile it is a straight rail.
 */
function buildPath(points: { x: number; y: number }[], width: number, desktop: boolean) {
  if (!points.length) return { segments: [] as string[], start: "", tail: "" };
  const first = points[0];
  if (!desktop) {
    const x = first.x;
    return {
      start: `M ${x} ${first.y - 8}`,
      segments: points.slice(1).map((p) => `L ${x} ${p.y}`),
      tail: `L ${x} ${points[points.length - 1].y + 120}`,
    };
  }

  const segments: string[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const toRight = i % 2 === 0;
    const xA = toRight ? width * 0.985 : width * 0.015;
    const ym = (a.y + b.y) / 2;
    segments.push(
      `C ${a.x + (xA - a.x) * 0.72} ${a.y}, ${xA} ${a.y + (ym - a.y) * 0.3}, ${xA} ${ym}` +
        ` C ${xA} ${ym + (b.y - ym) * 0.7}, ${b.x + (xA - b.x) * 0.72} ${b.y}, ${b.x} ${b.y}`,
    );
  }
  const last = points[points.length - 1];
  const dir = (points.length - 1) % 2 === 0 ? 1 : -1;
  const tail = `C ${last.x + dir * width * 0.12} ${last.y}, ${last.x + dir * width * 0.22} ${last.y + 30}, ${
    last.x + dir * width * 0.3
  } ${last.y + 70}`;
  // The first sweep always heads right, so the lead-in comes from the left.
  return { start: `M ${first.x - 40} ${first.y} L ${first.x} ${first.y}`, segments, tail };
}

const JobBlock: React.FC<{ exp: Job; index: number; onToggle: () => void }> = ({ exp, index, onToggle }) => {
  const [open, setOpen] = useState(false);
  const extra = exp.responsibilities.length - VISIBLE_POINTS;
  const shown = open ? exp.responsibilities : exp.responsibilities.slice(0, VISIBLE_POINTS);

  return (
    <div className="exp-card relative rounded-2xl bg-[radial-gradient(120%_100%_at_0%_0%,rgba(255,255,255,0.035),transparent_60%)] p-1 lg:p-6">
      <p className="exp-reveal font-mono text-xs uppercase tracking-[0.2em] text-white/40">
        {pad(index + 1)} / {pad(experiences.length)} — {exp.shortName}
      </p>
      <p className="exp-reveal mt-4 font-display text-2xl font-semibold tabular-nums tracking-tight text-white md:text-[1.75rem]">
        {exp.duration}
      </p>
      <h4 className="exp-reveal mt-3 text-lg font-medium text-white/90">{exp.title}</h4>
      <p className="exp-reveal mt-1 text-accent-soft">{exp.company}</p>

      <ul className="exp-points mt-6 space-y-3">
        <AnimatePresence initial={false}>
          {shown.map((r, i) => (
            <motion.li
              key={r}
              initial={i >= VISIBLE_POINTS ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={onToggle}
              className="exp-point flex gap-3 overflow-hidden text-[15px] leading-relaxed text-white/60"
            >
              <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-accent/70" />
              {r}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {extra > 0 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="exp-reveal mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-white"
        >
          {open ? <Minus size={13} /> : <Plus size={13} />}
          {open ? "Show less" : `Show all ${exp.responsibilities.length} responsibilities`}
        </button>
      )}
    </div>
  );
};

/**
 * Scene 4 — Experience.
 * A. Professional experience on a glowing serpentine line drawn by scroll.
 * B. Academic background on a horizontal timeline.
 */
const Experience: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const drawPath = useRef<SVGPathElement>(null);
  const measurePath = useRef<SVGPathElement>(null);
  const head = useRef<SVGCircleElement>(null);
  const data = useRef<PathData>({ d: "", nodeLens: [], nodeYs: [], total: 0, height: 0 });
  const [d, setD] = useState("");

  /** Measure node positions and rebuild the line. */
  const measure = useCallback(() => {
    const w = wrap.current;
    const mp = measurePath.current;
    if (!w || !mp) return;
    const box = w.getBoundingClientRect();
    const pts = nodes.current.map((n) => {
      const r = n!.getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
    });
    const desktop = window.innerWidth >= 1024;
    const { start, segments, tail } = buildPath(pts, box.width, desktop);

    // Cumulative length at each node
    const nodeLens: number[] = [];
    let partial = start;
    mp.setAttribute("d", partial);
    nodeLens.push(mp.getTotalLength());
    segments.forEach((s) => {
      partial += " " + s;
      mp.setAttribute("d", partial);
      nodeLens.push(mp.getTotalLength());
    });
    const full = `${partial} ${tail ?? ""}`;
    mp.setAttribute("d", full);
    const total = mp.getTotalLength();

    data.current = { d: full, nodeLens, nodeYs: pts.map((p) => p.y), total, height: box.height };
    drawPath.current?.setAttribute("d", full);
    setD(full);
  }, []);

  /** Draw the line up to `len` and light the nodes it has passed. */
  const paint = useCallback((len: number) => {
    const { total, nodeLens } = data.current;
    const p = drawPath.current;
    if (!p || !total) return;
    p.style.strokeDasharray = `${total}`;
    p.style.strokeDashoffset = `${Math.max(0, total - len)}`;
    if (head.current) {
      const pt = p.getPointAtLength(Math.min(len, total));
      head.current.setAttribute("cx", `${pt.x}`);
      head.current.setAttribute("cy", `${pt.y}`);
      head.current.style.opacity = len > 2 && len < total - 2 ? "1" : "0";
    }
    nodeLens.forEach((l, i) => items.current[i]?.classList.toggle("is-active", len >= l - 1));
  }, []);

  // Keep the path in sync with layout (resize, fonts, expanded lists)
  useLayoutEffect(() => {
    measure();
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        measure();
        ScrollTrigger.refresh();
      });
    });
    if (wrap.current) ro.observe(wrap.current);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [measure]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.from(".exp-head .split-word", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: ".exp-head", start: "top 85%" },
        });

        // Map the viewport's 60% line onto the path: the head reaches each
        // node exactly as that node crosses the line.
        const apply = (progress: number) => {
          const { nodeYs, nodeLens, total, height } = data.current;
          const y = progress * height;
          const ys = [0, ...nodeYs, height];
          const ls = [0, ...nodeLens, total];
          let len = total;
          for (let i = 0; i < ys.length - 1; i++) {
            if (y <= ys[i + 1]) {
              const t = (y - ys[i]) / Math.max(1, ys[i + 1] - ys[i]);
              len = ls[i] + (ls[i + 1] - ls[i]) * Math.min(1, Math.max(0, t));
              break;
            }
          }
          paint(len);
        };
        ScrollTrigger.create({
          trigger: wrap.current,
          start: "top 60%",
          end: "bottom 60%",
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });
        paint(0);

        gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
          gsap.from(row.querySelectorAll(".exp-reveal, .exp-points"), {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          });
        });

        gsap.from(".edu-head > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".edu", start: "top 75%" },
        });
        gsap.fromTo(
          ".edu-line",
          { scaleX: 0, scaleY: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".edu-track", start: "top 80%", end: "bottom 55%", scrub: true },
          },
        );
        gsap.from(".edu-item", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".edu-track", start: "top 75%" },
        });
      });

      mm.add(MQ.reduced, () => {
        paint(Number.MAX_SAFE_INTEGER);
      });
    }, root);
    return () => ctx.revert();
  }, [paint]);

  // Chronological for the academic timeline
  const eduTimeline = [...education].reverse();

  return (
    <section
      id="experience"
      ref={root}
      data-bg="#050507"
      aria-labelledby="experience-title"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">04</span>
              <span className="h-px w-8 bg-white/20" />
              Career
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              04.A / Professional Experience
            </p>
          </div>
          <h2
            id="experience-title"
            className="exp-head display text-[clamp(2.6rem,6.5vw,6.5rem)] lg:col-span-8"
          >
            <SplitWords text="My Experience" masked />
            <span className="mt-4 block text-[0.42em] leading-tight tracking-[-0.02em] text-white/40">
              <SplitWords text="Seven years across four companies." masked />
            </span>
          </h2>
        </div>

        {/* A — Serpentine career line */}
        <div ref={wrap} className="relative mt-20 md:mt-28">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <filter id="exp-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
            <path
              ref={drawPath}
              d={d}
              fill="none"
              stroke="#f4f6ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#exp-glow)"
            />
            <circle ref={head} r="5" fill="#fff" filter="url(#exp-glow)" style={{ opacity: 0 }} />
            <path ref={measurePath} fill="none" stroke="none" visibility="hidden" />
          </svg>

          <ol className="relative">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={exp.company}
                  ref={(el) => (items.current[i] = el)}
                  className={`exp-row group relative flex flex-col pb-20 pl-10 last:pb-24 lg:pl-0 lg:pb-40 lg:last:pb-32 ${
                    left ? "lg:items-start" : "lg:items-end"
                  }`}
                >
                  <div className={`w-full lg:w-[44%] ${left ? "lg:ml-[8%]" : "lg:mr-[8%]"}`}>
                    <JobBlock exp={exp} index={i} onToggle={measure} />
                  </div>

                  {/* Stick + node (desktop: under the block; mobile: on the rail) */}
                  <div
                    className={`absolute left-0 top-2 lg:static lg:mt-2 lg:flex lg:w-[14px] lg:flex-col lg:items-center ${
                      left ? "lg:ml-[calc(8%+28px)]" : "lg:mr-[calc(8%+28px)]"
                    }`}
                  >
                    <span aria-hidden="true" className="hidden h-12 w-px bg-white/25 lg:block" />
                    <span
                      ref={(el) => (nodes.current[i] = el)}
                      aria-hidden="true"
                      className="relative block h-[14px] w-[14px] rounded-full border border-white/40 bg-[var(--bg)] transition-all duration-500 group-[.is-active]:border-white group-[.is-active]:bg-white group-[.is-active]:shadow-[0_0_18px_4px_rgba(255,255,255,0.45)]"
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* B — Academic background */}
        <div className="edu relative mt-16 border-t border-white/[0.08] pt-24 md:mt-24 md:pt-32">
          <div className="edu-head grid gap-6 lg:grid-cols-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent lg:col-span-4">
              04.B / Education
            </p>
            <h3 className="display text-[clamp(2.2rem,5vw,4.75rem)] lg:col-span-8">
              Academic <span className="text-white/40">Background</span>
            </h3>
          </div>

          <div className="edu-track relative mt-16 md:mt-24">
            {/* Horizontal line (desktop) / vertical (mobile) */}
            <div aria-hidden="true" className="absolute left-[7px] top-0 h-full w-px bg-white/10 md:left-0 md:top-[7px] md:h-px md:w-full">
              <div className="edu-line h-full w-full origin-top bg-gradient-to-b from-accent to-accent-violet md:origin-left md:bg-gradient-to-r" />
            </div>

            <ol className="relative grid gap-14 pl-10 md:grid-cols-2 md:gap-10 md:pl-0">
              {eduTimeline.map((edu) => {
                const [from, to] = edu.year.split("-").map((s) => s.trim());
                return (
                  <li key={edu.degree} className="edu-item relative md:pt-14">
                    <span
                      aria-hidden="true"
                      className="absolute -left-10 top-1 h-[14px] w-[14px] rounded-full border border-accent bg-[var(--bg)] shadow-[0_0_0_6px_rgba(79,140,255,0.12)] md:left-0 md:top-0"
                    />
                    <p className="font-serif text-[clamp(2.6rem,5vw,4.5rem)] font-black leading-none tracking-tight text-white">
                      {from}
                      <span className="mx-3 text-white/25">—</span>
                      <span className="text-white/50">{to}</span>
                    </p>
                    <div className="mt-6 flex items-start gap-4">
                      <GraduationCap size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                      <div>
                        <h4 className="font-display text-xl font-semibold md:text-2xl">{edu.degree}</h4>
                        <p className="mt-1 text-white/55">{edu.institution}</p>
                        {edu.grade && (
                          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-3 py-1 font-mono text-xs text-white/70">
                            Grade <span className="text-white">{edu.grade}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
