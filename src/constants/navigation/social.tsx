import { Icons } from '@/components/icons/icons'
import type { Social } from '@/types'

export const socials: Social[] = [
  {
    icon: <Icons.github />,
    name: 'GitHub',
    url: 'https://github.com/Hungbasil',
    description: 'Check out my open source projects and repositories',
  },
  {
    icon: <Icons.linkedin />,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/h%C6%B0ng-nguy%E1%BB%85n-44848537b/',
    description: 'Connect with me professionally',
  },
  {
    icon: <Icons.share />,
    name: 'Facebook',
    url: 'https://www.facebook.com/hung.basic.7',
    description: 'Follow me on Facebook',
  },
  {
    name: 'Zalo',
    description: 'Get in touch via Zalo',
    url: 'https://zalo.me/hungbasil',
    icon: <Icons.zalo />,
  },
  {
    icon: <Icons.mail />,
    name: 'Email',
    url: 'mailto:k.hung090804@gmail.com',
    description: 'Get in touch via email',
  },
]
