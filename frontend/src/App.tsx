import {Header} from './layout/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {usePages} from './hooks/usePages'
import Page from './layout/Page'

export default function App() {
  const pages = usePages()

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {pages.map((page) => {
          const slug = page.slug?.current || ''
          return (
            <Route
              key={page._id}
              path={!slug || slug === '/' ? '/' : `/${slug}`}
              element={<Page slug={slug} />}
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
