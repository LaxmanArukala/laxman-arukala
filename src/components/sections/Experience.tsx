import React, { useLayoutEffect, useRef, useState } from "react";
import { GraduationCap, Minus, Plus } from "lucide-react";
import { education, experiences, type Experience as Job } from "../../data/portfolio";

const VISIBLE_POINTS = 4;
/** The line's tip follows this height in the viewport (0 = top, 1 = bottom). */
const DRAW_LINE = 0.6;
const pad = (n: number) => String(n).padStart(2, "0");

/** Hidden until the block scrolls in; always visible with reduced motion. */
const reveal =
  "translate-y-6 opacity-0 transition-[opacity,transform] duration-700 ease-out group-[.is-seen]:translate-y-0 group-[.is-seen]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

/**
 * Builds the career line. On desktop it leaves each node sideways, sweeps out
 * to the page edge beside the next role (never across its text) and returns
 * into the next node. On mobile it is a straight rail.
 * `prefixes[i]` is the path up to node i, used to measure its distance.
 */
function buildPath(points: { x: number; y: number }[], width: number, desktop: boolean) {
  if (!points.length) return { d: "", prefixes: [] as string[] };
  const first = points[0];
  const last = points[points.length - 1];

  if (!desktop) {
    const start = `M ${first.x} ${first.y - 8}`;
    return {
      d: `${start} L ${first.x} ${last.y + 120}`,
      prefixes: points.map((p) => `${start} L ${first.x} ${p.y}`),
    };
  }

  let d = `M ${first.x - 40} ${first.y} L ${first.x} ${first.y}`;
  const prefixes = [d];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const edge = i % 2 === 0 ? width * 0.985 : width * 0.015;
    const mid = (a.y + b.y) / 2;
    d +=
      ` C ${a.x + (edge - a.x) * 0.72} ${a.y}, ${edge} ${a.y + (mid - a.y) * 0.3}, ${edge} ${mid}` +
      ` C ${edge} ${mid + (b.y - mid) * 0.7}, ${b.x + (edge - b.x) * 0.72} ${b.y}, ${b.x} ${b.y}`;
    prefixes.push(d);
  }
  const dir = (points.length - 1) % 2 === 0 ? 1 : -1;
  d += ` C ${last.x + dir * width * 0.12} ${last.y}, ${last.x + dir * width * 0.22} ${last.y + 30}, ${
    last.x + dir * width * 0.3
  } ${last.y + 70}`;
  return { d, prefixes };
}

const JobBlock: React.FC<{ exp: Job; index: number }> = ({ exp, index }) => {
  const [open, setOpen] = useState(false);
  const extra = exp.responsibilities.length - VISIBLE_POINTS;
  const shown = open ? exp.responsibilities : exp.responsibilities.slice(0, VISIBLE_POINTS);

  return (
    <div className={`relative p-1 lg:p-6 ${reveal}`}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/80">
        {pad(index + 1)} / {pad(experiences.length)} — {exp.shortName}
      </p>
      <p className="mt-4 font-display text-2xl font-semibold tabular-nums tracking-tight md:text-[1.75rem]">
        {exp.duration}
      </p>
      <h3 className="mt-3 text-lg font-medium">{exp.title}</h3>
      <p className="mt-1 text-fg/85">{exp.company}</p>

      <ul className="mt-6 space-y-3">
        {shown.map((r) => (
          <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-fg/90">
            <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-fg/70" />
            {r}
          </li>
        ))}
      </ul>

      {extra > 0 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] hover:underline"
        >
          {open ? <Minus size={13} /> : <Plus size={13} />}
          {open ? "Show less" : `Show all ${exp.responsibilities.length} responsibilities`}
        </button>
      )}
    </div>
  );
};

const Experience: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const basePath = useRef<SVGPathElement>(null);
  const drawPath = useRef<SVGPathElement>(null);
  const tip = useRef<SVGCircleElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useLayoutEffect(() => {
    const el = wrap.current;
    const base = basePath.current;
    const line = drawPath.current;
    const head = tip.current;
    if (!el || !base || !line || !head) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let nodeYs: number[] = [];
    let nodeLens: number[] = [];
    let total = 0;
    let height = 0;

    const paint = () => {
      const top = el.getBoundingClientRect().top;
      const y = reduced ? height : Math.min(height, Math.max(0, window.innerHeight * DRAW_LINE - top));
      const ys = [0, ...nodeYs, height];
      const lens = [0, ...nodeLens, total];
      let len = total;
      for (let i = 0; i < ys.length - 1; i++) {
        if (y <= ys[i + 1]) {
          const t = (y - ys[i]) / Math.max(1, ys[i + 1] - ys[i]);
          len = lens[i] + (lens[i + 1] - lens[i]) * t;
          break;
        }
      }

      line.style.strokeDasharray = `${total}`;
      line.style.strokeDashoffset = `${total - len}`;
      line.style.visibility = len > 0 ? "visible" : "hidden";

      const moving = len > 1 && len < total - 1 && !reduced;
      head.style.visibility = moving ? "visible" : "hidden";
      if (moving) {
        const p = line.getPointAtLength(len);
        head.setAttribute("cx", `${p.x}`);
        head.setAttribute("cy", `${p.y}`);
      }
      nodeLens.forEach((l, i) => items.current[i]?.classList.toggle("is-active", len >= l - 1));
    };

    const measure = () => {
      const box = el.getBoundingClientRect();
      const points = nodes.current.flatMap((n) => {
        if (!n) return [];
        const r = n.getBoundingClientRect();
        return [{ x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }];
      });
      const { d, prefixes } = buildPath(points, box.width, window.innerWidth >= 1024);

      nodeLens = prefixes.map((prefix) => {
        line.setAttribute("d", prefix);
        return line.getTotalLength();
      });
      base.setAttribute("d", d);
      line.setAttribute("d", d);
      total = d ? line.getTotalLength() : 0;
      nodeYs = points.map((p) => p.y);
      height = box.height;
      paint();
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Fade each block in the first time it arrives.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-seen");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    root.current?.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const eduTimeline = [...education].reverse();

  return (
    <section id="experience" ref={root} aria-labelledby="experience-title">
      {/* A — Professional experience */}
      <div className="tone-green overflow-hidden py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Career</p>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-fg/80">Professional Experience</p>
            </div>
            <h2 id="experience-title" className="display text-[clamp(2.6rem,6.5vw,6.5rem)] lg:col-span-8">
              My Experience
              <span className="mt-4 block text-[0.42em] leading-tight tracking-[-0.02em] text-fg/80">
                Seven years across four companies.
              </span>
            </h2>
          </div>

          <div ref={wrap} className="relative mt-20 md:mt-28">
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <path ref={basePath} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
              <path ref={drawPath} fill="none" stroke="currentColor" strokeWidth="2.5" />
              <circle ref={tip} r="5" fill="currentColor" style={{ visibility: "hidden" }} />
            </svg>

            <ol className="relative">
              {experiences.map((exp, i) => {
                const left = i % 2 === 0;
                return (
                  <li
                    key={exp.company}
                    ref={(el) => (items.current[i] = el)}
                    data-reveal
                    className={`group relative flex flex-col pb-20 pl-10 last:pb-24 lg:pb-40 lg:pl-0 lg:last:pb-32 ${
                      left ? "lg:items-start" : "lg:items-end"
                    }`}
                  >
                    <div className={`w-full lg:w-[44%] ${left ? "lg:ml-[8%]" : "lg:mr-[8%]"}`}>
                      <JobBlock exp={exp} index={i} />
                    </div>

                    {/* Stem + dot: under the block on desktop, on the rail on mobile */}
                    <div
                      className={`absolute left-0 top-2 lg:static lg:mt-2 lg:flex lg:w-[14px] lg:flex-col lg:items-center ${
                        left ? "lg:ml-[calc(8%+28px)]" : "lg:mr-[calc(8%+28px)]"
                      }`}
                    >
                      <span aria-hidden="true" className="hidden h-12 w-px bg-fg/60 lg:block" />
                      <span
                        ref={(el) => (nodes.current[i] = el)}
                        aria-hidden="true"
                        className="relative block h-[14px] w-[14px] rounded-full border-2 border-fg/50 bg-surface transition-[background-color,border-color,box-shadow] duration-500 group-[.is-active]:border-fg group-[.is-active]:bg-fg group-[.is-active]:shadow-[0_0_0_5px_rgb(var(--fg)/0.2)] motion-reduce:transition-none"
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* B — Academic background */}
      <div className="tone-cream py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-fg/80 lg:col-span-4">Education</p>
            <h3 className="display text-[clamp(2.2rem,5vw,4.75rem)] lg:col-span-8">
              Academic <span className="text-fg/70">Background</span>
            </h3>
          </div>

          <div className="relative mt-16 md:mt-24">
            <div
              aria-hidden="true"
              className="absolute left-[7px] top-0 h-full w-px bg-fg md:left-0 md:top-[7px] md:h-px md:w-full"
            />
            <ol className="relative grid gap-14 pl-10 md:grid-cols-2 md:gap-10 md:pl-0">
              {eduTimeline.map((edu) => {
                const [from, to] = edu.year.split("-").map((s) => s.trim());
                return (
                  <li key={edu.degree} data-reveal className="group relative md:pt-14">
                    <span
                      aria-hidden="true"
                      className="absolute -left-10 top-1 h-[14px] w-[14px] rounded-full bg-fg md:left-0 md:top-0"
                    />
                    <div className={reveal}>
                      <p className="font-serif text-[clamp(2.6rem,5vw,4.5rem)] font-black leading-none tracking-tight">
                        {from}
                        <span className="mx-3 text-fg/40">—</span>
                        <span className="text-fg/70">{to}</span>
                      </p>
                      <div className="mt-6 flex items-start gap-4">
                        <GraduationCap size={20} className="mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <h4 className="font-display text-xl font-semibold md:text-2xl">{edu.degree}</h4>
                          <p className="mt-1 text-fg/85">{edu.institution}</p>
                          {edu.grade && (
                            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-fg/40 px-3 py-1 font-mono text-xs">
                              Grade <span className="font-semibold">{edu.grade}</span>
                            </p>
                          )}
                        </div>
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
