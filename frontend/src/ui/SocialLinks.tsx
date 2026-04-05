import {tv} from 'tailwind-variants'
import {getIcon} from '../../../sanity/lib/iconsRegistry'
import {useSettings} from '../hooks/usePages'

const linkStyle = tv({
  base: 'flex items-center justify-center rounded-full transition-colors',
  variants: {
    colored: {
      true: 'p-4 bg-amber-100 group-hover:bg-amber-200',
    },
  },
})

export function SocialLinks({
  size = 'medium',
  colored = false,
  inFooter = false,
  className,
}: {
  size?: 'small' | 'medium' | 'large'
  colored?: boolean
  inFooter?: boolean
  className?: string
}) {
  const settings = useSettings()

  if (!settings) return null
  if (!settings.socialMedias?.length) return null

  return (
    <article
      className={`flex flex-wrap justify-center text-center gap-6 ${className || ''}`}
    >
      {settings.socialMedias.map((link, index) => {
        const IconComponent = getIcon(link.icon)
        return (
          <a key={index} href={link.url} target="_blank" className="group flex flex-col gap-2">
            <div className={linkStyle({colored})}>
              <IconComponent
                size={
                  {
                    small: 24,
                    medium: 28,
                    large: 32,
                  }[size]
                }
                className={colored ? 'text-amber-700' : (inFooter ? 'text-gray-400 group-hover:text-amber-700' : 'text-gray-800 group-hover:text-amber-500')}
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
