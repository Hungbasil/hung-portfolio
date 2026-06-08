import { ImageResponse } from '@takumi-rs/image-response'
import { generate, getImageResponseOptions } from '@/app/banner.png/og'

export const GET = async (): Promise<ImageResponse> =>
  new ImageResponse(
    generate({
      title: 'Nguyen Khai Hung',
      subtitle: 'Software Engineer | Problem Solver | Passionate Developer',
    }),
    await getImageResponseOptions()
  )
