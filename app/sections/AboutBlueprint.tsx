"use client";

import { motion } from "framer-motion";
import Section from "@/app/components/Section";
import { fadeIn, stagger } from "@/lib/motion";

export default function AboutBlueprint() {
  const milestones = [
    {
      year: "2025",
      title: "Nano-Grinding Research",
      description: "First-author publication on MD + DL optimization for atomic-scale machining.",
    },
    {
      year: "2025",
      title: "LightAid Launch",
      description: "Co-founded nonprofit addressing light & period poverty, 20+ chapters nationwide.",
    },
    {
      year: "2025",
      title: "StudyAP Platform",
      description: "Built AI-powered test prep platform serving 1k+ students with 65% retention boost.",
    },
  ];

  return (
    <Section id="about" className="py-32 bg-white">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={fadeIn} className="mb-24">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 text-[var(--fg)]">
            About
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-3xl">
            <p>
              I'm Grace Xu—an engineer, researcher, and builder passionate about
              creating systems that solve real problems. My work spans from
              atomic-scale material science to large-scale social impact
              initiatives.
            </p>
            <p>
              Whether it's optimizing nano-grinding parameters through machine
              learning or building platforms that help thousands of students, I
              believe in the power of thoughtful engineering to create meaningful
              change.
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-8">
            Key Milestones
          </h3>
          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="relative"
              >
                <div className="flex gap-12">
                  <div className="text-sm font-medium text-[var(--muted)] w-16 flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1 border-l-2 border-[var(--border-color)] pl-8 pb-12">
                    <h4 className="text-xl font-semibold mb-2 text-[var(--fg)]">{milestone.title}</h4>
                    <p className="text-[var(--muted)] leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

