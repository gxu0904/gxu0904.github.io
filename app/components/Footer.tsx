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
    <footer className="border-t border-[var(--graphite)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[var(--muted)] text-sm">
              © {new Date().getFullYear()} Grace Xu
            </span>
            <div className="flex items-center gap-1 ml-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-4 bg-[var(--primary)]"
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

          <div className="flex items-center gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <MagneticButton
                  key={link.label}
                  as="a"
                  href={link.href}
                  className="p-2 rounded-full bg-[var(--graphite)] text-[var(--fg)] hover:bg-[var(--primary)]"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </MagneticButton>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

