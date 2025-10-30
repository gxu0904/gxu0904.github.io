# Grace Xu - CLI Portfolio

> An interactive command-line portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)

## ✨ Features

- 🖥️ **Interactive Terminal Interface** - Fully functional CLI with command parsing and execution
- ⌨️ **Keyboard-First UX** - Arrow keys for history navigation, Tab for autocomplete
- 🎨 **Dark/Light Theme** - Toggle with `theme` command, persisted to localStorage
- 📱 **Responsive Design** - Works seamlessly from mobile to desktop
- ⚡ **Performance Optimized** - Lighthouse scores 95+ across all categories
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation
- 🔍 **SEO Ready** - Comprehensive metadata, Open Graph, sitemap, robots.txt
- 🎁 **Easter Egg** - Hidden surprise for curious explorers (try `cat secret.txt`)
- 🧪 **Fully Tested** - Unit tests with Vitest for CLI functionality
- 📦 **Type-Safe** - End-to-end TypeScript with Zod validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/gxu0904/gxu0904.github.io.git
cd gxu0904.github.io

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
gxu0904.github.io/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage with Terminal
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # Auto-generated sitemap
│   └── robots.ts            # Robots.txt configuration
├── components/              # React components
│   ├── Terminal.tsx         # Main terminal component
│   ├── WindowFrame.tsx      # Terminal window chrome
│   ├── Prompt.tsx           # Command prompt
│   └── OutputBlock.tsx      # Command output rendering
├── lib/                     # Core business logic
│   ├── cli/                 # CLI infrastructure
│   │   ├── parser.ts        # Command parsing & autocomplete
│   │   ├── router.ts        # Command routing
│   │   ├── commands.ts      # Command implementations
│   │   └── history.ts       # Command history management
│   └── types.ts             # TypeScript types & Zod schemas
├── data/                    # Content files
│   ├── person.ts            # Personal information
│   ├── about.md             # About section content
│   ├── projects.json        # Project data
│   └── resume.md            # Resume content
├── tests/                   # Unit tests
│   ├── cli/                 # CLI functionality tests
│   └── setup.ts             # Test configuration
├── public/                  # Static assets
│   ├── resume.pdf           # Resume PDF (add your own)
│   └── manifest.json        # PWA manifest
└── next.config.mjs          # Next.js configuration
```

## 🎮 Available Commands

Type these commands in the terminal:

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn more about me |
| `projects` / `ls` | List all projects |
| `open <slug>` | View detailed project information |
| `resume` | View resume (with PDF download) |
| `contact` | Get contact information |
| `email` | Open email client |
| `socials` | View social media links |
| `theme` | Toggle dark/light theme |
| `cat <file>` | Read a file (try `secret.txt`) |
| `clear` | Clear the terminal |

### Tips

- Use **↑/↓** arrow keys to navigate command history
- Press **Tab** to autocomplete commands and project slugs
- Try `cat secret.txt` for an Easter egg!

## ✏️ Customizing Content

### Update Personal Information

Edit `data/person.ts`:

```typescript
export const person = {
  name: 'Your Name',
  title: 'Your Title',
  location: 'Your Location',
  email: 'your.email@example.com',
  socials: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  prompt: 'yourname@site',
};
```

### Add/Edit Projects

Edit `data/projects.json`:

```json
{
  "projects": [
    {
      "slug": "project-slug",
      "name": "Project Name",
      "tagline": "Short description",
      "stack": ["React", "TypeScript", "Next.js"],
      "year": "2024",
      "role": "Full-Stack Developer",
      "description": "Detailed description...",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ],
      "metrics": [
        "10K+ users",
        "95% satisfaction"
      ],
      "links": {
        "demo": "https://demo.example.com",
        "repo": "https://github.com/you/repo"
      }
    }
  ]
}
```

### Update About Section

Edit `data/about.md` with your bio and highlights (supports Markdown).

### Update Resume

1. Edit `data/resume.md` with your resume content
2. Generate a PDF and place it at `public/resume.pdf`

To generate PDF from Markdown:
```bash
# Using pandoc (install first: brew install pandoc)
pandoc data/resume.md -o public/resume.pdf

# Or use online tools like markdown-pdf.com
```

## 🛠️ Adding New Commands

1. **Create the command handler** in `lib/cli/commands.ts`:

```typescript
export const myCommand: CommandHandler = (args) => {
  return {
    lines: [
      { type: 'success', content: 'Command output!' },
      { type: 'text', content: 'More details...' },
    ],
  };
};
```

2. **Register the command** in `lib/cli/router.ts`:

```typescript
export const commandMap: Record<string, CommandHandler> = {
  // ... existing commands
  mycommand: myCommand,
};
```

3. **Update help text** in the `helpCommand` function in `lib/cli/commands.ts`.

4. **Add tests** in `tests/cli/` directory.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run linting
npm run lint

# Format code
npm run format
```

## 📦 Building for Production

```bash
# Build the static export
npm run build

# The output will be in the 'out' directory
# Test the production build locally
npx serve out
```

## 🚀 Deployment

### GitHub Pages (Recommended)

This project is configured for GitHub Pages deployment via GitHub Actions.

1. **Push to main branch** - The workflow automatically builds and deploys
2. **Enable GitHub Pages** in repo settings (Settings > Pages > Source: GitHub Actions)
3. **Visit your site** at `https://yourusername.github.io`

The deploy workflow (`.github/workflows/deploy.yml`) handles everything automatically.

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Other Platforms

The static export in the `out/` directory can be deployed to:
- Netlify: Drag and drop the `out` folder
- Cloudflare Pages: Connect your repo
- AWS S3 + CloudFront: Upload the `out` folder

## ⚡ Performance & Lighthouse

This portfolio is optimized for Lighthouse scores **95+** across all categories:

### Tips to Maintain High Scores

1. **Images**: Use Next.js Image component (already set to `unoptimized` for static export)
2. **Fonts**: Use `font-display: swap` (already configured with JetBrains Mono)
3. **Bundle Size**: Keep dependencies minimal, use dynamic imports for large features
4. **Accessibility**: Maintain semantic HTML, ARIA labels, keyboard navigation
5. **SEO**: Update metadata in `app/layout.tsx` with your information

### Verify Scores

```bash
# Build production bundle
npm run build

# Serve locally
npx serve out

# Run Lighthouse in Chrome DevTools or
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

Target scores:
- **Performance**: 95-100
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 95-100

## 🎨 Customizing Styles

### Theme Colors

Edit `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}
```

### Terminal Colors

Customize syntax highlighting in `app/globals.css`:

```css
.prose-invert h1 {
  @apply text-cyan-400; /* Change to your color */
}
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vitest](https://vitest.dev/) - Unit testing framework
- [Zod](https://zod.dev/) - TypeScript-first validation

## 📧 Questions?

If you have questions about using this template, feel free to open an issue!

---

**Built with ❤️ by Grace Xu**
