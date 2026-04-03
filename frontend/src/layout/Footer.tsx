import {useTranslation} from 'react-i18next'
import {SocialLinks} from '../ui/SocialLinks'

export function Footer() {
  const {i18n} = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-300 text-center pt-12 pb-16 mt-12 cursor-default">
      <p className="text-lg mb-2">
        Domi Emorine - {i18n.language === 'FR' ? 'Accordéoniste' : 'Accordionist'}
      </p>
      <p className="text-sm text-gray-400 mb-6">
        © {new Date().getFullYear()} -{' '}
        {i18n.language === 'FR' ? 'Tous droits réservés' : 'All rights reserved'}
      </p>
      <SocialLinks size="small" inFooter />
    </footer>
  )
}
