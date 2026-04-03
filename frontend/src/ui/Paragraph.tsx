import {tv} from 'tailwind-variants'

const paragraphStyle = tv({
  base: 'text-gray-700 text-center whitespace-pre-wrap',
  variants: {
    size: {
      medium: 'text-sm sm:text-base',
      large: 'sm:text-lg/7 sm:mx-16',
    },
  },
})

export function Paragraph({
  size = 'medium',
  children,
}: {
  size?: 'medium' | 'large'
  children: string
}) {
  return <p className={paragraphStyle({size})}>{children}</p>
}
