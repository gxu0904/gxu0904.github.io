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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-[var(--border-color)] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => scrollToSection("landing")}
            className="font-display text-lg font-semibold text-[var(--fg)] hover:text-[var(--primary)] transition-colors"
          >
            GX
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "about", label: "About" },
              { id: "projects", label: "Work" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="text-[var(--muted)] hover:text-[var(--fg)] md:hidden"
            aria-label="Open menu"
          >
            <Command className="h-5 w-5" />
          </Button>
        </nav>
      </motion.header>

      <CommandK open={open} onOpenChange={setOpen} />
    </>
  );
}

