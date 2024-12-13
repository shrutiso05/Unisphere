'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  HomeIcon,
  BookOpenIcon,
  DocumentTextIcon,
  UserIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    roles: ['ADMIN', 'STAFF', 'STUDENT'],
  },
  {
    name: 'Applications',
    href: '/applications',
    icon: DocumentTextIcon,
    roles: ['ADMIN', 'STAFF', 'STUDENT'],
  },
  {
    name: 'Courses',
    href: '/courses',
    icon: BookOpenIcon,
    roles: ['ADMIN', 'STAFF', 'STUDENT'],
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: UserIcon,
    roles: ['ADMIN', 'STAFF', 'STUDENT'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
    roles: ['ADMIN'],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const filteredNavigation = navigationItems.filter(
    item => item.roles.includes(user?.role || '')
  )

  return (
    <div className="hidden border-r bg-white lg:block lg:w-64">
      <nav className="space-y-1 p-4">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}