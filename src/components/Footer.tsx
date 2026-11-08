import React from "react";
import { ArrowUp } from "lucide-react";
import { contact, contactItems, navLinks, profile } from "../data/portfolio";
import { scrollToHash } from "../hooks/useSmoothScroll";

const Footer: React.FC = () => {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
  };

  const socials = [
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin },
    contact.github && { label: "GitHub", href: contact.github },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1440px] px-4 pt-20 sm:px-6 md:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-lg font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">{profile.footerBlurb}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow mb-5">Quick Links</p>
            <ul className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5">Get In Touch</p>
            <ul className="space-y-3">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-white/60">
                  <item.icon size={14} className="shrink-0 text-accent" aria-hidden="true" />
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wordmark */}
        <p
          aria-hidden="true"
          className="display mt-20 select-none whitespace-nowrap bg-gradient-to-b from-white/[0.14] to-white/0 bg-clip-text text-center text-[11.4vw] text-transparent 2xl:text-[164px]"
        >
          {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
        </p>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. All rights reserved.
          </p>
          <a
            href="#hero"
            onClick={(e) => go(e, "#hero")}
            className="group flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/50">
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
