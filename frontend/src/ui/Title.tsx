import {tv} from 'tailwind-variants'
import type {JSX} from 'react'

const titleStyle = tv({
  base: 'text-center font-semibold',
  variants: {
    level: {
      1: 'uppercase [word-spacing:0.75rem] font-light tracking-tight text-4xl sm:text-5xl',
      2: 'text-4xl sm:text-5xl',
      3: 'text-3xl sm:text-4xl',
      4: 'text-2xl sm:text-3xl',
      5: 'text-xl sm:text-2xl',
      6: 'text-lg sm:text-xl',
    },
    colored: {
      true: 'text-amber-700',
    },
  },
})

export function Title({
  level,
  colored = false,
  className,
  children,
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6
  colored?: boolean
  className?: string
  children: string
}) {
  const H = `h${level}` as keyof JSX.IntrinsicElements

  return <H className={titleStyle({level, colored, className})}>{children}</H>
}
