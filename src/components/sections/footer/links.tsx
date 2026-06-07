import { resolveLinkItems } from 'fumadocs-ui/layouts/shared'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ActiveLink } from '@/components/active-link'
import { Icons } from '@/components/icons/icons'
import { ViewAnimation } from '@/components/view-animation'
import { linkItems, socials } from '@/constants/navigation'
import { baseOptions } from '@/constants/site'
import { getSortedByDateWork } from '@/lib/source'

interface ListItem {
  external?: boolean
  href?: string
  icon?: ReactNode
  items: {
    href: string
    children: ReactNode
    external?: boolean
  }[]
  title: string
}

export const Links = () => {
  const links = resolveLinkItems({
    links: linkItems,
    githubUrl: baseOptions.githubUrl,
  })
  const navItems = links.filter((item) =>
    ['nav', 'all'].includes(item.on ?? 'all')
  )

  const works = getSortedByDateWork()

  const lists: ListItem[] = [
    {
      title: 'Navigate',
      icon: <Icons.home className='size-4' />,
      items: [
        { href: '/', children: 'Home' },
        ...navItems
          .filter(
            (item) =>
              item.type !== 'menu' &&
              item.type !== 'custom' &&
              item.type !== 'icon'
          )
          .map((item) => ({
            href: item.url,
            children: item.text,
          })),
      ],
    },
    {
      title: 'More',
      icon: <Icons.moreHorizontal className='size-4' />,
      items: [
        { href: '/uses', children: 'Uses' },
        { href: '/colophon', children: 'Colophon' },
      ],
    },
    {
      title: 'Work',
      icon: <Icons.work className='size-4' />,
      items: works.slice(0, 5).map((work) => ({
        href: work.url,
        children: work.data.title,
      })),
    },
    {
      title: 'Socials',
      icon: <Icons.share className='size-4' />,
      items: socials.map((social) => ({
        href: social.url,
        external: true,
        children: (
          <span className='inline-flex items-center gap-1.5 [&_svg]:size-4'>
            {social.icon}
            {social.name}
          </span>
        ),
      })),
    },
  ]

  return (
    <div className='grid grid-cols-2 gap-8 text-muted-foreground text-sm sm:grid-cols-4 sm:gap-12'>
      {lists.map((list, index) => (
        <ViewAnimation
          className='flex flex-col gap-4 sm:gap-5'
          delay={0.05 * index}
          initial={{ opacity: 0, translateY: 8 }}
          key={list.title}
          whileInView={{ opacity: 1, translateY: 0 }}
        >
          {/* Header with icon */}
          <div className='flex items-center gap-2'>
            {list.icon && (
              <div className='flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'>
                {list.icon}
              </div>
            )}
            <div className='font-semibold text-foreground text-sm tracking-tight'>
              {list.href ? (
                <Link
                  className='transition-colors hover:text-primary'
                  href={list.href}
                >
                  {list.title}
                </Link>
              ) : (
                <p>{list.title}</p>
              )}
            </div>
          </div>

          {/* Items list */}
          <ul className='flex flex-col gap-2.5 sm:gap-3'>
            {list.items.map((item) => (
              <li key={item.href}>
                <ActiveLink
                  className='inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-foreground'
                  href={item.href}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  target={item.external ? '_blank' : undefined}
                >
                  {item.children}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </ViewAnimation>
      ))}
    </div>
  )
}
