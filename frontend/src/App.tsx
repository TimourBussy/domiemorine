import {usePages, useSettings} from './hooks/usePages'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Header} from './layout/Header'
import {Page} from './layout/Page'
import {Footer} from './layout/Footer'
import {ScrollToTop} from './ui/ScrollToTop'
import {useTranslation} from 'react-i18next'
import { EnsemblePage } from './layout/EnsemblePage'

export default function App() {
  const pages = usePages()
  const settings = useSettings()
  const {i18n} = useTranslation()

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Page slug="/" />} />
          {pages.flatMap((page) => {
            const slugFR = page.slug?.FR?.current || ''
            const slugEN = page.slug?.EN?.current || ''
            const routes = []

            if (slugFR && slugFR !== '/') {
              routes.push(
                <Route key={page._id} path={`/${slugFR}`} element={<Page slug={slugFR} />} />,
              )
            }

            if (slugEN !== slugFR && slugEN && slugEN !== '/') {
              routes.push(
                <Route
                  key={`${page._id}-en`}
                  path={`/${slugEN}`}
                  element={<Page slug={slugFR} />}
                />,
              )
            }
            return routes
          })}
          <Route
            path="*"
            element={
              <main className="flex-1 flex flex-col items-center justify-center">
                <p className="text-2xl text-gray-700">
                  {i18n.language === 'FR' ? 'Page non trouvée' : 'Page not found'}
                </p>
              </main>
            }
          />
          {settings?.ensembles?.map((ensemble) => (
            <Route
              key={ensemble.slug.current}
              path={`/ensembles/${ensemble.slug.current}`}
              element={<EnsemblePage slug={ensemble.slug.current} />}
            />
          ))}
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  )
}
