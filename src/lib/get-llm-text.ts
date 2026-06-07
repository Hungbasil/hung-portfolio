import { format } from 'date-fns'
import { owner, repo } from '@/constants/config'
import type { WorkPage } from '@/lib/source'

type ContentPage = WorkPage
type ContentType = 'work'
interface LLMTextOptions {
  level?: 'page' | 'section' | 'subsection'
}

function getHeadingPrefix(level: 'page' | 'section' | 'subsection') {
  switch (level) {
    case 'page': {
      return '#'
    }
    case 'section': {
      return '##'
    }
    case 'subsection': {
      return '###'
    }
    default: {
      throw new Error(`Unknown heading level: ${level}`)
    }
  }
}

async function getLLMText(
  page: ContentPage,
  contentType: ContentType,
  options: LLMTextOptions = {}
) {
  const level = options.level ?? 'page'
  const processed = await page.data.getText('processed')
  const path = `content/${contentType}/${page.path}`

  return `${getHeadingPrefix(level)} ${page.data.title}
URL: ${page.url}
Source: https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/main/${path}
${page.data.description ?? ''}

${processed}

${page.data.lastModified ? `Last updated on ${format(new Date(page.data.lastModified), 'MMMM d, yyyy')}` : ''}`
}

export async function getWorkLLMText(
  page: WorkPage,
  options: LLMTextOptions = {}
) {
  return await getLLMText(page, 'work', options)
}
