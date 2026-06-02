import { Icons } from '@/components/icons/icons'
import type { Skill } from '@/types'

const base = '/images/tech-stack'
const s = (file: string) => `${base}/${file}`
const t = (light: string, dark: string) => ({ light: s(light), dark: s(dark) })

export const skills: Skill[] = [
  {
    id: 1,
    Icon: Icons.globe,
    title: 'Frontend Development',
    description:
      'Building responsive web apps with React, Next.js, TypeScript, Tailwind CSS, and shadcn/ui.',
    size: 'sm',
  },
  {
    id: 2,
    Icon: Icons.code,
    title: 'Backend Development',
    description:
      'Creating robust APIs with Node.js, Express, Spring Boot, and Laravel with multiple databases.',
    size: 'sm',
  },
  {
    id: 3,
    Icon: Icons.layers,
    title: 'Full Stack & DevOps',
    description:
      'End-to-end solutions using Docker, Kubernetes, PostgreSQL, MongoDB, and system optimization.',
    size: 'sm',
  },
]

export const technologies = [
  {
    label: 'JavaScript',
    icon: s('javascript.svg'),
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    label: 'TypeScript',
    icon: s('typescript.svg'),
    href: 'https://www.typescriptlang.org',
  },
  { label: 'Java', icon: s('java.svg'), href: 'https://www.java.com' },
  { label: 'PHP', icon: s('php.svg'), href: 'https://www.php.net' },
  {
    label: 'React',
    icon: t('react_light.svg', 'react_dark.svg'),
    href: 'https://react.dev',
  },

  { label: 'Node.js', icon: s('nodejs.svg'), href: 'https://nodejs.org' },
  { label: 'Express', icon: s('express.svg'), href: 'https://expressjs.com' },
  {
    label: 'Spring Boot',
    icon: t('springboot.svg', 'springboot_dark.svg'),
    href: 'https://spring.io/projects/spring-boot',
  },
  { label: 'Laravel', icon: s('laravel.svg'), href: 'https://laravel.com' },
  {
    label: 'PostgreSQL',
    icon: s('postgresql.svg'),
    href: 'https://www.postgresql.org',
  },
  { label: 'MongoDB', icon: s('mongodb.svg'), href: 'https://www.mongodb.com' },
  { label: 'MySQL', icon: s('mysql.svg'), href: 'https://www.mysql.com' },
  { label: 'Redis', icon: s('redis.svg'), href: 'https://redis.io' },
  { label: 'Docker', icon: s('docker.svg'), href: 'https://www.docker.com' },
  {
    label: 'Kubernetes',
    icon: t('kubernetes.svg', 'kubernetes_dark.svg'),
    href: 'https://kubernetes.io',
  },
  { label: 'Git', icon: s('git.svg'), href: 'https://git-scm.com' },
  {
    label: 'GitHub',
    icon: t('github_light.svg', 'github_dark.svg'),
    href: 'https://github.com',
  },
  {
    label: 'VS Code',
    icon: s('vscode.svg'),
    href: 'https://code.visualstudio.com',
  },
  {
    label: 'IntelliJ IDEA',
    icon: s('intellij.svg'),
    href: 'https://www.jetbrains.com/idea/',
  },
  { label: 'Postman', icon: s('postman.svg'), href: 'https://www.postman.com' },
]
