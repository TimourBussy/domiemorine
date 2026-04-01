import {useEffect, useState} from 'react'
import sanityClient from '../sanityClient'

export interface TitleAndParagraph {
  _type: 'titleAndParagraph'
  _key: string
  title: {
    fr_FR: string
    en_GB: string
  }
  paragraph: {
    fr_FR: string
    en_GB: string
  }
}

export interface CardMenuItem {
  title: {
    fr_FR: string
    en_GB: string
  }
  description: {
    fr_FR: string
    en_GB: string
  }
  destinationPage?: {
    slug: {
      current: string
    }
  }
}

export interface CardMenu {
  _type: 'cardMenu'
  _key: string
  cards: CardMenuItem[]
}

export interface Page {
  _id: string
  title: {
    en_GB: string
    fr_FR: string
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
  body?: (TitleAndParagraph | CardMenu)[]
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
            _type == "titleAndParagraph" => {
              title,
              paragraph
            },
            _type == "cardMenu" => {
              cards[]{
                title,
                description,
                destinationPage->{ slug }
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
