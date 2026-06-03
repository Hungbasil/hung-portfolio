import { createSearchAPI } from 'fumadocs-core/search/server'
import { getWorkPages } from '@/lib/source'

export const { GET } = createSearchAPI('advanced', {
  indexes: [
    ...getWorkPages().map((page) => ({
      title: page.data.title ?? 'Untitled',
      description: page.data.description,
      structuredData: page.data.structuredData,
      id: page.url,
      url: page.url,
      tag: 'projects',
    })),
  ],
})
