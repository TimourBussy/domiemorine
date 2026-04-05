import {useEffect, useState} from 'react'
import sanityClient from '../sanityClient'

export interface ISocialMediaItem {
  name: string
  icon: string
  url: string
}

export interface ISettings {
  _id: string
  socialMedias: ISocialMediaItem[]
}

export interface IGroup {
  _type: 'group'
  _key: string
  blocks: (ITitle | IParagraph | ICardMenu | ISocialLinks)[]
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export interface ITitle {
  _type: 'title'
  _key: string
  content: {
    FR: string
    EN: string
  }
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
  content: {
    FR: string
    EN: string
  }
  size: 'small' | 'large'
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export interface ICardMenuItem {
  title: {
    FR: string
    EN: string
  }
  description: {
    FR: string
    EN: string
  }
  destinationPage?: {
    slug: {
      FR: {
        current: string
      }
      EN: {
        current: string
      }
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
  order?: number
  title: {
    EN: string
    FR: string
  }
  slug: {
    FR: {
      current: string
    }
    EN: {
      current: string
    }
  }
  displayTitle?: boolean
  heroImage?: {
    src: {
      asset: {
        url: string
      }
    }
    altFr?: string
    altEn?: string
  }
  body?: (ITitle | IParagraph | ICardMenu | IGroup | ISocialLinks)[]
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([])
  useEffect(() => {
    sanityClient.fetch(`*[_type == "page"]|order(order asc, _createdAt asc){_id, order, title, slug { FR, EN }}`).then(setPages)
  }, [])
  return pages
}

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null)
  useEffect(() => {
    // Ne pas fetcher si slug n'existe pas (sauf "" qui est valide)
    if (slug === null || slug === undefined) {
      return
    }

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
            _type,
            _key,
            _type == "title" => {
              content,
              level,
              colored,
              marginTop,
              marginRight,
              marginBottom,
              marginLeft
            },
            _type == "paragraph" => {
              content,
              size,
              marginTop,
              marginRight,
              marginBottom,
              marginLeft
            },
            _type == "cardMenu" => {
              cards[]{
                title,
                description,
                destinationPage->{ slug { FR, EN } }
              },
              marginTop,
              marginRight,
              marginBottom,
              marginLeft
            },
            _type == "socialLinks" => {
              size,
              colored,
              marginTop,
              marginRight,
              marginBottom,
              marginLeft
            },
            _type == "group" => {
              marginTop,
              marginRight,
              marginBottom,
              marginLeft,
              blocks[]{
                _type,
                _key,
                _type == "title" => {
                  content,
                  level,
                  colored,
                  marginTop,
                  marginRight,
                  marginBottom,
                  marginLeft
                },
                _type == "paragraph" => {
                  content,
                  size,
                  marginTop,
                  marginRight,
                  marginBottom,
                  marginLeft
                },
                _type == "cardMenu" => {
                  cards[]{
                    title,
                    description,
                    destinationPage->{ slug { FR, EN } }
                  },
                  marginTop,
                  marginRight,
                  marginBottom,
                  marginLeft
                },
                _type == "socialLinks" => {
                  size,
                  colored,
                  marginTop,
                  marginRight,
                  marginBottom,
                  marginLeft
                }
              }
            }
          }
        }`,
        {slug},
      )
      .then((data) => {
        setPage(data)
      })
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
          socialMedias[]{
            name,
            icon,
            url
          }
        }`,
      )
      .then(setSettings)
  }, [])
  return settings
}
