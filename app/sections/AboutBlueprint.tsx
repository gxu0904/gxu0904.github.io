"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import Section from "@/app/components/Section";
import { fadeIn, stagger } from "@/lib/motion";
import BlueprintScene from "@/app/three/BlueprintScene";

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
    <Section id="about" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-20 md:opacity-30">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/20 rounded-full animate-pulse" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <BlueprintScene />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </Suspense>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10 w-full"
      >
        <motion.div variants={fadeIn} className="relative order-2 md:order-1">
          <div className="glass rounded-xl p-6 md:p-8 border border-[var(--graphite)] backdrop-blur-md hover-lift glass-hover">
            <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 border border-white/10 rounded-full" />
                </div>
                <div className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">
                  Systems Architect
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-6 order-1 md:order-2">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            About
          </h2>
          <div className="space-y-4">
            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
              I&apos;m Grace Xu—an engineer, researcher, and builder passionate about
              creating systems that solve real problems. My work spans from
              atomic-scale material science to large-scale social impact
              initiatives.
            </p>
            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed">
              Whether it&apos;s optimizing nano-grinding parameters through machine
              learning or building platforms that help thousands of students, I
              believe in the power of thoughtful engineering to create meaningful
              change.
            </p>
          </div>

          <div className="mt-8 md:mt-12 space-y-6">
            <h3 className="font-mono text-xs md:text-sm text-[var(--muted)] uppercase tracking-wider">
              Key Milestones
            </h3>
            <div className="space-y-6">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="relative pl-6 border-l border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white/20 rounded-full" />
                  <div className="font-mono text-xs text-[var(--muted)] mb-2">
                    {milestone.year}
                  </div>
                  <h4 className="font-semibold mb-2 text-[var(--fg)]">{milestone.title}</h4>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

