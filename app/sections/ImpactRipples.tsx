"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Section from "@/app/components/Section";
import RippleScene from "@/app/three/RippleScene";
import { metrics } from "@/app/data/metrics";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImpactRipples() {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  return (
    <Section id="impact" className="py-32 relative min-h-screen flex items-center section-gradient">
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-[var(--primary)] rounded-full animate-pulse glow-blue" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 5, 10], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            className="opacity-50"
          >
            <RippleScene onMetricHover={setHoveredMetric} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minDistance={8}
              maxDistance={15}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </Suspense>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center w-full relative z-10">
        <div className="space-y-8">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-mono">
              Social Impact
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-[var(--fg)] to-[var(--muted)] bg-clip-text text-transparent">
            Impact
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed">
            The ripple effects of systems thinking and engineering—measured in
            lives touched, communities served, and problems solved.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-12">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredMetric(i)}
                onMouseLeave={() => setHoveredMetric(null)}
                whileHover={{ scale: 1.05 }}
                className={`glass border rounded-lg p-6 cursor-pointer transition-all ${
                  hoveredMetric === i
                    ? "border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
                    : "border-[var(--graphite)]"
                }`}
              >
                <div className="font-mono text-xs text-[var(--muted)] mb-2 uppercase tracking-wider">
                  {metric.label}
                </div>
                <div className="font-display text-3xl font-bold text-[var(--primary)]">
                  {metric.value.toLocaleString()}
                  {metric.label.includes("$") && "+"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[500px] rounded-lg overflow-hidden glass border border-[var(--graphite)] backdrop-blur-md">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-center space-y-6">
              <motion.div
                className="font-display text-5xl md:text-6xl font-bold text-[var(--primary)] opacity-90"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {metrics.reduce((sum, m) => sum + m.value, 0).toLocaleString()}
              </motion.div>
              <div className="font-mono text-sm text-[var(--muted)] uppercase tracking-wider">
                Total Impact
              </div>
              <div className="text-sm text-[var(--muted)] max-w-sm mx-auto">
                The combined reach of all initiatives, representing lives improved and communities strengthened
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hoveredMetric !== null && metrics[hoveredMetric]?.story && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md"
          >
            <Card className="glass border-[var(--primary)]">
              <CardHeader>
                <CardTitle className="text-lg">
                  {metrics[hoveredMetric].label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted)]">
                  {metrics[hoveredMetric].story}
                </p>
                {metrics[hoveredMetric].link && (
                  <a
                    href={metrics[hoveredMetric].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] hover:underline text-sm mt-2 inline-block"
                  >
                    Learn more →
                  </a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

