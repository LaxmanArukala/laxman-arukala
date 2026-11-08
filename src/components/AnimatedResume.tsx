import React, { Suspense, lazy, useLayoutEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Capabilities from "./sections/Capabilities";
import Contact from "./sections/Contact";

// 3D avatar that walks across the hero and settles into the About frame.
const AvatarJourney = lazy(() => import("./three/AvatarJourney"));

/**
 * The portfolio, told as seven scenes:
 * Hero → About → Expertise → Experience → Projects → Capabilities → Contact.
 * Content lives in src/data/portfolio.ts; each scene owns its own GSAP timeline.
 */
const AnimatedResume: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  useSmoothScroll();

  // Cross-fade the page background as each scene takes over.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((scene) => {
        const color = scene.dataset.bg!;
        ScrollTrigger.create({
          trigger: scene,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) gsap.to(html, { "--bg": color, duration: 0.9, ease: "power2.out", overwrite: true });
          },
        });
      });
    }, root);
    return () => {
      ctx.revert();
      html.style.removeProperty("--bg");
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-white px-4 py-2 text-sm text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <NavBar />
      <div ref={root} className="relative">
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Capabilities />
          <Contact />
        </main>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <AvatarJourney />
      </Suspense>
    </MotionConfig>
  );
};

export default AnimatedResume;
