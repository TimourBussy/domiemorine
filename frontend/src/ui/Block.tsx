import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {Paragraph} from './Paragraph'
import {CardMenu} from './CardMenu'
import {SocialLinks} from './SocialLinks'
import {Group, MARGIN_CLASSES} from './Group'
import type {
  ITitle,
  IParagraph,
  ICardMenu,
  ISocialLinks,
  IGroup,
  IEnsembles,
  IImg,
} from '../hooks/usePages'
import {Ensembles} from './Ensembles'
import {Image} from './Image'

export type TBlock = IGroup | ITitle | IParagraph | IImg | ICardMenu | ISocialLinks | IEnsembles

export function Block({block}: {block: TBlock}) {
  const {i18n} = useTranslation()

  const marginClasses = [
    'marginTop' in block && block.marginTop && MARGIN_CLASSES.mt[block.marginTop],
    'marginBottom' in block && block.marginBottom && MARGIN_CLASSES.mb[block.marginBottom],
    'marginLeft' in block && block.marginLeft && MARGIN_CLASSES.ml[block.marginLeft],
    'marginRight' in block && block.marginRight && MARGIN_CLASSES.mr[block.marginRight],
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
  else if (block._type === 'img')
    return (
      <Image
        key={block._key}
        src={block.src.asset.url}
        alt={i18n.language === 'FR' ? block.alt?.FR || '' : block.alt?.EN || ''}
        width={block.dimensionType === 'width' ? block.dimension : undefined}
        height={block.dimensionType === 'height' ? block.dimension : undefined}
      />
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
      <SocialLinks
        key={block._key}
        size={block.size}
        colored={block.colored}
        className={marginClasses}
      />
    )
  else if (block._type === 'ensembles') return <Ensembles key={block._key} />

  return null
}
