import {useTranslation} from 'react-i18next'
import {usePage} from '../hooks/usePages'
import {HeroImage} from '../ui/HeroImage'
import {Block} from '../ui/Block'

export function Page({slug}: {slug: string}) {
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

      <div className="max-w-4xl mx-auto px-6 mt-16 flex flex-col gap-16">
        {page.body?.map((block) => (
          <Block key={block._key} block={block} />
        ))}
      </div>
    </main>
  )
}
