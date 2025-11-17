"use client";

import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Section from "@/app/components/Section";
import GlitchTitle from "@/app/components/GlitchTitle";
import MagneticButton from "@/app/components/MagneticButton";
import ReactorScene from "@/app/three/ReactorScene";

export default function LandingReactor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="landing" className="relative min-h-screen flex items-center justify-center overflow-hidden" noPadding>
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/20 rounded-full animate-pulse" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 8 + scrollY * 0.01], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ReactorScene mouse={mouse} scrollY={scrollY} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </Suspense>
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2 
        }}
      >
        <GlitchTitle className="mb-6 sm:mb-8 text-[var(--fg)]">
          Designing logic, systems, and stories.
        </GlitchTitle>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-[var(--muted)] mb-12 sm:mb-16 font-light tracking-tight leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Engineer. Researcher. Builder.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MagneticButton onClick={() => scrollToSection("projects")}>
            Explore Work
          </MagneticButton>
          <MagneticButton onClick={() => scrollToSection("contact")}>
            Get in Touch
          </MagneticButton>
        </motion.div>
      </motion.div>
    </Section>
  );
}

