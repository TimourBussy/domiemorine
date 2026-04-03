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

export interface ISocialLinks {
  _type: 'socialLinks'
  _key: string
  size: 'small' | 'medium' | 'large'
  colored: boolean
}

export interface IGroup {
  _type: 'group'
  _key: string
  blocks: (ITitle | IParagraph | ICardMenu | ISocialLinks)[]
  marginTop: number
  marginBottom: number
}

export interface ITitle {
  _type: 'title'
  _key: string
  content: {
    FR: string
    EN: string
  }
  level: 2 | 3 | 4 | 5 | 6
  colored: boolean
}

export interface IParagraph {
  _type: 'paragraph'
  _key: string
  content: {
    FR: string
    EN: string
  }
  size: 'medium' | 'large'
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
}

export interface Page {
  _id: string
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
    sanityClient.fetch(`*[_type == "page"]{_id, title, slug { FR, EN }}`).then(setPages)
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
          body[]{
            _type,
            _key,
            _type == "title" => {
              content,
              level,
              colored
            },
            _type == "paragraph" => {
              content,
              size
            },
            _type == "cardMenu" => {
              cards[]{
                title,
                description,
                destinationPage->{ slug { FR, EN } }
              }
            },
            _type == "socialLinks" => {
              size,
              colored
            },
            _type == "group" => {
              marginTop,
              marginBottom,
              blocks[]{
                _type,
                _key,
                _type == "title" => {
                  content,
                  level,
                  colored
                },
                _type == "paragraph" => {
                  content,
                  size
                },
                _type == "cardMenu" => {
                  cards[]{
                    title,
                    description,
                    destinationPage->{ slug { FR, EN } }
                  }
                },
                _type == "socialLinks" => {
                  size,
                  colored
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
