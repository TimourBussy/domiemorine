import {useSettings} from '../hooks/usePages'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {Title} from './Title'
import { Paragraph } from './Paragraph'

export function Ensembles() {
  const settings = useSettings()
  const {i18n} = useTranslation()

  if (!settings?.ensembles?.length) return null

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 -mx-12">
      {settings.ensembles.map((ensemble) => (
        <Link
          key={ensemble.slug.current}
          to={`/ensembles/${ensemble.slug.current}`}
          className="flex flex-col gap-3 group"
        >
          <div className="w-full h-80 overflow-hidden rounded-lg">
            <img
              src={ensemble.image.asset.url}
              alt={ensemble.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <Title level={4} align="left" className='group-hover:text-amber-700 transition-colors'>
            {ensemble.name}
          </Title>
          {ensemble.previewDesc && (
            <Paragraph align="left" className="text-gray-600">
              {i18n.language === 'FR' ? ensemble.previewDesc.FR : ensemble.previewDesc.EN}
            </Paragraph>
          )}
        </Link>
      ))}
    </section>
  )
}
