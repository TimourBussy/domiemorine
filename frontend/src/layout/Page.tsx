import {useTranslation} from 'react-i18next'
import {usePage} from '../hooks/usePages'
import {HeroImage} from '../ui/HeroImage'
import {Title} from '../ui/Title'
import {Paragraph} from '../ui/Paragraph'
import {CardMenu} from '../ui/CardMenu'
import {Group} from '../ui/Group'

export default function Page({slug}: {slug: string}) {
  const page = usePage(slug)
  const {i18n} = useTranslation()

  if (!page) return null

  return (
    <main className="flex flex-col mb-16">
      {page.heroImage?.src?.asset?.url && (
        <HeroImage
          src={page.heroImage.src.asset.url}
          alt={(i18n.language === 'FR' ? page.heroImage.altFr : page.heroImage.altEn) || ''}
        />
      )}

      <div className="mx-86 mt-16 flex flex-col gap-16">
        {page.body?.map((block) => {
          if (block._type === 'group')
            return (
              <Group
                key={block._key}
                blocks={block.blocks}
                marginTop={block.marginTop}
                marginBottom={block.marginBottom}
              />
            )
          else if (block._type === 'title')
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
      </div>
    </main>
  )
}
