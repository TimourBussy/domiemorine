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

export interface ISettings {
  _id: string
  socialMedias: ISocialMediaItem[]
  navigationMenu?: IMenuItem[]
  ensembles: IEnsemble[]
}

export interface IGroup {
  _type: 'group'
  _key: string
  blocks: (ITitle | IParagraph | ICardMenu | ISocialLinks | IEnsembles)[]
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export interface ITitle {
  _type: 'title'
  _key: string
  content: {FR: string; EN: string}
  level: 3 | 4 | 5 | 6
  colored: boolean
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export interface IParagraph {
  _type: 'paragraph'
  _key: string
  content: {FR: string; EN: string}
  size: 'small' | 'large'
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export interface IImg {
  _type: 'img'
  _key: string
  src: {asset: {url: string}}
  alt?: {FR?: string; EN?: string}
  dimensionType?: 'width' | 'height'
  dimension?: number
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
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

export interface ICardMenu {
  _type: 'cardMenu'
  _key: string
  cards: ICardMenuItem[]
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export interface ISocialLinks {
  _type: 'socialLinks'
  _key: string
  size: 'small' | 'medium' | 'large'
  colored: boolean
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
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
  body?: (IGroup | ITitle | IParagraph | ICardMenu | ISocialLinks | IEnsembles | IImg)[]
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

const BLOCK_QUERY = `
  _type, _key,
  _type == "title" => {
    content, level, colored,
    marginTop, marginRight, marginBottom, marginLeft
  },
  _type == "paragraph" => {
    content, size,
    marginTop, marginRight, marginBottom, marginLeft
  },
  _type == "img" => {
    src{ asset->{ url } }, alt,
    dimensionType, dimension,
    marginTop, marginRight, marginBottom, marginLeft
  },
  _type == "cardMenu" => {
    cards[]{
      title, description,
      destinationPage->{ slug { FR, EN } }
    },
    marginTop, marginRight, marginBottom, marginLeft
  },
  _type == "socialLinks" => {
    size, colored,
    marginTop, marginRight, marginBottom, marginLeft
  },
  _type == "ensembles" => {
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
              marginTop, marginRight, marginBottom, marginLeft,
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
          }
        }`,
      )
      .then(setSettings)
  }, [])
  return settings
}
