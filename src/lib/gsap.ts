import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Don't re-measure every trigger when a phone's address bar shows/hides
// mid-scroll — that causes visible jumps in pinned scenes.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Media queries shared by every scene so timings stay consistent. */
export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power2.inOut",
} as const;

export { gsap, ScrollTrigger };
