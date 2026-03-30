import {usePage} from './hooks/usePages'

export default function Page({slug}: {slug: string}) {
  const page = usePage(slug)

  if (!page) return null

  return (
    <main>
      {page.heroImage?.asset?.url && <img src={page.heroImage.asset.url} alt={page.title.fr_FR} />}
    </main>
  )
}
