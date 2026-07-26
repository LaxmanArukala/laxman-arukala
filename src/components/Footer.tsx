import React from "react";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

const contactLines = [
  { icon: Mail, value: "laxmanarukala@yahoo.com", href: "mailto:laxmanarukala@yahoo.com" },
  { icon: Phone, value: "+91 888688 8762", href: "tel:+918886888762" },
  { icon: MapPin, value: "Hyderabad, India", href: undefined },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs">
                LA
              </span>
              Laxman Arukala
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Full stack developer building fast, accessible web products —
              from UI/UX and frontend to backend, DevOps, and hosting.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Get In Touch
            </p>
            <ul className="space-y-3">
              {contactLines.map((item) => (
                <li key={item.value} className="flex items-center gap-2 text-sm text-gray-400">
                  <item.icon size={15} className="flex-shrink-0 text-blue-400" />
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Laxman Arukala. All rights reserved.
          </p>
          <a
            href="#hero"
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
