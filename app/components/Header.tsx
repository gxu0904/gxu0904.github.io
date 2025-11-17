"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommandK from "./CommandK";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          opacity: { duration: 0.3 }
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "glass-strong border-b border-[var(--graphite)]/50 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection("landing")}
            className="font-display text-xl font-bold text-[var(--fg)] hover:text-[var(--primary)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Grace Xu
          </motion.button>

          <div className="hidden md:flex items-center gap-2">
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Projects" },
              { id: "impact", label: "Impact" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg text-[var(--muted)] hover:text-[var(--fg)] transition-all font-medium relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-[var(--primary)]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => setOpen(true)}
            className="text-[var(--muted)] hover:text-[var(--fg)] p-2"
            aria-label="Open command palette"
          >
            <Command className="h-5 w-5" />
            <span className="sr-only">Open command palette (⌘K)</span>
          </Button>
        </nav>
      </motion.header>

      <CommandK open={open} onOpenChange={setOpen} />
    </>
  );
}

