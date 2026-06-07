'use server'

import { getWorkPages } from '@/lib/source'

export interface PageEntry {
  description?: string
  tag: 'projects'
  title: string
  url: string
}

// biome-ignore lint: server action must be async
export async function getPages(): Promise<PageEntry[]> {
  return [
    ...getWorkPages().map((page) => ({
      title: page.data.title ?? 'Untitled',
      url: page.url,
      tag: 'projects' as const,
      description: page.data.description,
    })),
  ]
}
