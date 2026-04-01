import {tv} from 'tailwind-variants'

const paragraphStyle = tv({
  base: 'text-gray-700 text-center whitespace-pre-wrap',
  variants: {
    size: {
      small: 'text-sm',
      large: 'text-lg',
    },
  },
})

export function Paragraph({
  size = 'small',
  children,
}: {
  size?: 'small' | 'large'
  children: string
}) {
  return <p className={paragraphStyle({size})}>{children}</p>
}
