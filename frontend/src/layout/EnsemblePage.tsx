import {useSettings} from '../hooks/usePages'
import {useTranslation} from 'react-i18next'
import {getIcon} from '../../../sanity/lib/iconsRegistry'
import {Title} from '../ui/Title'
import { Paragraph } from '../ui/Paragraph'
import { FiExternalLink } from 'react-icons/fi'

export function EnsemblePage({slug}: {slug: string}) {
  const settings = useSettings()
  const {i18n} = useTranslation()

  const ensemble = settings?.ensembles?.find((e) => e.slug.current === slug)

  if (!ensemble) return <div className="flex-1" />

  return (
    <main className="flex-1 max-w-4xl mx-auto px-8 mt-16 mb-20 flex flex-col gap-12">
      <Title level={2}>{ensemble.name}</Title>

      <img
        src={ensemble.image.asset.url}
        alt={ensemble.name}
        className="mx-auto w-75/100 object-cover rounded-lg"
      />

      {ensemble.desc && (
        <Paragraph size="large">
          {i18n.language === 'FR' ? ensemble.desc.FR : ensemble.desc.EN}
        </Paragraph>
      )}

      {ensemble.socialMedias?.length && (
        <div className="flex flex-col gap-4">
          <Title level={5}>
            {i18n.language === 'FR' ? "Suivez l'ensemble" : 'Follow the ensemble'}
          </Title>
          <div className="flex gap-6 justify-center text-amber-700 hover:text-amber-800">
            {ensemble.socialMedias.map((social, index) => {
              const IconComponent = getIcon(social.icon)
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  className="flex items-center gap-2 transition-colors"
                >
                  {IconComponent && <IconComponent size={20} />}
                  <span>{social.name}</span>
                  <FiExternalLink />
                </a>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}
