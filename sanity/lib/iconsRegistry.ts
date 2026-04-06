// Import all icon sets from react-icons
import * as FiIcons from 'react-icons/fi'

// Combine all icons into a single object
const ALL_ICON_COLLECTIONS = {
  ...FiIcons,
}

// Filter to get only icon components (functions/classes)
export const iconsRegistry = Object.entries(ALL_ICON_COLLECTIONS)
  .filter(([, value]) => typeof value === 'function')
  .map(([name]) => name)
  .sort()

export function getIcon(iconName: string) {
  return ALL_ICON_COLLECTIONS[iconName as keyof typeof ALL_ICON_COLLECTIONS]
}

// Popular icons for social media and web (loaded by default)
export const socialIcons = [
  'FiFacebook',
  'FiInstagram',
  'FiTwitter',
  'FiLinkedin',
  'FiYoutube',
  'FiTwitch',
  'FiGlobe',
]
