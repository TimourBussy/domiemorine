import {useSettings} from '../hooks/usePages'
import {useTranslation} from 'react-i18next'
import {getIcon} from '../../../sanity/lib/iconsRegistry'

export function EnsemblePage({slug}: {slug: string}) {
  const settings = useSettings()
  const {i18n} = useTranslation()

  const ensemble = settings?.ensembles?.find((e) => e.slug.current === slug)

  if (!ensemble) return <div className="flex-1" />

  return (
    <main className="flex-1 max-w-4xl mx-auto px-6 mt-16 mb-16 flex flex-col gap-12">
      <h2 className="text-4xl font-semibold text-center">{ensemble.name}</h2>

      <img
        src={ensemble.image.asset.url}
        alt={ensemble.name}
        className="w-full object-cover rounded-lg"
      />

      {ensemble.desc && (
        <p className="text-gray-700 text-lg leading-relaxed">
          {i18n.language === 'FR' ? ensemble.desc.FR : ensemble.desc.EN}
        </p>
      )}

      {ensemble.socialMedias?.length && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            {i18n.language === 'FR' ? "Suivez l'ensemble" : 'Follow the ensemble'}
          </h3>
          <div className="flex flex-col gap-3">
            {ensemble.socialMedias.map((social, index) => {
              const IconComponent = getIcon(social.icon)
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  className="flex items-center gap-3 hover:text-amber-700 transition-colors"
                >
                  {IconComponent && <IconComponent size={24} />}
                  <span>{social.name}</span>
                </a>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}
