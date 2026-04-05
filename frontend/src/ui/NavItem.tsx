import {NavLink} from 'react-router-dom'

export function NavItem({
  to,
  children,
  subItems,
  onClick,
  mobileSubmenu,
}: {
  to: string
  children: React.ReactNode
  subItems?: {to: string; label: string}[]
  onClick?: () => void
  mobileSubmenu?: React.ReactNode
}) {
  return (
    <li className="group relative">
      <NavLink
        to={to}
        onClick={onClick}
        className={({isActive}) =>
          `flex gap-1 py-4 px-2 ${isActive ? 'font-semibold text-amber-700' : 'hover:text-amber-700 transition-colors duration-200'}`
        }
        end
      >
        {children}
        {subItems && (
          <svg
            className="w-3.5 group-hover:rotate-180 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </NavLink>
      {subItems && (
        <ul className="absolute left-0 top-full hidden group-hover:block">
          {subItems.map((item) => (
            <li key={item.to}>
              <a href={item.to}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
      {mobileSubmenu}
    </li>
  )
}
