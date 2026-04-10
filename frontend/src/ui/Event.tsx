import {useTranslation} from 'react-i18next'
import {Title} from './Title'
import {FiClock, FiExternalLink, FiMapPin} from 'react-icons/fi'

export function Event({
  index,
  title,
  date,
  time,
  location,
  link,
  colored = true,
}: {
  index: number
  title: {FR: string; EN: string}
  date: string
  time?: string
  location?: string
  link?: string
  colored?: boolean
}) {
  const {i18n} = useTranslation()

  return (
    <article
      key={index}
      className={`flex flex-col gap-2 border-l-4 ${colored ? 'border-amber-700' : 'border-gray-400'} px-6 py-4`}
    >
      <div className="flex gap-4 font-semibold text-gray-900">
        <p className={colored ? "text-amber-700" : "text-slate-500"}>
          {new Intl.DateTimeFormat(i18n.language === 'FR' ? 'fr-FR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(date))}
        </p>
        <Title level={5} className={!colored ? "text-gray-500" : ""}>
          {i18n.language === 'FR' ? title?.FR : title?.EN}
        </Title>
      </div>
      {(location || time) && (
        <div className="text-gray-600 flex flex-col gap-1">
          {location && (
            <div className="flex items-center gap-2">
              <FiMapPin />
              <p className="mr-4">{location}</p>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-2">
              <FiClock />
              <p className="mr-4">{time}</p>
            </div>
          )}
        </div>
      )}

      {link && (
        <div className={`flex items-center gap-2 text-white ${colored ? 'bg-amber-700 hover:bg-amber-800' : 'bg-zinc-400 hover:bg-zinc-500'} size-fit px-4 py-2 rounded-xl transition-all text-sm mt-1`}>
          <a
            href={
              link.startsWith('http://') || link.startsWith('https://') ? link : `https://${link}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.language === 'FR' ? 'En savoir plus' : 'Learn more'}
          </a>
          <FiExternalLink size={16} />
        </div>
      )}
    </article>
  )
}
