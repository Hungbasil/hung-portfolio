import type { HardwareItem, SoftwareItem } from '@/types'

const hw = (file: string) => `/images/uses/hardware/${file}`
const sw = (file: string) => `/images/uses/software/${file}`
const swt = (light: string, dark: string) => ({
  light: sw(light),
  dark: sw(dark),
})

// Hardware
export const hardware: HardwareItem[] = [
  {
    name: 'Lenovo Legion R7000',
    description: 'Ryzen 7-8745H, 16GB RAM, 512GB SSD',
    url: 'https://thegioiso365.vn/san-pham/new-100-lenovo-legion-5-r7000-2024-15ahp9-ryzen-7-8745h-16gb-512gb-rtx-4050-6gb-15-6-fhd-144hz/',
    image: hw('lenovolegion.jpg'),
  },
  {
    name: 'DAREU EM901X',
    description: 'Cổng USB, Không dây, Wireless, Bluetooth, Có dây, RGB',
    url: 'https://dareu.com.vn/chuot-khong-day-gaming-dareu-em901x-rgb-superlight-fast-charing-dock/',
    image: hw('dareu.png'),
  },
  {
    name: 'DAREU EK884',
    description: 'Black, RGB Mechanical Keyboard, Blue Switches',
    url: 'https://dareu.com.vn/ban-phim-co-gaming-dareu-ek884-84key-rgb-blue-brown-red-d-switch/',
    image: hw('keyboard.jpg'),
  },
  {
    name: 'Vivo iQOO Neo 10',
    description:
      'A gaming Phone with a 144Hz AMOLED display, Snapdragon 8 Gen 3, and 120W fast charging.',
    url: 'https://mobilecity.vn/dien-thoai/vivo-iqoo-neo-10.html',
    image: hw('iqoo10.jpeg'),
  },
  {
    name: 'Goojodoq hub USB-C 11 in 1',
    description: 'HUB Dock expand for Laptop Dell HP MacBook Pro Type-C',
    url: 'https://shopee.vn/GOOJODOQ-11-trong-1-USB-C-HUB-Dock-m%E1%BB%9F-r%E1%BB%99ng-cho-Laptop-Dell-HP-MacBook-Pro-Type-C-v%E1%BB%9Bi-HDMI-PD-3.0-USB-RJ45-VGA-PD-AUX-khe-c%E1%BA%AFm-th%E1%BA%BB-TF-%C4%91%E1%BA%A7u-%C4%91%E1%BB%8Dc-th%E1%BA%BB-SD-i.196261835.44658293780',
    image: hw('goojdoq.jpeg'),
  },
]

// Software and services
export const software: SoftwareItem[] = [
  {
    name: '1Password',
    description: 'Password manager',
    logo: swt('1password-light.svg', '1password-dark.svg'),
    url: 'https://1password.com',
    featured: true,
  },
  {
    name: 'Claude Code',
    description: 'AI coding assistant',
    logo: sw('claude.svg'),
    url: 'https://www.anthropic.com/claude-code',
    featured: true,
  },
  {
    name: 'Spotify',
    description: 'Music streaming',
    logo: sw('spotify.svg'),
    url: 'https://spotify.com',
  },
  {
    name: 'Visual Studio Code',
    description: 'Code editor',
    logo: sw('vscode.svg'),
    url: 'https://code.visualstudio.com',
    featured: true,
  },
  {
    name: 'OpenCode',
    description: 'Coding assistant',
    logo: swt('opencode-light.svg', 'opencode-dark.svg'),
    url: 'https://opencode.ai',
  },
  {
    name: 'Vercel',
    description: 'Deployment platform',
    logo: swt('vercel-light.svg', 'vercel-dark.svg'),
    url: 'https://vercel.com',
    featured: true,
  },
  {
    name: 'GitHub Actions',
    description: 'CI/CD automation',
    logo: swt('github-light.svg', 'github-dark.svg'),
    url: 'https://github.com/features/actions',
  },
  {
    name: 'Figma',
    description: 'Design tool',
    logo: sw('figma.svg'),
    url: 'https://figma.com',
    featured: true,
  },
]
