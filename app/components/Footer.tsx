"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function Footer() {
  const links = [
    { icon: Github, href: "https://github.com/gracexu", label: "GitHub", target: "_blank" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/grace-xu", label: "LinkedIn", target: "_blank" },
    { icon: Mail, href: "mailto:hello@gracexu.com", label: "Email" },
    { icon: FileText, href: "/resume.pdf", label: "Resume", target: "_blank" },
  ];

  return (
    <footer className="border-t border-[var(--border-color)] py-12 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Grace Xu
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target ? "noopener noreferrer" : undefined}
                  className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

