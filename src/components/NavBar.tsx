import React from "react";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const NavBar: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-xl md:px-6">
        <a
          href="#hero"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs">
            LA
          </span>
          <span className="hidden sm:inline">Laxman</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-300 transition-colors hover:text-white"
            >
              {i === 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0a0a0f] transition-colors hover:bg-gray-200 sm:flex"
          >
            Get In Touch
          </a>
          <a
            href="mailto:laxmanarukala@yahoo.com"
            aria-label="Email"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
