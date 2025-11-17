"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Section from "@/app/components/Section";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/app/data/projects";
import { stagger } from "@/lib/motion";
import ProjectsScene from "@/app/three/ProjectsScene";

type Category = "All" | "Engineering" | "Research" | "Social Impact" | "Design";

export default function ProjectsGallery() {
  const [category, setCategory] = useState<Category>("All");

  const filteredProjects =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <Section id="projects" className="py-24 relative min-h-screen">
      <div className="absolute inset-0 z-0 opacity-20">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/20 rounded-full animate-pulse" />
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ProjectsScene />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.4}
            />
          </Canvas>
        </Suspense>
      </div>

      <div className="space-y-8 md:space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Projects
          </h2>
          <p className="text-base md:text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            A collection of systems, research, and initiatives I&apos;ve built and
            contributed to.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs
            value={category}
            onValueChange={(value: string) => setCategory(value as Category)}
            className="w-full"
          >
            <TabsList className="glass border-white/10 grid w-full max-w-2xl mx-auto grid-cols-3 sm:grid-cols-5 gap-1 p-1">
              {(["All", "Engineering", "Research", "Social Impact", "Design"] as Category[]).map(
                (cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="text-xs sm:text-sm font-mono data-[state=active]:bg-white/10 data-[state=active]:text-[var(--fg)] text-[var(--muted)] transition-all rounded-md"
                  >
                    <span className="hidden sm:inline">{cat}</span>
                    <span className="sm:hidden">{cat === "Social Impact" ? "Impact" : cat === "Engineering" ? "Eng" : cat}</span>
                  </TabsTrigger>
                )
              )}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-[var(--muted)]"
          >
            No projects in this category yet.
          </motion.div>
        )}
      </div>
    </Section>
  );
}

