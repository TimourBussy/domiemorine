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

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="relative pt-4 sm:pb-4 text-center">
        <Link to="/">
          <Title
            level={1}
            className={`sm:mb-4 cursor-pointer inline-block transition-all duration-500 ${scrolled ? 'scale-65' : 'scale-100'} origin-center`}
          >
            Domi Emorine
          </Title>
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:block text-gray-700">
          <ul className="flex justify-center gap-x-8">
            {menuItems.map((item) => {
              const page = item.page
              const slug = page.slug?.FR?.current !== '/' ? `/${page.slug.FR.current}` : '/'
              const title = i18n.language === 'FR' ? page.title.FR : page.title.EN

              if (!item.children || item.children.length === 0) {
                return (
                  <NavItem key={page._id} to={slug}>
                    {title}
                  </NavItem>
                )
              }

              return (
                <li key={page._id} className="group relative">
                  <NavItem to={slug}>{title}</NavItem>
                  <ul className="absolute left-0 mt-0 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md py-2 min-w-max">
                    {item.children.map((child) => {
                      const childPage = child.page
                      const childSlug =
                        childPage.slug?.FR?.current !== '/' ? `/${childPage.slug.FR.current}` : '/'
                      const childTitle =
                        i18n.language === 'FR' ? childPage.title.FR : childPage.title.EN
                      return (
                        <NavItem key={childPage._id} to={childSlug}>
                          {childTitle}
                        </NavItem>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Lang & Hamburger */}
        <div className="absolute top-0 bottom-0 right-6 flex flex-row-reverse items-center gap-2">
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
          <nav className="md:hidden relative z-20 border-t border-gray-200 bg-white">
            <ul className="flex flex-col p-0">
              {menuItems.map((item) => {
                const page = item.page
                const slug = page.slug?.FR?.current !== '/' ? `/${page.slug.FR.current}` : '/'
                const title = i18n.language === 'FR' ? page.title.FR : page.title.EN

                if (!item.children || item.children.length === 0) {
                  return (
                    <NavItem key={page._id} to={slug} onClick={() => setMobileMenuOpen(false)}>
                      {title}
                    </NavItem>
                  )
                }

                return (
                  <NavItem
                    key={page._id}
                    to={slug}
                    onClick={() => setMobileMenuOpen(false)}
                    mobileSubmenu={
                      <ul className="flex flex-col bg-gray-50">
                        {item.children.map((child) => {
                          const childPage = child.page
                          const childSlug =
                            childPage.slug?.FR?.current !== '/'
                              ? `/${childPage.slug.FR.current}`
                              : '/'
                          const childTitle =
                            i18n.language === 'FR' ? childPage.title.FR : childPage.title.EN
                          return (
                            <NavItem
                              key={childPage._id}
                              to={childSlug}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {childTitle}
                            </NavItem>
                          )
                        })}
                      </ul>
                    }
                  >
                    {title}
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
