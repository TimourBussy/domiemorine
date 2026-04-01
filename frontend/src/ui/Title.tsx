import {tv} from 'tailwind-variants'
import type {JSX} from 'react'

const headingStyle = tv({
  base: 'text-center',
  variants: {
    level: {
      1: 'text-5xl font-semibold',
      2: 'text-4xl font-semibold',
    },
  },
})

export function Title({
  level,
  className,
  children,
}: {
  level: 1 | 2
  className?: string
  children: string
}) {
  const H = `h${level}` as keyof JSX.IntrinsicElements

  return <H className={headingStyle({level, className})}>{children}</H>
}
