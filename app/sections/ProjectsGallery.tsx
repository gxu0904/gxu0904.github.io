"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/app/components/Section";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/app/data/projects";
import { stagger } from "@/lib/motion";

type Category = "All" | "Engineering" | "Research" | "Social Impact" | "Design";

export default function ProjectsGallery() {
  const [category, setCategory] = useState<Category>("All");

  const filteredProjects =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  const categories: Category[] = ["All", "Engineering", "Research", "Social Impact"];

  return (
    <Section id="projects" className="py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 text-[var(--fg)]">
            Work
          </h2>
          <p className="text-lg md:text-xl text-[var(--muted)] max-w-2xl">
            A collection of projects spanning engineering, research, and social impact.
          </p>
        </div>

        <div className="flex gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white text-[var(--muted)] hover:bg-[var(--graphite)] border border-[var(--border-color)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)]">
            No projects in this category yet.
          </div>
        )}
      </div>
    </Section>
  );
}

