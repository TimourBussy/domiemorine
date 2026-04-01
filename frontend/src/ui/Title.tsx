import {tv} from 'tailwind-variants'
import type {JSX} from 'react'

const titleStyle = tv({
  base: 'text-center font-semibold',
  variants: {
    level: {
      1: 'text-5xl',
      2: 'text-4xl',
      3: 'text-xl',
    },
    colored: {
      true: 'text-amber-700',
    },
    defaultVariants: {
      colored: false,
    },
  },
})

export function Title({
  level,
  colored = false,
  className,
  children,
}: {
  level: 1 | 2 | 3
  colored?: boolean
  className?: string
  children: string
}) {
  const H = `h${level}` as keyof JSX.IntrinsicElements

  return <H className={titleStyle({level, colored, className})}>{children}</H>
}
