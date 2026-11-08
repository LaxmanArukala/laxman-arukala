import React, { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { gsap, MQ } from "../../lib/gsap";
import { projects } from "../../data/portfolio";
import ProjectPreview from "./ProjectPreview";

const pad = (n: number) => String(n).padStart(2, "0");

/** Where each card sticks (desktop); later cards sit slightly lower so the stack peeks. */
const STICK_VH = 9;
const STACK_STEP_PX = 16;

/**
 * Scene 5 — Featured projects as a stack of case-study cards.
 * Desktop: each card sticks near the top and the next one slides over it,
 * while the one underneath shrinks and dims. Mobile: a simple vertical list.
 */
const Projects: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.from(".proj-head > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".proj-head", start: "top 80%" },
        });

        gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card) => {
          gsap.from(card.querySelectorAll(".proj-reveal"), {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 70%" },
          });
          const grow = card.querySelectorAll(".sk-grow");
          if (grow.length) {
            gsap.from(grow, {
              scaleY: 0,
              duration: 1,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 60%" },
            });
          }
          const rows = card.querySelectorAll(".sk-row");
          if (rows.length) {
            gsap.from(rows, {
              x: -20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 60%" },
            });
          }
        });
      });

      mm.add(MQ.desktop, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".proj-card");
        // Cards are sticky, so measure from the (non-sticky) list using each
        // card's natural offset: one card height + gap per step.
        const step = () => {
          const first = cards[0];
          const gap = parseFloat(getComputedStyle(first).marginBottom) || 0;
          return first.offsetHeight + gap;
        };

        cards.forEach((card, i) => {
          // Preview rises into place as the card arrives
          gsap.fromTo(
            card.querySelector(".proj-mock"),
            { y: 70 },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: list.current,
                start: () => `top+=${i * step()} bottom`,
                end: () => `top+=${i * step()} 30%`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );

          if (i === cards.length - 1) return;
          // The card underneath recedes while the next one slides over it
          const stuck = () => `top+=${(i + 1) * step()} ${STICK_VH}%`;
          const enter = () => `top+=${(i + 1) * step()} bottom`;
          gsap.to(card.querySelector(".proj-inner"), {
            scale: 0.9,
            ease: "none",
            scrollTrigger: { trigger: list.current, start: enter, end: stuck, scrub: true, invalidateOnRefresh: true },
          });
          gsap.to(card.querySelector(".proj-dim"), {
            opacity: 0.7,
            ease: "none",
            scrollTrigger: { trigger: list.current, start: enter, end: stuck, scrub: true, invalidateOnRefresh: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={root}
      data-bg="#07070a"
      aria-labelledby="projects-title"
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="proj-head grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">05</span>
              <span className="h-px w-8 bg-white/20" />
              Selected work
            </p>
            <h2 id="projects-title" className="display mt-8 text-[clamp(3rem,7vw,7rem)]">
              Featured <span className="text-white/40">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 lg:col-span-4 lg:col-start-9">
            {projects.length} products across healthcare, AI, quality tooling, AR and events — built
            end to end.
          </p>
        </div>

        {/* Card stack */}
        <ol ref={list} className="mt-16 space-y-10 md:mt-24 lg:space-y-0">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className="proj-card lg:sticky lg:mb-[12vh] lg:last:mb-0"
              style={{ top: `calc(${STICK_VH}vh + ${i * STACK_STEP_PX}px)` }}
            >
              <article
                aria-labelledby={`proj-${i}`}
                className="proj-inner relative origin-top overflow-hidden rounded-[28px] border border-white/10 lg:h-[78vh] lg:min-h-[540px] lg:max-h-[780px]"
                style={{
                  background: `radial-gradient(70% 90% at 85% 50%, ${p.accent}26, transparent 65%), linear-gradient(180deg, #0e1018, #0a0b10)`,
                }}
              >
                <div className="grid h-full gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-6 lg:p-10 xl:p-12">
                  {/* Details */}
                  <div className="flex flex-col justify-between gap-8 lg:col-span-5">
                    <div>
                      <div className="proj-reveal flex items-center gap-4">
                        <span className="font-display text-sm tabular-nums text-white/40">
                          {pad(i + 1)} / {pad(projects.length)}
                        </span>
                        <span
                          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
                          style={{ borderColor: `${p.accent}55`, color: p.accent }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                          {p.domain}
                        </span>
                      </div>
                      <h3
                        id={`proj-${i}`}
                        className="proj-reveal display mt-6 text-[clamp(2rem,3.1vw,3.4rem)] leading-[0.95]"
                      >
                        {p.title}
                      </h3>
                      <p className="proj-reveal mt-6 text-[15px] leading-relaxed text-white/60">{p.description}</p>
                    </div>

                    <div className="proj-reveal">
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                        Stack · {p.technologies.length}
                      </p>
                      <ul className="flex flex-wrap gap-1.5" aria-label="Technology stack">
                        {p.technologies.map((t) => (
                          <li
                            key={t}
                            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[11px] text-white/70"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-accent"
                        >
                          <Github size={16} />
                          Source Code
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="proj-mock flex items-center lg:col-span-7 lg:pl-4">
                    <ProjectPreview project={p} />
                  </div>
                </div>

                {/* Dims as the next card covers it */}
                <div aria-hidden="true" className="proj-dim pointer-events-none absolute inset-0 bg-black opacity-0" />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Projects;
