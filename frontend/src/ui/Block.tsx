import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import {CardMenu} from './CardMenu'
import {SocialLinks} from './SocialLinks'
import {Group, MARGIN_CLASSES} from './Group'
import type {ITitle, IParagraph, ICardMenu, ISocialLinks, IGroup} from '../hooks/usePages'

export type TBlock = ITitle | IParagraph | ICardMenu | ISocialLinks | IGroup

export function Block({block}: {block: TBlock}) {
  const {i18n} = useTranslation()

  if (
    'marginTop' in block &&
    'marginBottom' in block &&
    'marginLeft' in block &&
    'marginRight' in block
  ) {
    const marginClasses = [
      block.marginTop && MARGIN_CLASSES.mt[block.marginTop],
      block.marginBottom && MARGIN_CLASSES.mb[block.marginBottom],
      block.marginLeft && MARGIN_CLASSES.ml[block.marginLeft],
      block.marginRight && MARGIN_CLASSES.mr[block.marginRight],
    ]
      .filter(Boolean)
      .join(' ')

    if (block._type === 'group')
      return (
        <Group
          key={block._key}
          blocks={block.blocks}
          marginTop={block.marginTop}
          marginRight={block.marginRight}
          marginBottom={block.marginBottom}
          marginLeft={block.marginLeft}
        />
      )
    else if (block._type === 'title')
      return (
        <Title key={block._key} level={block.level} colored={block.colored} className={marginClasses}>
          {i18n.language === 'FR' ? block.content.FR : block.content.EN}
        </Title>
      )
    else if (block._type === 'paragraph')
      return (
        <Paragraph key={block._key} size={block.size} className={marginClasses}>
          {i18n.language === 'FR' ? block.content.FR : block.content.EN}
        </Paragraph>
      )
    else if (block._type === 'cardMenu')
      return (
        <CardMenu
          key={block._key}
          className={marginClasses}
          cards={block.cards.map((card) => ({
            title: i18n.language === 'FR' ? card.title.FR : card.title.EN,
            paragraph: i18n.language === 'FR' ? card.description.FR : card.description.EN,
            to: card.destinationPage?.slug.FR?.current || '#',
          }))}
        />
      )
    else if (block._type === 'socialLinks')
      return (
        <SocialLinks key={block._key} size={block.size} colored={block.colored} className={marginClasses} />
      )
  }

  return null
}
