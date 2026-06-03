import type React from 'react'
import { HeroSection } from '@/components/sections/hero'

export default function Hero(): React.ReactElement {
  return (
    <HeroSection
      align='center'
      description="Hi, I'm Hưng, a software engineer specializing in building exceptional digital experiences. With a passion for crafting clean and efficient code, I create innovative solutions that solve real-world problems. Welcome to my portfolio!"
      title='About'
      variant='default'
    />
  )
}
