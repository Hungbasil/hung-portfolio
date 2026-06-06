import type { IconProps } from '../utils'
import { getSvgSizeProps } from '../utils'

export const ZaloIcon = ({ height, size, width, ...props }: IconProps) => (
  <svg
    fill='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...getSvgSizeProps({ height, size, width })}
    {...props}
  >
    <path d='M12 0C5.37 0 0 4.47 0 10c0 3.14 1.56 5.91 4 7.65V24l6.25-3.13c1.58.3 3.21.47 4.88.47 6.63 0 12-4.47 12-10 0-5.52-5.37-10-12-10zm.5 14.5h-1v-5h1v5zm3-5h1v5h-1v-5zm-6 0h1v5h-1v-5z' />
  </svg>
)
