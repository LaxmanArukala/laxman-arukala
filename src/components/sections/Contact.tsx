import React, { Suspense, lazy, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { gsap, MQ } from "../../lib/gsap";
import { contact, contactItems, resumeUrl } from "../../data/portfolio";

// Form libraries (Formik, Yup, EmailJS) load separately — the form sits at the end of the page.
const ContactFrom = lazy(() => import("../ContactFrom"));

const headline = ["LET'S BUILD", "SOMETHING", "AMAZING."];

/**
 * Scene 7 — Contact.
 * The closing headline rises line by line and scales into place as the
 * scene arrives, then the contact details and form settle in.
 */
const Contact: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          ".ct-line-inner",
          { yPercent: 105 },
          {
            yPercent: 0,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: ".ct-head", start: "top 95%", end: "top 45%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          ".ct-head",
          { scale: 0.92 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: ".ct-head", start: "top bottom", end: "bottom 50%", scrub: true },
          },
        );
        gsap.from(".ct-reveal", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".ct-body", start: "top 80%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const socials = [
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin, icon: Linkedin },
    contact.github && { label: "GitHub", href: contact.github, icon: Github },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Github }[];

  return (
    <section
      id="contact"
      ref={root}
      data-bg="#07070a"
      aria-labelledby="contact-title"
      className="relative overflow-hidden pb-24 pt-28 md:pt-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]">
        <div className="absolute left-1/2 top-[10%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">07</span>
          <span className="h-px w-8 bg-white/20" />
          Get in touch
        </p>

        <h2 id="contact-title" className="ct-head display mt-10 origin-left text-[clamp(3rem,11vw,11.5rem)]">
          <span className="sr-only">Let's build something amazing.</span>
          {headline.map((line, i) => (
            <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
              <span
                className={`ct-line-inner block ${
                  i === 2
                    ? "bg-gradient-to-r from-accent via-accent-soft to-accent-violet bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="ct-body mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a
              href={`mailto:${contact.email}`}
              className="ct-reveal group inline-flex items-center gap-3 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium tracking-tight"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {contact.email}
              </span>
              <ArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>

            <ul className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {contactItems.map((item) => (
                <li key={item.label} className="ct-reveal flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-3 text-sm text-white/45">
                    <item.icon size={16} className="text-accent" aria-hidden="true" />
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="text-right text-white/85 transition-colors hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-right text-white/85">{item.value}</span>
                  )}
                </li>
              ))}
              {socials.map((s) => (
                <li key={s.label} className="ct-reveal flex items-center justify-between gap-4 py-5">
                  <span className="flex items-center gap-3 text-sm text-white/45">
                    <s.icon size={16} className="text-accent" aria-hidden="true" />
                    {s.label}
                  </span>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white/85 transition-colors hover:text-white"
                  >
                    Profile <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>

            <motion.a
              href={resumeUrl}
              download="Laxman-Arukala-Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ct-reveal mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-medium text-ink-950"
            >
              <Download size={16} />
              Download Resume
            </motion.a>
          </div>

          <div className="ct-reveal lg:col-span-6 lg:col-start-7">
            <Suspense fallback={<div className="min-h-[460px]" aria-hidden="true" />}>
              <ContactFrom />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
