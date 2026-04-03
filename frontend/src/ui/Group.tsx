import {Block} from './Block'
import type {TBlock} from './Block'
export function Group({
  blocks,
  marginTop,
  marginBottom,
}: {
  blocks: TBlock[]
  marginTop: number
  marginBottom: number
}) {
  return (
    <section
      className={[
        'flex flex-col gap-4 sm:gap-6',
        {
          0: '',
          4: 'mt-4',
          8: 'mt-8',
          12: 'mt-12',
          16: 'mt-16',
          20: 'mt-20',
          24: 'mt-24',
        }[marginTop],
        {
          0: '',
          4: 'mb-4',
          8: 'mb-8',
          12: 'mb-12',
          16: 'mb-16',
          20: 'mb-20',
          24: 'mb-24',
        }[marginBottom],
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
