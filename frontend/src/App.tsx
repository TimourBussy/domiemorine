import {Header} from './layout/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {usePages} from './hooks/usePages'
import Page from './Page'

export default function App() {
  const pages = usePages()
  console.log(pages)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {pages.map((page) => {
          const slug = page.slug?.current || ''
          const path = !slug || slug === '/' ? '/' : `/${slug}`
          return <Route key={page._id} path={path} element={<Page slug={slug} />} />
        })}
      </Routes>
    </BrowserRouter>
  )
}