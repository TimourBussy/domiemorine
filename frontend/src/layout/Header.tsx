import {useTranslation} from 'react-i18next'
import {NavItem} from '../ui/NavItem'
import {Link} from 'react-router-dom'
import {usePages} from '../hooks/usePages'
import { Title } from '../ui/Title'

export function Header() {
  const {i18n} = useTranslation()

  return (
    <header className="sticky top-0 z-20 p-4 bg-white shadow-sm text-center">
      <Link to="/">
        <Title level={1} className="mb-4 cursor-pointer inline-block">Domi Emorine</Title>
      </Link>
      <nav className="text-gray-700">
        <ul className="flex justify-center gap-x-8">
          {usePages().map((page) => (
            <NavItem
              key={page._id}
              to={page.slug?.current && page.slug.current !== '/' ? `/${page.slug.current}` : '/'}
            >
              {i18n.language === 'FR' ? page.title.FR : page.title.EN}
            </NavItem>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'FR' ? 'EN' : 'FR')
        }}
        className="px-3 py-2 rounded-xl text-sm font-bold absolute flex items-center gap-1.5 top-6 right-6 text-gray-500 hover:bg-amber-50 hover:text-amber-700 transition-colors"
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
    </header>
  )
}
