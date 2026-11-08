import React, { useLayoutEffect, useRef } from "react";
import { gsap, MQ } from "../../lib/gsap";
import { SplitWords } from "../fx/Split";
import { contactItems, experiences, images, profile, stats } from "../../data/portfolio";

/**
 * Scene 2 — About.
 * Sticky portrait on the left; the story on the right lights up word by word
 * as it scrolls through the viewport.
 */
const About: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // Ghost word drifts across the background
        gsap.fromTo(
          ".about-ghost",
          { xPercent: 10 },
          {
            xPercent: -35,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        // Portrait: mask opens, image drifts inside its frame
        gsap.fromTo(
          ".about-mask",
          { clipPath: "inset(18% 12% 18% 12% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            ease: "none",
            scrollTrigger: { trigger: ".about-mask", start: "top 90%", end: "top 40%", scrub: true },
          },
        );
        gsap.fromTo(
          ".about-img",
          { scale: 1.3, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        // Headline rises in
        gsap.from(".about-head .split-word", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: ".about-head", start: "top 85%" },
        });

        // Story paragraph — scrubbed word reveal
        gsap.fromTo(
          ".about-story .split-word",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".about-story", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );

        gsap.from(".about-reveal", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-reveal", start: "top 88%" },
        });

        gsap.from(".about-stat", {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      data-bg="#0b0b10"
      aria-labelledby="about-title"
      // overflow-x-clip (not overflow-hidden) so the avatar frame can stay sticky
      className="relative overflow-x-clip py-28 md:py-40"
    >
      <div
        aria-hidden="true"
        className="about-ghost text-outline pointer-events-none absolute left-0 top-10 select-none whitespace-nowrap font-display text-[26vw] font-semibold leading-none tracking-tightest"
      >
        About — About
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Portrait column */}
        <div className="lg:col-span-5">
          <figure className="about-frame mx-auto max-w-[420px] lg:sticky lg:top-28 lg:max-w-none">
            {/* The 3D avatar (AvatarJourney) lands in this frame and works at a laptop. */}
            <div
              data-avatar-dock
              className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(90%_70%_at_50%_75%,rgba(79,140,255,0.16),transparent_70%),linear-gradient(180deg,#0e1220,#07070a)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  maskImage: "linear-gradient(180deg, transparent 0%, black 55%, black 100%)",
                  WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 55%, black 100%)",
                }}
              />
              <p className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Live · at work
              </p>
            </div>
            <figcaption className="mt-5 flex items-end justify-between">
              <div>
                <p className="font-display text-xl font-semibold">
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="text-sm text-white/60">{profile.location}</p>
              </div>
              <p className="text-right font-display text-sm text-white/60">
                {profile.experience}
                <br />
                experience
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Story column */}
        <div className="lg:col-span-7 lg:pt-10">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">02</span>
            <span className="h-px w-8 bg-white/20" />
            About me
          </p>

          <h2
            id="about-title"
            className="about-head display mt-8 text-[clamp(2.4rem,6vw,5.5rem)] text-white"
          >
            <SplitWords text={profile.aboutHeadline} masked />
          </h2>

          {/* Supplied suit photograph, used as-is (no retouching). */}
          <div className="about-mask relative mt-12 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-ink-800">
            <img
              src={images.professionalPortrait}
              alt="Laxman Arukala in a navy business suit"
              width={746}
              height={1120}
              loading="lazy"
              decoding="async"
              className="about-img absolute inset-0 h-full w-full object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
          </div>

          <p className="about-story mt-12 font-display text-[clamp(1.35rem,2.3vw,2.2rem)] font-medium leading-[1.3] tracking-tight text-white">
            <SplitWords text={profile.about} />
          </p>

          <div className="about-reveal mt-14 grid gap-10 border-t border-white/[0.08] pt-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow">Roles</p>
              <ul className="mt-4 space-y-2">
                {profile.roles.map((r) => (
                  <li key={r} className="font-display text-lg text-white/85">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Focus</p>
              <p className="mt-4 font-display text-lg text-white/85">{profile.focus}</p>
              <p className="eyebrow mt-8">Companies</p>
              <p className="mt-4 text-white/70">
                {experiences.map((e) => e.shortName).join(" · ")}
              </p>
            </div>
          </div>

          <dl className="about-stats mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="about-stat flex flex-col-reverse justify-end bg-[var(--bg)] p-6">
                <dt className="mt-3 text-xs uppercase tracking-[0.2em] text-white/45">{s.label}</dt>
                <dd className="display text-5xl text-white">{s.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="about-reveal mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60">
            {contactItems.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <item.icon size={15} className="text-accent" aria-hidden="true" />
                {item.href ? (
                  <a href={item.href} className="transition-colors hover:text-white">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
