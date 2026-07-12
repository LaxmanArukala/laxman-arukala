import React from "react";
import { Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const NavBar: React.FC = () => {
  return (
    <header className="relative z-30 flex items-center justify-between border-b border-white/10 bg-[#0a0a0f]">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-white/5 text-lg font-bold text-white md:h-20 md:w-20">
        LA
      </div>

      <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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

      <a
        href="mailto:laxmanarukala@yahoo.com"
        aria-label="Email"
        className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-white/5 text-white transition-colors hover:bg-white/10 md:h-20 md:w-20"
      >
        <Mail size={20} />
      </a>
    </header>
  );
};

export default NavBar;
