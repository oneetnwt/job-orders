import { NavLink } from 'react-router-dom'
import GetIcon from './icons/GetIcon'

function SidebarLinks({ to, name }) {
    const isLogout = name === 'Logout';

    return (
        <NavLink
            to={to}
            className={!isLogout ? ({ isActive }) =>
                `flex items-center space-x-2 p-[0.75em] rounded-lg transition-colors duration-200 ${isActive
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
                : 'flex items-center space-x-2 p-[0.75em] rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-100 hover:text-[var(--error-color)]'
            }
        >
            <GetIcon icon={name} />
            <p className="font-medium text-[0.875rem]">{name}</p>
        </NavLink>
    )
}

export default SidebarLinks