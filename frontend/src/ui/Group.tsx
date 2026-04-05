import {Block} from './Block'
import type {TBlock} from './Block'

export const MARGIN_CLASSES: Record<string, Record<number, string>> = {
  mt: {4: 'mt-4', 8: 'mt-8', 12: 'mt-12', 16: 'mt-16', 20: 'mt-20', 24: 'mt-24'},
  mb: {4: 'mb-4', 8: 'mb-8', 12: 'mb-12', 16: 'mb-16', 20: 'mb-20', 24: 'mb-24'},
  ml: {4: 'ml-4', 8: 'ml-8', 12: 'ml-12', 16: 'ml-16', 20: 'ml-20', 24: 'ml-24'},
  mr: {4: 'mr-4', 8: 'mr-8', 12: 'mr-12', 16: 'mr-16', 20: 'mr-20', 24: 'mr-24'},
}

export function Group({
  blocks,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}: {
  blocks: TBlock[]
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}) {
  return (
    <section
      className={[
        'flex flex-col gap-4 sm:gap-6',
        marginTop && MARGIN_CLASSES.mt[marginTop],
        marginBottom && MARGIN_CLASSES.mb[marginBottom],
        marginLeft && MARGIN_CLASSES.ml[marginLeft],
        marginRight && MARGIN_CLASSES.mr[marginRight],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {blocks.map((block) => (
        <Block key={block._key} block={block} />
      ))}
    </section>
  )
}
