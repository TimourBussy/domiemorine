import {getIcon} from '../../../sanity/lib/iconsRegistry'
import type {ISocialLink} from '../hooks/usePages'

export function SocialLinks({links}: {links: ISocialLink[]}) {
  return (
    <div className="flex gap-6 flex-wrap">
      {links.map((link, index) => {
        const IconComponent = getIcon(link.icon)
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {IconComponent ? (
              <IconComponent className="w-6 h-6" />
            ) : (
              <span>{link.name}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}
