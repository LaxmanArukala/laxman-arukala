import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { gsap, MQ } from "../../lib/gsap";
import { SplitChars } from "../fx/Split";
import { profile, resumeUrl } from "../../data/portfolio";
import { scrollToHash } from "../../hooks/useSmoothScroll";

// three.js ships in its own chunk so the first paint isn't waiting on it.
const TechCore = lazy(() => import("../three/TechCore"));

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/_:.";

/** Decodes text in place, terminal-style. */
function scramble(el: HTMLElement, duration = 0.9, delay = 0) {
  const final = el.dataset.text ?? el.textContent ?? "";
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration,
    delay,
    ease: "none",
    onStart: () => el.style.removeProperty("visibility"),
    onUpdate: () => {
      const n = Math.floor(state.p * final.length);
      let out = final.slice(0, n);
      for (let i = n; i < final.length; i++) {
        out += final[i] === " " ? " " : SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}

/**
 * Scene 1 — Typographic opening, styled as a case-file HUD.
 * No photograph here: oversized serif name, an animated grid and an abstract
 * wireframe core. On desktop the scene pins and the camera "zooms through"
 * the name into About.
 */
const Hero: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    setShow3d(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        const scrambles = gsap.utils.toArray<HTMLElement>("[data-scramble]");
        scrambles.forEach((el) => {
          el.dataset.text = el.textContent ?? "";
          el.style.visibility = "hidden";
        });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-grid", { opacity: 0, duration: 1.6, ease: "power2.out" })
          .from(".hero-scan", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, 0.1)
          .from(".hero-frame", { opacity: 0, scale: 0.96, duration: 1.4 }, 0.35)
          .from(".hero-core", { opacity: 0, scale: 0.85, duration: 2.2, ease: "power2.out" }, 0.5)
          .from(".hero-first .split-char", { yPercent: 120, duration: 1.2, stagger: 0.05 }, 0.8)
          .from(".hero-last .split-char", { yPercent: 120, duration: 1.2, stagger: 0.05 }, 0.95)
          .fromTo(
            ".hero-badge",
            { clipPath: "inset(0% 50% 0% 50%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" },
            1.45,
          )
          .to(".hero-badge", { opacity: 0.35, duration: 0.06, repeat: 3, yoyo: true, ease: "none" }, 2.3)
          .from(".hero-sub > *", { y: 16, opacity: 0, duration: 0.9, stagger: 0.08 }, 1.7)
          .from(".hero-hud > *", { opacity: 0, y: 8, duration: 0.6, stagger: 0.08, ease: "power2.out" }, 1.2)
          .from(".hero-barcode span", { scaleY: 0, duration: 0.6, stagger: 0.01, ease: "power2.out" }, 1.5);

        scrambles.forEach((el, i) => tl.add(scramble(el, 0.8), 1.3 + i * 0.08));

        return () => {
          scrambles.forEach((el) => {
            el.style.removeProperty("visibility");
            if (el.dataset.text) el.textContent = el.dataset.text;
          });
        };
      });

      mm.add(MQ.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=120%",
            scrub: 0.8,
            pin: true,
            onUpdate: (self) => (progress.current = self.progress),
          },
          defaults: { ease: "none" },
        });
        // Scroll tweens target wrappers so they never fight the intro tweens.
        tl.to(".hero-stage", { scale: 2.4, opacity: 0 }, 0)
          .to(".hero-name", { scale: 1.35, letterSpacing: "0.04em", yPercent: -10 }, 0)
          .to(".hero-sub", { opacity: 0, y: 40 }, 0)
          .to(".hero-hud-tl, .hero-hud-bl", { x: -120, opacity: 0 }, 0)
          .to(".hero-hud-tr, .hero-hud-br", { x: 120, opacity: 0 }, 0)
          .to(".hero-cue", { opacity: 0 }, 0)
          .to(".hero-backdrop", { scale: 1.5, opacity: 0.4 }, 0)
          .to(".hero-shade", { opacity: 0.7 }, 0.4);
      });

      mm.add(MQ.mobile, () => {
        gsap.to(".hero-name", {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => (progress.current = self.progress),
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      data-bg="#07070a"
      aria-label="Introduction"
      className="relative h-[100svh] min-h-[620px] overflow-hidden"
    >
      {/* Grid + light */}
      <div aria-hidden="true" className="hero-backdrop pointer-events-none absolute inset-0">
        <div
          className="hero-grid absolute inset-0 origin-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[140px]" />
        <span className="text-outline absolute -left-[4vw] top-1/2 -translate-y-1/2 -rotate-[8deg] select-none whitespace-nowrap font-serif text-[22vw] font-black leading-none opacity-60">
          DEVELOPER
        </span>
        <div className="hero-scan absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      {/* 3D core */}
      <div aria-hidden="true" className="hero-core pointer-events-none absolute inset-0 opacity-70">
        {show3d && (
          <Suspense fallback={null}>
            <TechCore progress={progress} />
          </Suspense>
        )}
      </div>

      {/* HUD — decorative readouts */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 font-mono text-[10px] uppercase tracking-[0.18em] sm:text-xs">
        <div className="hero-hud hero-hud-tl absolute left-4 top-20 sm:left-6 md:left-10 md:top-24">
          <p className="text-white/45">
            Profile file: <span className="font-semibold text-white" data-scramble>#LA-2026</span>
          </p>
          <p className="mt-2 inline-block border border-accent/70 px-2 py-1 text-accent" data-scramble>
            7+ yrs experience
          </p>
        </div>
        <div className="hero-hud hero-hud-tr absolute right-4 top-20 text-right sm:right-6 md:right-10 md:top-24">
          <p className="text-white/45">Base of operations</p>
          <p className="mt-1 font-semibold text-white" data-scramble>
            Hyderabad, India
          </p>
        </div>
        <div className="hero-hud hero-hud-bl absolute bottom-8 left-4 hidden items-center gap-6 sm:left-6 sm:flex md:left-10">
          <p className="flex items-center gap-2 font-semibold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_10px_2px_rgba(79,140,255,0.7)]" />
            System online
          </p>
          <p className="hidden text-white/45 md:block" data-scramble>
            Loc: 17.3850° N, 78.4867° E
          </p>
        </div>
        <div className="hero-hud hero-hud-br absolute bottom-8 right-4 hidden text-right sm:right-6 sm:block md:right-10">
          <p className="text-accent">{profile.tagline.join(" ")}</p>
          <p className="mt-1 text-white/45">Stack: React · Node · Cloud</p>
        </div>
      </div>

      {/* On desktop the name sits left so the 3D avatar has the right side */}
      <div className="hero-stage absolute inset-0 z-10 flex items-center justify-center px-4 pb-16 pt-36 sm:px-6 md:pt-40 lg:justify-start lg:pl-[5vw]">
        <div className="hero-frame relative flex h-full max-h-[640px] w-full max-w-[1180px] flex-col items-center justify-center px-4 py-10 sm:px-10 md:w-[78vw] lg:w-[58vw]">
          <h1 className="hero-name text-center font-serif font-black uppercase leading-[0.86] tracking-[-0.01em] text-white">
            <span className="sr-only">
              {profile.firstName} {profile.lastName} — {profile.role}
            </span>
            <span aria-hidden="true" className="hero-first block">
              <SplitChars text={profile.firstName.toUpperCase()} className="text-[clamp(2.8rem,12vw,7rem)] lg:text-[clamp(3rem,6.6vw,7rem)]" />
            </span>
            <span aria-hidden="true" className="hero-last block">
              <SplitChars text={profile.lastName.toUpperCase()} className="text-[clamp(2.8rem,12vw,7rem)] lg:text-[clamp(3rem,6.6vw,7rem)]" />
            </span>
          </h1>

          <p className="hero-badge mt-8 border border-accent/60 bg-accent/10 px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent sm:px-8 sm:text-xl md:mt-10 md:text-2xl">
            {profile.role}
          </p>

          <div className="hero-sub mt-8 flex flex-col items-center text-center">
            <p className="max-w-md text-[15px] leading-relaxed text-white/60">
              {profile.greeting} I build production React and Node.js applications — from interface
              to infrastructure.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <motion.a
                href={resumeUrl}
                download="Laxman-Arukala-Resume.pdf"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink-950"
              >
                <Download size={15} />
                Download Resume
              </motion.a>
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash("#projects");
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/50"
              >
                View work
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Barcode + scroll cue */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToHash("#about");
        }}
        className="hero-cue absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white"
        aria-label="Scroll to About"
      >
        <span aria-hidden="true" className="hero-barcode flex h-6 items-end gap-[3px]">
          {Array.from({ length: 34 }, (_, i) => (
            <span
              key={i}
              className="block w-px origin-bottom bg-current"
              style={{ height: `${40 + ((i * 37) % 60)}%`, opacity: i % 5 === 0 ? 0.9 : 0.5 }}
            />
          ))}
        </span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>

      {/* Shade used during the scroll hand-off */}
      <div aria-hidden="true" className="hero-shade pointer-events-none absolute inset-0 z-30 bg-ink-950 opacity-0" />
    </section>
  );
};

export default Hero;
