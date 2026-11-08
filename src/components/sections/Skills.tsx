import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, MQ } from "../../lib/gsap";
import { skillGroups } from "../../data/portfolio";
import ToolsIndex from "./ToolsIndex";

const floatingLabels = [
  "React",
  "Node.js",
  "TypeScript",
  "Azure",
  "PostgreSQL",
  "Docker",
  "REST",
  "AWS",
  "Redux",
  "Next.js",
];

/**
 * Scene 3 — Technical expertise.
 * Desktop: the scene pins and the skill groups travel horizontally, with
 * floating labels drifting at a different speed for depth.
 * Mobile: groups stack vertically with simple reveals.
 */
const Skills: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".skills-float", {
          x: (i) => (i % 2 ? -1 : -0.5) * window.innerWidth * 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".skills-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".skills-chip"), {
            y: 50,
            opacity: 0,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: travel,
              start: "left 85%",
              end: "left 35%",
              scrub: true,
            },
          });
          // Some categories have no proficiency bars — skip them.
          const meters = panel.querySelectorAll(".skills-meter");
          if (meters.length) {
            gsap.from(meters, {
              scaleX: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: travel,
                start: "left 70%",
                end: "left 20%",
                scrub: true,
              },
            });
          }
          gsap.from(panel.querySelector(".skills-index"), {
            yPercent: 60,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: travel,
              start: "left right",
              end: "left 40%",
              scrub: true,
            },
          });
        });

        gsap.to(".skills-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>(".skills-panel").forEach((panel) => {
          gsap.from(panel.querySelectorAll(".skills-chip"), {
            y: 24,
            opacity: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 80%" },
          });
        });
      });

      mm.add(MQ.motion, () => {
        gsap.from(".skills-intro > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={root}
      data-bg="#07070a"
      aria-labelledby="skills-title"
      className="relative"
    >
      <div ref={pinRef} className="relative overflow-hidden lg:h-screen">
        {/* Floating labels (decorative) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
          {floatingLabels.map((label, i) => (
            <span
              key={label}
              className="skills-float absolute whitespace-nowrap font-display font-semibold tracking-tight text-white/[0.022]"
              style={{
                left: `${20 + i * 22}%`,
                top: `${8 + ((i * 37) % 80)}%`,
                fontSize: `${3 + (i % 3) * 2.5}rem`,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div
          ref={trackRef}
          className="relative flex flex-col gap-6 px-4 py-28 sm:px-6 md:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:py-0 lg:pl-10 lg:pr-[12vw]"
        >
          {/* Intro panel */}
          <div className="skills-intro flex shrink-0 flex-col justify-center lg:w-[36vw] lg:pr-10">
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">03</span>
              <span className="h-px w-8 bg-white/20" />
              Technical expertise
            </p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              03.A / Technical Expertise
            </p>
            <h2 id="skills-title" className="display mt-5 text-[clamp(2.4rem,4.8vw,5.25rem)]">
              <span className="sr-only">Technical Expertise — </span>
              Frontend.
              <br />
              <span className="text-white/40">Backend.</span>
              <br />
              <span className="text-white/60">Database.</span>
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-violet bg-clip-text text-transparent">
                Cloud.
              </span>
            </h2>
            <p className="mt-8 max-w-md text-white/60">
              The stack I use to take products end to end — from the first component to the last
              deployment.
            </p>
            <p className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/35 lg:flex">
              Keep scrolling <span className="h-px w-12 bg-white/25" />
            </p>
          </div>

          {skillGroups.map((group, gi) => {
            const wide = group.skills.length > 8;
            return (
            <article
              key={group.id}
              aria-labelledby={`skills-${group.id}`}
              className={`skills-panel relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 lg:max-h-[84vh] lg:min-h-[54vh] lg:p-10 xl:p-12 ${
                wide ? "lg:w-[min(84vw,1180px)]" : "lg:w-[min(64vw,880px)]"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 text-accent">
                    <group.icon size={20} aria-hidden="true" />
                    <span className="eyebrow text-accent/80">Category {gi + 1}</span>
                  </div>
                  <h3
                    id={`skills-${group.id}`}
                    className="display mt-5 text-[clamp(2.2rem,4.4vw,4.75rem)]"
                  >
                    {group.name}
                  </h3>
                  <p className="mt-4 max-w-md text-white/55">{group.summary}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="skills-index text-outline display hidden text-[8rem] sm:block lg:text-[10rem]"
                >
                  0{gi + 1}
                </span>
              </div>

              <ul
                className={`mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 ${
                  wide ? "lg:grid-cols-4" : "lg:grid-cols-3"
                }`}
              >
                {group.skills.map((s) => (
                  <motion.li
                    key={s.name}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="skills-chip group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-950/60 px-4 py-3.5 transition-colors hover:border-accent/50"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/0 to-accent-violet/0 transition-colors duration-500 group-hover:from-accent/10 group-hover:to-accent-violet/10" />
                    <div className="relative flex items-center justify-between gap-3">
                      <span className="text-[15px] font-medium text-white/90">{s.name}</span>
                      {s.level !== undefined && (
                        <span className="text-xs tabular-nums text-white/40">{s.level}%</span>
                      )}
                    </div>
                    {s.level !== undefined && (
                      <div
                        className="relative mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/[0.08]"
                        role="meter"
                        aria-label={`${s.name} proficiency`}
                        aria-valuenow={s.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="skills-meter h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-violet"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </article>
            );
          })}
        </div>

        {/* Horizontal progress */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-10 right-10 hidden h-px bg-white/10 lg:block"
        >
          <div className="skills-progress h-full origin-left scale-x-0 bg-white/60" />
        </div>
      </div>

      {/* Part B — Tools & Technologies I Use Daily */}
      <ToolsIndex />
    </section>
  );
};

export default Skills;
