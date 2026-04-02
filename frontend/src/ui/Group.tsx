import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import {CardMenu} from './CardMenu'
import {SocialLinks} from './SocialLinks'
import type {ITitle, IParagraph, ICardMenu, ISocialLinks} from '../hooks/usePages'

export function Group({
  blocks,
  marginTop,
  marginBottom,
}: {
  blocks: (ITitle | IParagraph | ICardMenu | ISocialLinks)[]
  marginTop: number
  marginBottom: number
}) {
  const {i18n} = useTranslation()

  return (
    <section
      className={[
        'flex flex-col gap-6',
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
        else if (block._type === 'socialLinks')
          return (
            <SocialLinks key={block._key} links={block.links} />
          )
      })}
    </section>
  )
}
