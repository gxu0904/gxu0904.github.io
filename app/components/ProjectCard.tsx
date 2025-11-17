"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
          className="glass border-white/10 cursor-pointer h-full group hover-lift transition-all duration-300 hover:border-white/20 glass-hover overflow-hidden"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          tabIndex={0}
          role="button"
          aria-expanded={open}
          aria-controls={`project-${project.id}`}
        >
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                className="text-4xl md:text-5xl font-display text-[var(--fg)] opacity-30 group-hover:opacity-50 transition-opacity"
                whileHover={{ scale: 1.05 }}
              >
                {project.title.charAt(0)}
              </motion.span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <Badge variant="outline" className="font-mono text-xs">
                {project.year}
              </Badge>
            </div>
            <CardDescription className="text-[var(--muted)]">
              {project.tagline}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs font-mono bg-[var(--graphite)] text-[var(--muted)]"
                >
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 3 && (
                <Badge variant="secondary" className="text-xs font-mono">
                  +{project.tech.length - 3}
                </Badge>
              )}
            </div>
            <p className="text-sm text-[var(--muted)] line-clamp-2">
              {project.summary}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl glass border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">{project.title}</DialogTitle>
            <DialogDescription className="text-[var(--muted)]">
              {project.tagline}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-white/5 to-white/10 opacity-50" />

            <div>
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="text-[var(--muted)]">{project.summary}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--muted)]">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="font-mono bg-[var(--graphite)]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {project.links.live && (
                <a 
                  href={project.links.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 text-[var(--fg)] rounded-lg transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Site
                </a>
              )}
              {project.links.repo && (
                <a 
                  href={project.links.repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg transition-colors text-[var(--fg)]"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Repository
                </a>
              )}
              {project.links.doc && (
                <a 
                  href={project.links.doc} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg transition-colors text-[var(--fg)]"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

