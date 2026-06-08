import type { Metadata } from 'next'
import { owner, title } from '@/constants/site'
import { env } from '@/env'
import type { WorkPage } from './source/work'

export const baseUrl =
  env.NODE_ENV === 'development' || !env.NEXT_PUBLIC_BASE_URL
    ? new URL('http://localhost:3000')
    : new URL(env.NEXT_PUBLIC_BASE_URL)

export function createMetadata(override: Metadata): Metadata {
  const defaultImage = '/images/og-banner.png'

  return {
    ...override,
    creator: owner,
    publisher: owner,
    icons: {
      icon: '/images/profile.jpg',
      apple: '/images/profile.jpg',
    },
    formatDetection: {
      telephone: false,
      ...override.formatDetection,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
    },
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: baseUrl.href,
      images: defaultImage,
      siteName: title,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@Hungbasic',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: defaultImage,
      ...override.twitter,
    },
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
      ...override.alternates,
    },
  }
}

export function getWorkPageImage(page: WorkPage) {
  const segments = [...page.slugs, 'image.webp']
  return {
    segments,
    url: `/og/work/${segments.join('/')}`,
  }
}
