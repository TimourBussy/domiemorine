import {useTranslation} from 'react-i18next'

export function Button({
  text,
  link,
}: {
  text?: {FR?: string; EN?: string}
  link?: {slug?: {FR?: {current: string}; EN?: {current: string}}}
}) {
  const {i18n} = useTranslation()

  if (!text || !link?.slug) return null

  return (
    <a
      href={
        i18n.language === 'FR'
          ? link.slug.FR?.current || link.slug.EN?.current
          : link.slug.EN?.current || link.slug.FR?.current
      }
      className="bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors mx-auto"
    >
      {i18n.language === 'FR' ? text.FR || text.EN : text.EN || text.FR}
    </a>
  )
}
