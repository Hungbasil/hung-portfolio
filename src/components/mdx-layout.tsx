import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '@/components/section'
import { SectionBody } from '@/components/section-body'
import { cn } from '@/lib/utils'

interface MdxLayoutProps {
  children: ReactNode
  slug: string
  title: string
  toc?: ComponentProps<typeof InlineTOC>['items']
}

interface InlineTocBlockProps {
  className?: string
  items?: ComponentProps<typeof InlineTOC>['items']
}

export const InlineTocBlock = ({ items, className }: InlineTocBlockProps) =>
  items?.length ? (
    <InlineTOC
      className={cn(
        'rounded-none border-0 border-border border-b border-dashed',
        className
      )}
      items={items}
    />
  ) : (
    <div />
  )

interface MdxContentProps {
  children: ReactNode
  className?: string
  proseClassName?: string
  toc?: ComponentProps<typeof InlineTOC>['items']
}

export const MdxContent = ({
  children,
  toc,
  className,
  proseClassName,
}: MdxContentProps) => (
  <div className={cn('flex min-w-0 flex-1 flex-col gap-4', className)}>
    <InlineTocBlock items={toc} />
    <div
      className={cn(
        'prose prose-zinc dark:prose-invert prose-content min-w-0 flex-1 px-4 text-fd-foreground/90',
        proseClassName
      )}
    >
      {children}
    </div>
  </div>
)

export default function MdxLayout({
  children,
  title,
  toc,
  slug,
}: MdxLayoutProps): ReactNode {
  return (
    <>
      <Section className='p-4 lg:p-6'>
        <h1 className='typography-hero mx-auto text-center font-normal text-3xl leading-tight tracking-tighter md:text-5xl'>
          {title}
        </h1>
      </Section>

      <SectionBody>
        <article className='flex min-h-full flex-col lg:flex-row'>
          <MdxContent toc={toc}>{children}</MdxContent>
        </article>
      </SectionBody>
    </>
  )
}
