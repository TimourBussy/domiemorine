import {useSettings} from '../hooks/usePages'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

export function Ensembles() {
  const settings = useSettings()
  const {i18n} = useTranslation()

  if (!settings?.ensembles?.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {settings.ensembles.map((ensemble) => (
        <Link
          key={ensemble.slug.current}
          to={`/ensembles/${ensemble.slug.current}`}
          className="flex flex-col items-center gap-3 group"
        >
          <img
            src={ensemble.image.asset.url}
            alt={ensemble.name}
            className="w-full object-cover rounded-lg group-hover:opacity-90 transition-opacity"
          />
          <h3 className="text-xl font-semibold">{ensemble.name}</h3>
          {ensemble.previewDesc && (
            <p className="text-gray-600 text-center">
              {i18n.language === 'FR' ? ensemble.previewDesc.FR : ensemble.previewDesc.EN}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
