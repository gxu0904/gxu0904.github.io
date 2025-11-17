"use client";

import { motion } from "framer-motion";
import Section from "@/app/components/Section";

export default function LandingReactor() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="landing" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.h1
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[var(--fg)] mb-8 leading-[0.95]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Grace Xu
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-[var(--muted)] mb-16 font-light max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Engineer. Researcher. Builder of systems that solve real problems.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-4 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--accent)] transition-colors text-lg"
          >
            View Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 border-2 border-[var(--border-color)] text-[var(--fg)] rounded-lg font-medium hover:border-[var(--primary)] transition-colors text-lg"
          >
            Get in Touch
          </button>
        </motion.div>
      </motion.div>
    </Section>
  );
}

