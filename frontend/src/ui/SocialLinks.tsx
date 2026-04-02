import {tv} from 'tailwind-variants'
import {getIcon} from '../../../sanity/lib/iconsRegistry'
import {useSettings} from '../hooks/usePages'

const linkStyle = tv({
  base: 'flex items-center justify-center rounded-full p-4 transition-colors',
  variants: {
    colored: {
      true: 'bg-amber-100 group-hover:bg-amber-200',
    },
  },
})

export function SocialLinks({
  size = 'medium',
  colored = false,
}: {
  size?: 'small' | 'medium' | 'large'
  colored?: boolean
}) {
  const settings = useSettings()

  if (!settings) return null
  if (!settings.socialMedias?.length) return null

  return (
    <article className="flex gap-6 flex-wrap justify-center text-center">
      {settings.socialMedias.map((link, index) => {
        const IconComponent = getIcon(link.icon)
        return (
          <a key={index} href={link.url} target="_blank" className="group flex flex-col gap-2">
            <div className={linkStyle({colored})}>
              <IconComponent
                size={
                  {
                    small: 16,
                    medium: 24,
                    large: 32,
                  }[size]
                }
                className={colored ? 'text-amber-700' : ''}
              />
            </div>
            {size === 'large' && (
              <span className="text-gray-600 group-hover:text-amber-700 text-sm">{link.name}</span>
            )}
          </a>
        )
      })}
    </article>
  )
}
