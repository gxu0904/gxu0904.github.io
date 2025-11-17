"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, FileText, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/lib/motion";
import { Project } from "@/app/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <Card
          className="bg-white border border-[var(--border-color)] cursor-pointer group hover:shadow-lg hover:border-[var(--primary)] transition-all duration-200"
          onClick={() => setOpen(true)}
        >
          <CardHeader className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-semibold text-[var(--fg)] group-hover:text-[var(--primary)] transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <p className="text-[var(--muted)] text-base leading-relaxed">
              {project.tagline}
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 bg-[var(--bg-secondary)] text-[var(--muted)] rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-xs px-3 py-1 bg-[var(--bg-secondary)] text-[var(--muted)] rounded-full font-medium">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-white border border-[var(--border-color)] max-h-[90vh] overflow-y-auto p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-[var(--fg)]">{project.title}</h2>
              <p className="text-xl text-[var(--muted)]">{project.tagline}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
                Overview
              </h3>
              <p className="text-lg text-[var(--fg)] leading-relaxed">{project.summary}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
                Highlights
              </h3>
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--fg)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-[var(--bg-secondary)] text-[var(--fg)] rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6 border-t border-[var(--border-color)]">
              {project.links.live && (
                <Button
                  asChild
                  className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white"
                >
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Site
                  </a>
                </Button>
              )}
              {project.links.repo && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--border-color)] hover:border-[var(--primary)]"
                >
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    Repository
                  </a>
                </Button>
              )}
              {project.links.doc && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--border-color)] hover:border-[var(--primary)]"
                >
                  <a href={project.links.doc} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Documentation
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

