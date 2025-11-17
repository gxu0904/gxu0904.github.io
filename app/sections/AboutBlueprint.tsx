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
    <Section id="about" className="py-24 relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-30">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-[var(--primary)] rounded-full animate-pulse" />
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
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center relative z-10 w-full"
      >
        <motion.div variants={fadeIn} className="relative">
          <div className="glass rounded-lg p-8 border border-[var(--graphite)] backdrop-blur-md">
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto border-2 border-[var(--primary)] rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 border-2 border-[var(--accent)] rounded-full" />
                </div>
                <div className="font-mono text-xs text-[var(--primary)] uppercase tracking-wider">
                  Systems Architect
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            About
          </h2>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            I&apos;m Grace Xu—an engineer, researcher, and builder passionate about
            creating systems that solve real problems. My work spans from
            atomic-scale material science to large-scale social impact
            initiatives.
          </p>
          <p className="text-lg text-[var(--muted)] leading-relaxed">
            Whether it&apos;s optimizing nano-grinding parameters through machine
            learning or building platforms that help thousands of students, I
            believe in the power of thoughtful engineering to create meaningful
            change.
          </p>

          <div className="mt-12 space-y-6">
            <h3 className="font-mono text-sm text-[var(--primary)] uppercase tracking-wider">
              Key Milestones
            </h3>
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="relative pl-6 border-l-2 border-[var(--primary)]"
              >
                <div className="absolute -left-2 top-0 w-3 h-3 bg-[var(--primary)] rounded-full" />
                <div className="font-mono text-xs text-[var(--muted)] mb-1">
                  {milestone.year}
                </div>
                <h4 className="font-semibold mb-1">{milestone.title}</h4>
                <p className="text-sm text-[var(--muted)]">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

