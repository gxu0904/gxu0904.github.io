"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Github, Linkedin, Mail, FileText, ArrowRight } from "lucide-react";

interface CommandKProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandK({ open, onOpenChange }: CommandKProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onOpenChange(false);
    }
  };

  const actions = [
    {
      group: "Navigation",
      items: [
        {
          label: "About",
          action: () => scrollToSection("about"),
          icon: ArrowRight,
        },
        {
          label: "Projects",
          action: () => scrollToSection("projects"),
          icon: ArrowRight,
        },
        {
          label: "Impact",
          action: () => scrollToSection("impact"),
          icon: ArrowRight,
        },
        {
          label: "Contact",
          action: () => scrollToSection("contact"),
          icon: ArrowRight,
        },
      ],
    },
    {
      group: "External Links",
      items: [
        {
          label: "GitHub",
          action: () => window.open("https://github.com", "_blank"),
          icon: Github,
        },
        {
          label: "LinkedIn",
          action: () => window.open("https://linkedin.com", "_blank"),
          icon: Linkedin,
        },
        {
          label: "Email",
          action: () => (window.location.href = "mailto:grace@example.com"),
          icon: Mail,
        },
        {
          label: "Download Resume",
          action: () => window.open("/resume.pdf", "_blank"),
          icon: FileText,
        },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden glass-strong border-white/10 shadow-2xl">
        <Command className="rounded-lg">
          <CommandInput
            placeholder="Type a command or search..."
            className="border-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {actions.map((group) => (
              <CommandGroup key={group.group} heading={group.group}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <CommandItem
                      key={item.label}
                      onSelect={() => {
                        item.action();
                        onOpenChange(false);
                      }}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

