import {Header} from './layout/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {usePages} from './hooks/usePages'
import {Suspense, lazy, type ComponentType} from 'react'
import Home from './pages/Home'
import Template from './pages/Template'
import CircularProgress from '@mui/material/CircularProgress'

export default function App() {
  const pages = usePages()

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {pages.map((page) => {
          const slug = page.slug?.current || ''
          if (!slug || slug === '/') {
            return <Route key={page._id} path="/" element={<Home />} />
          }
          const Page = lazy(async () => {
            try {
              return await import(
                `./pages/${slug
                  .split('-')
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join('')}`
              )
            } catch {
              return {default: Template}
            }
          }) as ComponentType<unknown>
          return (
            <Route
              key={page._id}
              path={`/${slug}`}
              element={
                <Suspense
                  fallback={
                    <div className="flex, justify-center items-center min-h-[40vh]">
                      <CircularProgress />
                    </div>
                  }
                >
                  <Page />
                </Suspense>
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
