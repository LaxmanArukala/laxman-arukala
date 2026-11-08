import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, contact } from "../data/portfolio";
import { scrollToHash } from "../hooks/useSmoothScroll";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: hidden ? 0 : 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-colors duration-500 ${
            scrolled ? "bg-ink-950/70 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 md:px-10">
            <a
              href="#hero"
              onClick={(e) => go(e, "#hero")}
              className="group flex items-center gap-3 font-display text-sm font-semibold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[11px] tracking-widest transition-colors group-hover:border-accent group-hover:text-accent">
                LA
              </span>
              <span className="hidden sm:inline">Laxman Arukala</span>
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {navLinks.slice(1, -1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="relative rounded-full px-4 py-2 text-[13px] text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <motion.a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-ink-950 sm:flex"
              >
                Let's talk
                <ArrowUpRight size={15} />
              </motion.a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-accent to-accent-violet"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-950 px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 border-b border-white/[0.08] py-3 font-display text-4xl font-semibold tracking-tight text-white"
                >
                  <span className="text-xs font-normal text-white/30">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href={`mailto:${contact.email}`}
              className="text-sm text-white/60"
            >
              {contact.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
