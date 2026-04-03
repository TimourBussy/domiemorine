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
        <Route path="/" element={<Page slug="/" />} />
        {pages.flatMap((page) => {
          const slugFR = page.slug?.FR?.current || ''
          const slugEN = page.slug?.EN?.current || ''
          const routes = []

          // Seulement créer une route si le slug n'est pas vide (page d'accueil déjà gérée)
          if (slugFR && slugFR !== '/') {
            routes.push(
              <Route key={page._id} path={`/${slugFR}`} element={<Page slug={slugFR} />} />,
            )
          }

          if (slugEN !== slugFR && slugEN && slugEN !== '/') {
            routes.push(
              <Route key={`${page._id}-en`} path={`/${slugEN}`} element={<Page slug={slugFR} />} />,
            )
          }
          return routes
        })}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
