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
              <div className="w-64 h-64 border-2 border-[var(--primary)] rounded-full animate-pulse" />
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

      <div className="space-y-12 relative z-10">
        <div className="text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Projects
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            A collection of systems, research, and initiatives I&apos;ve built and
            contributed to.
          </p>
        </div>

        <Tabs
          value={category}
          onValueChange={(value: string) => setCategory(value as Category)}
          className="w-full"
        >
          <TabsList className="glass border-[var(--graphite)] grid w-full max-w-md mx-auto grid-cols-5">
            {(["All", "Engineering", "Research", "Social Impact", "Design"] as Category[]).map(
              (cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="text-xs sm:text-sm font-mono data-[state=active]:bg-[var(--primary)] data-[state=active]:text-[var(--bg)]"
                >
                  {cat}
                </TabsTrigger>
              )
            )}
          </TabsList>
        </Tabs>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-[var(--muted)]">
            No projects in this category yet.
          </div>
        )}
      </div>
    </Section>
  );
}

