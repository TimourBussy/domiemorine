import {useTranslation} from 'react-i18next'
import {usePage} from '../hooks/usePages'
import {HeroImage} from '../ui/HeroImage'
import {TitleAndParagraph} from '../ui/TitleAndParagraph'
import {CardMenu} from '../ui/CardMenu'

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

      <div className="mx-102 mt-16">
        {page.body?.map((block) => {
          if (block._type === 'titleAndParagraph')
            return (
              <TitleAndParagraph
                key={block._key}
                title={block.title.fr_FR}
                paragraph={block.paragraph.fr_FR}
              />
            )
          else if (block._type === 'cardMenu')
            return (
              <CardMenu
                key={block._key}
                cards={block.cards.map((card) => ({
                  title: card.title.fr_FR,
                  paragraph: card.description.fr_FR,
                  to: card.destinationPage?.slug.current || '#',
                }))}
              />
            )
        })}
      </div>
    </main>
  )
}
