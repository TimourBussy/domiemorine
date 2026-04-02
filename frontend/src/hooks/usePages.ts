import {useEffect, useState} from 'react'
import sanityClient from '../sanityClient'

export interface IGroup {
  _type: 'group'
  _key: string
  blocks: (ITitle | IParagraph | ICardMenu)[]
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
      current: string
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
    current: string
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
  body?: (ITitle | IParagraph | ICardMenu | IGroup)[]
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([])
  useEffect(() => {
    sanityClient.fetch(`*[_type == "page"]{_id, title, slug}`).then(setPages)
  }, [])
  return pages
}

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null)
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == $slug][0]{
          _id, title, slug,
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
                destinationPage->{ slug }
              }
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
                    destinationPage->{ slug }
                  }
                }
              }
            }
          }
        }`,
        {slug},
      )
      .then((data) => {
        console.log('usePage result:', data)
        setPage(data)
      })
  }, [slug])
  return page
}
