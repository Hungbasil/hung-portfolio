import {
  getAboutText,
  getColophonText,
  getExperienceText,
  getSkillsText,
  getTestimonialsText,
  getUsesText,
} from '@/app/(llms)/utils'
import { getCommitHistoryText } from '@/app/(llms)/utils/github-commits'
import { description, title } from '@/constants/site'
import { getSortedByDateWork } from '@/lib/source'
import { url } from '@/lib/url'

export async function getLLMsTxt() {
  const allWork = getSortedByDateWork()
  const commitHistory = await getCommitHistoryText()

  return `# ${title}
> ${description}

${getAboutText()}
${commitHistory}

${getExperienceText()}

${getSkillsText()}

${getTestimonialsText()}

${getUsesText()}

${getColophonText()}

## Work

${allWork
  .map(
    (item) =>
      `- [${item.data.title}](${url(['work.mdx', ...item.slugs])}): ${item.data.description ?? 'Project showcase'}`
  )
  .join('\n')}
`
}
