"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  const links = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:grace@example.com", label: "Email" },
    { icon: FileText, href: "/resume.pdf", label: "Resume" },
  ];

  return (
    <footer className="border-t border-[var(--graphite)] py-8 md:py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-[var(--muted)] text-sm md:text-base">
              © {new Date().getFullYear()} Grace Xu
            </span>
            <div className="flex items-center gap-1 ml-2 md:ml-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-4 bg-white/30 rounded-full"
                  animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <MagneticButton
                  key={link.label}
                  as="a"
                  href={link.href}
                  className="p-2.5 md:p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[var(--fg)] transition-all hover:scale-110"
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </MagneticButton>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

