import {usePage} from './hooks/usePages'

export default function Page({slug}: {slug: string}) {
  const page = usePage(slug)

  if (!page) return null

  return (
    <main>
      {page.heroImage?.src?.asset?.url && (
        <img src={page.heroImage.src.asset.url} alt={page.heroImage.altFr} />
      )}
    </main>
  )
}
