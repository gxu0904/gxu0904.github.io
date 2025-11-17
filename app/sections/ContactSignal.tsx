"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Github, Linkedin, FileText } from "lucide-react";
import Section from "@/app/components/Section";
import MagneticButton from "@/app/components/MagneticButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeIn } from "@/lib/motion";

export default function ContactSignal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showBeam, setShowBeam] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setShowBeam(true);
    setTimeout(() => {
      setShowBeam(false);
      setSubmitted(false);
    }, 3000);
  };

  const links = [
    { icon: Mail, href: "mailto:grace@example.com", label: "Email" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FileText, href: "/resume.pdf", label: "Resume" },
  ];

  return (
    <Section id="contact" className="py-24">
      <div className="max-w-2xl mx-auto space-y-12">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Contact
          </h2>
          <p className="text-lg text-[var(--muted)]">
            Let&apos;s connect. Whether it&apos;s collaboration, questions, or just saying
            hello—I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="glass border-[var(--graphite)]/50 p-8 hover-lift">
              <h3 className="font-semibold mb-4 font-mono text-sm uppercase tracking-wider text-[var(--primary)]">
                Direct Links
              </h3>
              <div className="space-y-3">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <MagneticButton
                      key={link.label}
                      as="a"
                      href={link.href}
                      className="w-full justify-start bg-[var(--graphite)] hover:bg-[var(--primary)] text-left"
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {link.label}
                    </MagneticButton>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence>
              {showBeam && (
                <motion.svg
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.line
                    x1="128"
                    y1="0"
                    x2="128"
                    y2="32"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx="128"
                    cy="32"
                    r="4"
                    fill="var(--primary)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>
            <Card className="glass border-[var(--graphite)]/50 p-8 hover-lift">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-[var(--muted)]">
                    Name
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-1 bg-[var(--graphite)] border-[var(--graphite)] focus:border-[var(--primary)] focus:ring-[var(--primary)] focus:shadow-[0_0_12px_rgba(0,168,232,0.3)] transition-all"
                      required
                    />
                  </motion.div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-[var(--muted)]">
                    Email
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-1 bg-[var(--graphite)] border-[var(--graphite)] focus:border-[var(--primary)] focus:ring-[var(--primary)] focus:shadow-[0_0_12px_rgba(0,168,232,0.3)] transition-all"
                      required
                    />
                  </motion.div>
                </div>
                <div>
                  <Label htmlFor="message" className="text-[var(--muted)]">
                    Message
                  </Label>
                  <motion.div
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="mt-1 bg-[var(--graphite)] border-[var(--graphite)] focus:border-[var(--primary)] focus:ring-[var(--primary)] focus:shadow-[0_0_12px_rgba(0,168,232,0.3)] transition-all min-h-[120px]"
                      required
                    />
                  </motion.div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[var(--primary)] hover:bg-[var(--accent)] text-[var(--bg)]"
                >
                  {submitted ? (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-[var(--bg)] rounded-full mr-2"
                      />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

