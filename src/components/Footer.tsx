import React from "react";
import { ArrowUp } from "lucide-react";
import { contact, contactItems, navLinks, profile } from "../data/portfolio";

const Footer: React.FC = () => {
  const socials = [
    contact.linkedin && { label: "LinkedIn", href: contact.linkedin },
    contact.github && { label: "GitHub", href: contact.github },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="tone-cream">
      <div className="mx-auto max-w-[1440px] px-4 pt-16 sm:px-6 md:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-lg font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg/80">{profile.footerBlurb}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow mb-4">Quick Links</p>
            <ul className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">Get In Touch</p>
            <ul className="space-y-2.5 text-sm">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <item.icon size={14} className="shrink-0" aria-hidden="true" />
                  {item.href ? (
                    <a href={item.href} className="hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-fg/20 py-6">
          <p className="text-xs text-fg/80">
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. All rights reserved.
          </p>
          <a href="#hero" className="flex items-center gap-2 text-xs font-medium hover:underline">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
