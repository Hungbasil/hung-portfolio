import type { Metadata } from 'next'
import { Suspense } from 'react'
import { WebPageJsonLd } from '@/components/json-ld'
import { Section } from '@/components/section'
import {
  SplitSection,
  SplitSectionContent,
  SplitSectionHeader,
  SplitSectionSidebar,
} from '@/components/sections/split-section'
import { ViewAnimation } from '@/components/view-animation'
import { Wrapper } from '@/components/wrapper'
import { createMetadata } from '@/lib/metadata'
import { getSession } from '@/server/auth'
import { getMessageEntries } from '@/server/db/queries/message'
import { MessageEntries } from './_components/entries'
import { MessageForm } from './_components/form'
import { MessageEntriesSkeleton } from './_components/skeleton'

async function MessageEntriesSection() {
  const session = await getSession()
  const currentUserId = session?.user.id ?? null
  const isAdmin = session?.user.role === 'admin'
  const entries = await getMessageEntries(currentUserId)

  return (
    <ViewAnimation
      delay={0.15}
      initial={{ opacity: 0, translateY: 6 }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <MessageEntries
        currentUserId={currentUserId}
        entries={entries}
        isAdmin={isAdmin}
        isSignedIn={Boolean(currentUserId)}
      />
    </ViewAnimation>
  )
}

export default function MessagePage() {
  return (
    <Wrapper>
      <SplitSection>
        <SplitSectionSidebar className='px-6 py-14'>
          <SplitSectionHeader
            description='Please be respectful and considerate when leaving messages. Inappropriate content will be removed.'
            title='Message'
          />
        </SplitSectionSidebar>

        <SplitSectionContent
          className='flex w-full items-center px-6 py-14'
          inset
        >
          <ViewAnimation
            className='w-full'
            delay={0.1}
            initial={{ opacity: 0, translateY: -6 }}
            whileInView={{ opacity: 1, translateY: 0 }}
          >
            <MessageForm />
          </ViewAnimation>
        </SplitSectionContent>
      </SplitSection>
      <Section className='p-6'>
        <ViewAnimation
          delay={0.1}
          initial={{ opacity: 0, translateY: 6 }}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          <h2 className='font-medium text-xl'>Recent Entries</h2>
        </ViewAnimation>
      </Section>
      <Section>
        <Suspense fallback={<MessageEntriesSkeleton />}>
          <MessageEntriesSection />
        </Suspense>
      </Section>
      <WebPageJsonLd
        description='Leave a message and react to messages from other visitors.'
        path='/message'
        title='Message'
      />
    </Wrapper>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return createMetadata({
    title: 'Message',
    description: 'Leave a message and react to messages from other visitors.',
    openGraph: {
      url: '/message',
    },
    alternates: {
      canonical: '/message',
    },
  })
}
