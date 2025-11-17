"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText } from "lucide-react";
import Section from "@/app/components/Section";
import { fadeIn } from "@/lib/motion";

export default function ContactSignal() {
  const links = [
    { icon: Mail, href: "mailto:hello@gracexu.com", label: "Email" },
    { icon: Github, href: "https://github.com/gracexu", label: "GitHub", target: "_blank" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/grace-xu", label: "LinkedIn", target: "_blank" },
    { icon: FileText, href: "/resume.pdf", label: "Resume", target: "_blank" },
  ];

  return (
    <Section id="contact" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 text-[var(--fg)]">
            Contact
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] mb-16 max-w-2xl">
            Let's connect. Whether it's collaboration, questions, or just saying hello—I'd love to hear from you.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-6 border border-[var(--border-color)] rounded-lg hover:border-[var(--primary)] hover:bg-[var(--bg-secondary)] transition-all group"
                >
                  <Icon className="h-6 w-6 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors" />
                  <span className="text-[var(--fg)] font-medium group-hover:text-[var(--primary)] transition-colors">
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
