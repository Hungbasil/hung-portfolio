<div align="center">
  <h1>Hưng's Portfolio</h1>

  <p>
    A full-stack developer portfolio built with Next.js, Fumadocs, MDX, and shadcn/ui.
    Showcasing projects, blog posts, and skills in web development.
  </p>

  <p>
    <a href="https://hungbasil.dev">Live Site</a>
    ·
    <a href="https://hungbasil.dev/work">Work</a>
    ·
    <a href="https://hungbasil.dev/blog">Blog</a>
    ·
    <a href="https://hungbasil.dev/about">About</a>
  </p>

  <p>
    <a href="https://github.com/Hungbasil/portfolio/blob/main/LICENSE">
      <img alt="License" src="https://img.shields.io/github/license/Hungbasil/portfolio?label=License&style=flat" />
    </a>
    <a href="https://github.com/Hungbasil/portfolio/stargazers">
      <img alt="GitHub stars" src="https://img.shields.io/github/stars/Hungbasil/portfolio?style=flat" />
    </a>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat&logo=nextdotjs" />
    <img alt="Bun" src="https://img.shields.io/badge/Bun-1.3-f9f1e1?style=flat&logo=bun" />
  </p>
</div>

## About

This is my personal portfolio for showcasing full-stack development projects, writing about technology, and sharing my journey as a developer. Built with modern web technologies, it features a clean, minimalist design with typed MDX content, dynamic metadata, search capabilities, and a lightweight contact system.

The project is designed for easy maintenance: content lives in `content/`, UI components in `src/components`, and routes use the Next.js App Router in `src/app`.

## Features

- **Portfolio pages** - Dedicated project showcases with metadata, screenshots, tech stack, GitHub links, and full MDX content.
- **Blog system** - MDX-powered technical writing with tags, RSS feed, syntax highlighting, and auto-generated social images.
- **Search** - Full-text search across all blog posts and work projects.
- **AI-friendly routes** - `/llms.txt`, markdown endpoints, and raw MDX routes for LLM access and indexing.
- **Contact system** - Server-action based contact form with spam protection and email integration.
- **Authentication & Guestbook** - Better Auth with OAuth support, database-backed sessions, comments, reactions, and moderation.
- **SEO optimized** - Sitemap, robots.txt, JSON-LD schema, metadata helpers, canonical URLs, and dynamic OG images.
- **Theme support** - Light and dark mode using `next-themes`, Tailwind CSS v4, and shadcn/ui primitives.

## Tech Stack

- **Framework**: Next.js 16, React 19, TypeScript (strict mode)
- **Styling**: Tailwind CSS v4, shadcn/ui, Radix UI, Motion
- **Content**: Fumadocs MDX, Shiki syntax highlighting, KaTeX, Mermaid diagrams
- **Backend**: Node.js, Express, Spring Boot support
- **Database**: Drizzle ORM, PostgreSQL (Neon), MongoDB
- **Authentication**: Better Auth with Google & GitHub OAuth
- **Email**: React Email templates, Resend service
- **DevTools**: Bun, Ultracite (Biome), CSpell, Lefthook, Drizzle Kit

## Project Structure

```txt
.
├── content/              # Blog posts and work projects in MDX
├── emails/               # React Email templates for notifications
├── public/               # Static assets, images, resume, sitemap
├── scripts/              # Utility scripts for maintenance
├── src/app/              # Next.js App Router routes and APIs
├── src/components/       # Reusable UI, layout, MDX, and sections
├── src/constants/        # Site config, navigation, portfolio data
├── src/lib/              # Content loading, metadata, auth utilities
├── src/server/           # Database schema, auth config, server modules
└── src/styles/           # Global Tailwind CSS and design tokens
```

## Getting Started

### Prerequisites
- Node.js 18+ (or Bun 1.3+)
- PostgreSQL database (for development)

## Content Workflow

- **Blog**: Write posts in `content/blog` with MDX and frontmatter
- **Projects**: Create project pages in `content/work` with descriptions and tech stack
- **Types**: Run `bun run typegen` after modifying content schemas
- **Metadata**: Use frontmatter for titles, descriptions, dates, tags, images, and links


## Deployment

This portfolio is optimized for deployment on **Vercel**:

1. Push to GitHub
2. Import repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on each push

For other platforms, ensure:
- Node.js 18+ runtime
- PostgreSQL database
- Environment variables configured
- `bun run build` works locally

## License

Licensed under the [MIT license](./LICENSE).
