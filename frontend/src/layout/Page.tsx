import {useTranslation} from 'react-i18next'
import {usePage} from '../hooks/usePages'
import {HeroImage} from '../ui/HeroImage'
import {TitleAndParagraph} from '../ui/TitleAndParagraph'

export default function Page({slug}: {slug: string}) {
  const page = usePage(slug)
  const {i18n} = useTranslation()

  if (!page) return null

  return (
    <main className="flex flex-col gap-16">
      {page.heroImage?.src?.asset?.url && (
        <HeroImage
          src={page.heroImage.src.asset.url}
          alt={(i18n.language === 'FR' ? page.heroImage.altFr : page.heroImage.altEn) || ''}
        />
      )}

      <div className="mx-102">
        {page.body?.map((block) => {
          if (block._type === 'titleAndParagraph') {
            return (
              <TitleAndParagraph
                key={block._key}
                title={block.title.fr_FR}
                paragraph={block.paragraph.fr_FR}
              />
            )
          }
          return null
        })}
      </div>
    </main>
  )
}
