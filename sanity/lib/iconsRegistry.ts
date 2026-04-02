// Import all icon sets from react-icons
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'

// Combine all icons into a single object
const allIconCollections = {
  ...FaIcons,
  ...FiIcons,
}

// Filter to get only icon components (functions/classes)
export const iconsRegistry = Object.entries(allIconCollections)
  .filter(([, value]) => typeof value === 'function')
  .map(([name]) => name)
  .sort()

export function getIcon(iconName: string) {
  return allIconCollections[iconName as keyof typeof allIconCollections]
}

// Popular icons for social media and web (loaded by default)
export const socialIcons = [
  'FaFacebook',
  'FaFacebookF',
  'FiFacebook',
  'FaInstagram',
  'FaTwitter',
  'FaLinkedin',
  'FaLinkedinIn',
  'FaTiktok',
  'FaYoutube',
  'FaDiscord',
  'FaTwitch',
  'FaVimeo',
  'FaDailymotion',
  'FiGlobe',
]

