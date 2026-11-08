import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Cloud, Database, Layout, Rocket, Server } from "lucide-react";
import { gsap, MQ } from "../../lib/gsap";
import { SplitWords } from "../fx/Split";
import { services } from "../../data/portfolio";

const layers = [
  {
    icon: Layout,
    layer: "Interface",
    title: "Frontend architecture",
    stack: ["React", "Next.js", "TypeScript", "Redux Toolkit", "TanStack Query"],
  },
  {
    icon: Server,
    layer: "Services",
    title: "Backend APIs",
    stack: ["Node.js", "Express.js", "REST APIs", "Microservices"],
  },
  {
    icon: Database,
    layer: "Data",
    title: "Database integration",
    stack: ["PostgreSQL", "MongoDB", "Azure Blob", "AWS S3"],
  },
  {
    icon: Cloud,
    layer: "Platform",
    title: "Cloud infrastructure",
    stack: ["Microsoft Azure", "AWS"],
  },
  {
    icon: Rocket,
    layer: "Delivery",
    title: "Deployment workflows",
    stack: ["Docker", "Kubernetes", "CI/CD", "SonarQube", "Veracode"],
  },
];

/**
 * Scene 6 — Technical capabilities.
 * A request travels through the stack: each layer lights up in turn and the
 * connectors draw between them, scrubbed to scroll while the scene is pinned.
 */
const Capabilities: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const nodes = gsap.utils.toArray<HTMLElement>(".cap-node");
        const links = gsap.utils.toArray<HTMLElement>(".cap-link");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.8,
          },
          defaults: { ease: "none" },
        });

        tl.from(".cap-head .split-word", { yPercent: 110, stagger: 0.05, duration: 0.6 });
        nodes.forEach((node, i) => {
          tl.fromTo(
            node,
            { opacity: 0.18 },
            {
              opacity: 1,
              duration: 0.6,
              onUpdate() {
                node.classList.toggle("is-on", this.progress() > 0.5);
              },
            },
            i === 0 ? ">-0.2" : ">-0.1",
          );
          tl.fromTo(
            node.querySelectorAll(".cap-chip"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, stagger: 0.05, duration: 0.3 },
            "<0.2",
          );
          if (links[i]) tl.fromTo(links[i], { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, ">-0.1");
        });
        tl.fromTo(".cap-pulse", { left: "0%" }, { left: "100%", duration: nodes.length * 0.8 }, 0.4);
        tl.to({}, { duration: 0.4 });
      });

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>(".cap-node").forEach((node) => {
          gsap.from(node, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              onEnter: () => node.classList.add("is-on"),
            },
          });
        });
        gsap.fromTo(
          ".cap-vline",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".cap-grid", start: "top 70%", end: "bottom 70%", scrub: true },
          },
        );
      });

      mm.add(MQ.reduced, () => {
        gsap.utils.toArray<HTMLElement>(".cap-node").forEach((n) => n.classList.add("is-on"));
      });

      mm.add(MQ.motion, () => {
        gsap.from(".svc-row", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".svc-list", start: "top 80%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={root}
      data-bg="#0d0b16"
      aria-labelledby="cap-title"
      className="relative"
    >
      <div ref={pinRef} className="relative flex flex-col justify-center overflow-hidden py-28 lg:h-screen lg:py-0">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/[0.07] blur-[140px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="eyebrow flex items-center gap-3 lg:col-span-4">
              <span className="text-accent">06</span>
              <span className="h-px w-8 bg-white/20" />
              Capabilities
            </p>
            <h2 id="cap-title" className="cap-head display text-[clamp(2.4rem,5.4vw,5.5rem)] lg:col-span-8">
              <SplitWords text="From interface" masked />
              <br />
              <span className="text-white/40">
                <SplitWords text="to infrastructure." masked />
              </span>
            </h2>
          </div>

          {/* Pipeline */}
          <div className="cap-grid relative mt-16 lg:mt-20">
            {/* Mobile vertical connector */}
            <div aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-white/10 lg:hidden">
              <div className="cap-vline h-full w-full origin-top bg-gradient-to-b from-accent to-accent-violet" />
            </div>
            {/* Desktop travelling pulse */}
            <div aria-hidden="true" className="absolute inset-x-[10%] top-[23px] hidden lg:block">
              <span className="cap-pulse absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_6px_rgba(79,140,255,0.6)]" />
            </div>

            <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-0">
              {layers.map((l, i) => (
                <li key={l.layer} className="cap-node group relative flex gap-5 lg:block lg:px-4">
                  {/* Connector to the next layer */}
                  {i < layers.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[calc(50%+28px)] right-[calc(-50%+28px)] top-[23px] hidden h-px bg-white/10 lg:block"
                    >
                      <span className="cap-link absolute inset-0 origin-left bg-gradient-to-r from-accent to-accent-violet" />
                    </span>
                  )}
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[var(--bg)] text-white/80 transition-all duration-500 group-[.is-on]:border-accent group-[.is-on]:text-accent group-[.is-on]:shadow-[0_0_30px_rgba(79,140,255,0.35)] lg:mx-auto">
                    <l.icon size={20} aria-hidden="true" />
                  </span>
                  <div className="lg:mt-8 lg:text-center">
                    <p className="font-display text-xs uppercase tracking-[0.3em] text-white/40">
                      0{i + 1} · {l.layer}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tight xl:text-2xl">
                      {l.title}
                    </h3>
                    <ul className="mt-5 flex flex-wrap gap-2 lg:justify-center">
                      {l.stack.map((s) => (
                        <li
                          key={s}
                          className="cap-chip rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="relative mx-auto max-w-[1440px] px-4 pb-28 pt-8 sm:px-6 md:px-10 md:pb-40 lg:pt-28">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Services</p>
            <h3 className="display mt-6 text-[clamp(2rem,3.6vw,3.4rem)]">
              End-to-end delivery, from idea to production
            </h3>
          </div>
          <p className="text-lg leading-relaxed text-white/60 lg:col-span-6 lg:col-start-7 lg:pt-12">
            I take websites and software products through the full lifecycle — design, build, ship,
            and run — so you get one accountable partner instead of piecing it together across
            vendors.
          </p>
        </div>

        <ul className="svc-list mt-16 border-t border-white/[0.08]">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="svc-row group relative grid cursor-default gap-3 overflow-hidden border-b border-white/[0.08] py-8 md:grid-cols-12 md:items-center md:gap-8"
            >
              <motion.span
                aria-hidden="true"
                variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-bottom bg-white/[0.03]"
              />
              <span className="relative font-display text-sm tabular-nums text-white/35 md:col-span-1">
                0{i + 1}
              </span>
              <motion.h4
                variants={{ rest: { x: 0 }, hover: { x: 12 } }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center gap-4 font-display text-2xl font-semibold tracking-tight md:col-span-4 md:text-3xl"
              >
                <s.icon size={22} className="text-accent" aria-hidden="true" />
                {s.title}
              </motion.h4>
              <p className="relative text-[15px] leading-relaxed text-white/60 md:col-span-7">
                {s.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Capabilities;
