import { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

export interface Page {
  _id: string;
  title: {
    en_GB?: string;
    fr_FR?: string;
  };
  slug: {
    current: string;
  };
}

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "page"]{_id, title, slug}`
    ).then((data) => {
      setPages(data);
    });
  }, []);
  return pages;
}
