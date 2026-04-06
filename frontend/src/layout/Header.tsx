import {useTranslation} from 'react-i18next'
import {NavItem} from '../ui/NavItem'
import {Link} from 'react-router-dom'
import {useSettings} from '../hooks/usePages'
import {Title} from '../ui/Title'
import {useState, useEffect} from 'react'
import {FiMenu, FiX} from 'react-icons/fi'

export function Header() {
  const {i18n} = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const settings = useSettings()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) setScrolled(true)
      else if (window.scrollY < 40) setScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = settings?.navigationMenu || []

  const getSlug = (page: any) => (page.slug?.FR?.current !== '/' ? `/${page.slug.FR.current}` : '/')

  const getTitle = (page: any) => (i18n.language === 'FR' ? page.title.FR : page.title.EN)

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm transition-all duration-500">
      <div className="relative py-4 text-center">
        <Link to="/">
          <Title
            level={1}
            className={`sm:mb-4 cursor-pointer inline-block transition-all duration-500 ${scrolled ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl'}`}
          >
            Domi Emorine
          </Title>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:block text-gray-700">
          <ul className="flex justify-center gap-x-8">
            {menuItems
              .filter((item) => item.page)
              .map((item) => {
                const page = item.page
                const title = getTitle(page)

                const subItems =
                  item.children?.flatMap((child: any) => {
                    if (child._type === 'ensemblesListItem') {
                      return (settings?.ensembles || []).map((ensemble) => ({
                        to: `/ensembles/${ensemble.slug.current}`,
                        label: ensemble.name,
                      }))
                    }
                    if (child._type === 'submenuItem' && child.page) {
                      return [
                        {
                          to: getSlug(child.page),
                          label: getTitle(child.page),
                        },
                      ]
                    }
                    return []
                  }) || []

                return (
                  <NavItem
                    key={page._id}
                    to={getSlug(page)}
                    subItems={subItems.length > 0 ? subItems : undefined}
                  >
                    {title}
                  </NavItem>
                )
              })}
          </ul>
        </nav>

        {/* Lang & Hamburger */}
        <div className="sm:absolute top-0 bottom-0 right-6 flex flex-row-reverse items-center justify-center gap-2">
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-30 md:hidden py-2 rounded-xl text-gray-500 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Lang */}
          <button
            onClick={() => {
              i18n.changeLanguage(i18n.language === 'FR' ? 'EN' : 'FR')
            }}
            className="relative z-30 p-2 rounded-xl text-sm font-bold flex items-center gap-1.5 text-gray-500 hover:bg-amber-50 hover:text-amber-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              width="22px"
              fill="currentColor"
            >
              <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" />
            </svg>
            {i18n.language}
          </button>
        </div>
      </div>

      {/* Hamburger dropdown menu */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setMobileMenuOpen(false)} />
          <nav className="md:hidden relative z-20 border-t text-gray-700 border-gray-200 bg-white">
            <ul className="flex flex-col">
              {menuItems
                .filter((item) => item.page)
                .map((item) => {
                  const page = item.page
                  const slug = getSlug(page)

                  const subItems =
                    item.children?.flatMap((child: any) => {
                      if (child._type === 'ensemblesListItem') {
                        return (settings?.ensembles || []).map((ensemble) => ({
                          to: `/ensembles/${ensemble.slug.current}`,
                          label: ensemble.name,
                        }))
                      }
                      if (child._type === 'submenuItem' && child.page) {
                        return [
                          {
                            to: getSlug(child.page),
                            label: getTitle(child.page),
                          },
                        ]
                      }
                      return []
                    }) || []

                  return (
                    <NavItem
                      key={page._id}
                      to={slug}
                      onClick={() => setMobileMenuOpen(false)}
                      subItems={subItems.length > 0 ? subItems : undefined}
                    >
                      {getTitle(page)}
                    </NavItem>
                  )
                })}
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}
