import Link from 'next/link'
import { Icons } from '@/components/icons/icons'
import { Prose } from '@/components/prose'
import { SectionHeader } from '@/components/sections/section-header'
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionSidebar,
} from '@/components/sections/split-section'
import { buttonVariants } from '@/components/ui/button'
import { ViewAnimation } from '@/components/view-animation'
import { cn } from '@/lib/utils'

export default function About(): React.ReactElement {
  return (
    <SplitSection>
      <SplitSectionSidebar>
        <SectionHeader align='left' title='About Me' />
      </SplitSectionSidebar>

      <SplitSectionContent inset>
        <ViewAnimation
          className='relative'
          delay={0.1}
          initial={{ opacity: 0, translateY: -6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <div className='space-y-4'>
            <Prose className='typography-body w-full space-y-4'>
              <p className='text-lg'>
                I'm Hưng, a full-stack developer passionate about building
                scalable systems and solving complex technical challenges.
              </p>
              <p className='text-lg'>
                My stack includes React, Next.js, TypeScript, Node.js, Spring
                Boot, PostgreSQL, and MongoDB. I specialize in high-concurrency
                systems, real-time applications, and cloud architecture. I also
                build open-source projects like CRM Chat Services and learning
                platforms.
              </p>
            </Prose>
            <Link
              className={cn(
                buttonVariants({
                  variant: 'link',
                  size: 'lg',
                }),
                '!p-0 h-fit'
              )}
              href='/about'
            >
              Learn More
              <Icons.arrowRight className='icon-arrow-button size-4' />
            </Link>
          </div>
        </ViewAnimation>
      </SplitSectionContent>
    </SplitSection>
  )
}
