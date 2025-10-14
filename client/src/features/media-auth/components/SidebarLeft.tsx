import { memo, type ComponentProps, type FC } from 'react'
import { nav_links } from '../constants/link.constant'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdLogout } from 'react-icons/md'
import { IMAGE_NOTFOUND } from '@/shared/constants/image.constant'

interface SidebarLeftProps extends ComponentProps<'div'> {
  close?: () => void
}

const SidebarLeft: FC<SidebarLeftProps> = ({ className, close, ...props }) => {
  const { signout } = useAuthStore()
  const { isPending, mutate } = useMutation({
    mutationFn: async () => await signout(),
    onSuccess: (data) => toast.success(data.message),
    onError: (data) => toast.error(data.message),
  })

  const { user } = useAuthStore()

  return (
    <div
      className={clsx([`w-64 border-r p-4 space-y-2`, className])}
      {...props}
    >
      <div className="border-b pb-2 flex items-center gap-2 px-4">
        <div className="min-w-7 max-w-7 aspect-square rounded-full overflow-hidden">
          <img
            src={user?.avatar || IMAGE_NOTFOUND.avatar_notfound}
            alt="avatar"
            loading="lazy"
            className="img"
          />
        </div>
        <div className="flex-1 text-gray-500">
          <div className="text-sm font-medium ">{user?.name}</div>
          <div className="line-clamp-1 text-xs ">{user?.email}</div>
        </div>
      </div>
      <ul className="border-b pb-2">
        {nav_links.top.map((i) => (
          <li key={i.path}>
            <NavLink
              to={`/` + i.path}
              onClick={close}
              className={({ isActive }) =>
                clsx([
                  `flex items-center gap-2 px-4 py-1.5 rounded-lg hover:bg-gray-100`,
                  isActive && `bg-gray-100 text-blue-500`,
                ])
              }
            >
              <span>{i.icon}</span>
              <span>{i.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <ul>
        {nav_links.main.map((i) => (
          <li key={i.path}>
            <NavLink
              to={`/me/` + i.path}
              onClick={close}
              className={({ isActive }) =>
                clsx([
                  `flex items-center gap-2 px-4 py-1.5 rounded-lg hover:bg-gray-100`,
                  isActive && `bg-gray-100 text-blue-500`,
                ])
              }
            >
              <span>{i.icon}</span>
              <span>{i.name}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            disabled={isPending}
            onClick={() => mutate()}
            className={clsx([
              `flex items-center w-full gap-2 px-4 py-1.5 rounded-lg hover:bg-gray-100`,
            ])}
          >
            <MdLogout />
            Signout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default memo(SidebarLeft)
