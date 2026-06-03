'use client'

import dynamic from 'next/dynamic'

// Dynamic import BotIdClient to avoid script tag rendering during SSR
const BotIdClient = dynamic(
  () => import('botid/client').then((mod) => mod.BotIdClient),
  {
    ssr: false,
  }
)

export function BotId() {
  return (
    <BotIdClient
      protect={[
        {
          path: '/*',
          method: 'POST',
        },
      ]}
    />
  )
}
