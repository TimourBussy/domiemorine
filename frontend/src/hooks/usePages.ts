import {useEffect, useState} from 'react'
import sanityClient from '../sanityClient'

export interface ISocialMediaItem {
  name: string
  icon: string
  url: string
}

export interface IEnsembles {
  _type: 'ensembles'
  _key: string
}

export interface IEnsemble {
  name: string
  slug: {current: string}
  image: {asset: {url: string}}
  previewDesc?: {FR?: string; EN?: string}
  desc?: {FR?: string; EN?: string}
  socialMedias?: ISocialMediaItem[]
}

export interface ISchedule {
  _type: 'schedule'
  _key: string
}

export interface IEvent {
  title: {FR: string; EN: string}
  date: string
  time?: string
  location?: string
  link?: string
}

export interface ISettings {
  _id: string
  socialMedias: ISocialMediaItem[]
  navigationMenu?: IMenuItem[]
  ensembles: IEnsemble[]
  schedule?: {events: IEvent[]}
}

export interface IMargins {
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export interface IGroup extends IMargins {
  _type: 'group'
  _key: string
  blocks: (ITitle | IParagraph | ICardMenu | ISocialLinks | IEnsembles | ISchedule)[]
}

export interface ITitle extends IMargins {
  _type: 'title'
  _key: string
  content: {FR: string; EN: string}
  level: 3 | 4 | 5 | 6
  colored: boolean
}

export interface IParagraph extends IMargins {
  _type: 'paragraph'
  _key: string
  content: {FR: string; EN: string}
  size: 'small' | 'large'
}

export interface IImg extends IMargins {
  _type: 'img'
  _key: string
  src: {asset: {url: string}}
  alt?: {FR?: string; EN?: string}
  dimensionType?: 'width' | 'height'
  dimension?: number
}

export interface IButton extends IMargins {
  _type: 'button'
  _key: string
  text: {FR: string; EN: string}
  link: {
    slug: {
      FR: {current: string}
      EN: {current: string}
    }
  }
}

export interface ICardMenuItem {
  title: {FR: string; EN: string}
  description: {FR: string; EN: string}
  destinationPage?: {
    slug: {
      FR: {current: string}
      EN: {current: string}
    }
  }
}

export interface ICardMenu extends IMargins {
  _type: 'cardMenu'
  _key: string
  cards: ICardMenuItem[]
}

export interface ISocialLinks extends IMargins {
  _type: 'socialLinks'
  _key: string
  size: 'small' | 'medium' | 'large'
  colored: boolean
}

export interface Page {
  _id: string
  title: {EN: string; FR: string}
  slug: {
    FR: {current: string}
    EN: {current: string}
  }
  displayTitle?: boolean
  heroImage?: {
    src: {asset: {url: string}}
    altFr?: string
    altEn?: string
  }
  body?: (IGroup | ITitle | IParagraph | IImg | ICardMenu | ISocialLinks | IEnsembles | ISchedule)[]
}

export interface IMenuSubItem {
  _type: 'submenuItem' | 'ensemblesListItem'
  page?: {
    _id: string
    title: {EN: string; FR: string}
    slug: {
      FR: {current: string}
      EN: {current: string}
    }
  }
}

export interface IMenuItem {
  page: {
    _id: string
    title: {EN: string; FR: string}
    slug: {
      FR: {current: string}
      EN: {current: string}
    }
  }
  children?: IMenuSubItem[]
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([])
  useEffect(() => {
    sanityClient.fetch(`*[_type == "page"]{_id, title, slug { FR, EN }}`).then(setPages)
  }, [])
  return pages
}

const MARGINS = 'marginTop, marginRight, marginBottom, marginLeft'

const BLOCK_QUERY = `
  _type, _key,
  _type == "title" => {
    content, level, colored,
    ${MARGINS}
  },
  _type == "paragraph" => {
    content, size,
    ${MARGINS}
  },
  _type == "img" => {
    src{ asset->{ url } }, alt,
    dimensionType, dimension,
    ${MARGINS}
  },
  _type == "button" => {
    text,
    link->{ slug { FR, EN } },
    ${MARGINS}
  },
  _type == "cardMenu" => {
    cards[]{
      title, description,
      destinationPage->{ slug { FR, EN } }
    },
    ${MARGINS}
  },
  _type == "socialLinks" => {
    size, colored,
    ${MARGINS}
  },
  _type == "ensembles" => {
    _type, _key
  },
  _type == "schedule" => {
    _type, _key
  }
`

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null)
  useEffect(() => {
    if (slug === null || slug === undefined) return

    sanityClient
      .fetch(
        `*[_type == "page" && (slug.FR.current == $slug || slug.EN.current == $slug)][0]{
          _id, title, slug { FR, EN },
          heroImage{
            src{ asset->{ url } },
            altFr,
            altEn
          },
          displayTitle,
          body[]{
            ${BLOCK_QUERY},
            _type == "group" => {
              ${MARGINS},
              blocks[]{
                ${BLOCK_QUERY}
              }
            }
          }
        }`,
        {slug},
      )
      .then(setPage)
  }, [slug])
  return page
}

export function useSettings() {
  const [settings, setSettings] = useState<ISettings | null>(null)
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "settings"][0]{
          _id,
          socialMedias[]{name, icon, url},
          navigationMenu[]{
            page->{_id, title, slug},
            children[]{
              _type,
              page->{_id, title, slug}
            }
          },
          ensembles[]{
            name,
            slug,
            image{ asset->{ url } },
            previewDesc,
            desc,
            socialMedias[]{name, icon, url}
          },
          schedule{
            events[]{
              title,
              time,
              date,
              location,
              link
            }
          },
        }`,
      )
      .then(setSettings)
  }, [])
  return settings
}
