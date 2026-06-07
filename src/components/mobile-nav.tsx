'use client'

import { Presence } from '@radix-ui/react-presence'
import { useSearchContext } from 'fumadocs-ui/contexts/search'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAISearchContext } from '@/components/ai/chat'
import { FloatingPill } from '@/components/mobile-nav/floating-pill'
import { MenuPanel } from '@/components/mobile-nav/menu-panel'
import { useIsMobile } from '@/hooks/use-mobile'

export function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const { setOpenSearch } = useSearchContext()
  const { setOpen: setOpenAI } = useAISearchContext()

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  if (!mounted || !isMobile) return null

  return (
    <>
      <Presence present={menuOpen}>
        <button
          aria-label='Close menu'
          className='fixed inset-0 z-[31] bg-background/50 data-[state=closed]:animate-fd-fade-out data-[state=open]:animate-fd-fade-in'
          data-state={menuOpen ? 'open' : 'closed'}
          onClick={closeMenu}
          type='button'
        />
      </Presence>

      <Presence present={menuOpen}>
        <MenuPanel
          menuOpen={menuOpen}
          onAIChatOpen={() => {
            closeMenu()
            setOpenAI(true)
          }}
          onClose={closeMenu}
        />
      </Presence>

      {createPortal(
        <FloatingPill
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
          onSearchOpen={() => {
            closeMenu()
            setOpenSearch(true)
          }}
        />,
        document.body
      )}
    </>
  )
}
