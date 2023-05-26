import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    RssIcon,
    UsersIcon,
  } from '@heroicons/react/24/outline'
import { NavLink, useLocation } from 'react-router-dom'




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Sidebar(){

    const location = useLocation()

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: location.pathname==='/dashboard' ? true:false },
        { name: 'Blog', href: '/dashboard-blog', icon: RssIcon, current: location.pathname==='/dashboard-blog' ? true:false },
    ]

    return(
        <div>
            {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-gray-200',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-white' : 'text-white group-hover:text-gray-100',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
            ))}
        </div>
    )
}
export default Sidebar