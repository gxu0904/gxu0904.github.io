"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export default function Section({ 
  children, 
  className = "", 
  id,
  noPadding = false 
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      className={`min-h-screen ${noPadding ? '' : 'py-24 sm:py-32'} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.section>
  );
}

