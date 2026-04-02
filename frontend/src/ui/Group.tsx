import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import {CardMenu} from './CardMenu'
import type {ITitle, IParagraph, ICardMenu, IGroup} from '../hooks/usePages'

export function Group({
  blocks,
  marginTop,
  marginBottom,
}: {
  blocks: (ITitle | IParagraph | ICardMenu)[]
  marginTop: number
  marginBottom: number
}) {
  const {i18n} = useTranslation()

  const className = [
    'flex flex-col gap-6',
    marginTop > 0 ? `mt-${marginTop}` : '',
    marginBottom > 0 ? `mb-${marginBottom}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={className}>
      {blocks.map((block) => {
        if (block._type === 'title')
          return (
            <Title key={block._key} level={block.level} colored={block.colored}>
              {i18n.language === 'FR' ? block.content.FR : block.content.EN}
            </Title>
          )
        else if (block._type === 'paragraph')
          return (
            <Paragraph key={block._key} size={block.size}>
              {i18n.language === 'FR' ? block.content.FR : block.content.EN}
            </Paragraph>
          )
        else if (block._type === 'cardMenu')
          return (
            <CardMenu
              key={block._key}
              cards={block.cards.map((card) => ({
                title: i18n.language === 'FR' ? card.title.FR : card.title.EN,
                paragraph: i18n.language === 'FR' ? card.description.FR : card.description.EN,
                to: card.destinationPage?.slug.current || '#',
              }))}
            />
          )
      })}
    </section>
  )
}
