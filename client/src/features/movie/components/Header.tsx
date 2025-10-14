import { useQuery } from '@tanstack/react-query'
import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Wrapper from './Wrapper'
import { FaAngleDown, FaCaretRight } from 'react-icons/fa'
import clsx from 'clsx'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { IoSearch } from 'react-icons/io5'
import { ophimGetCategoriesApi, ophimGetCountriesApi } from '../apis/ophim.api'
import { ophimHeaderLinks } from '../constants/option.constant'
import type { IOphimCategory } from '../types/ophim.type'
import InputSearch from './InputSearch'
import { MOVIE_IMAGE_DEFAULT } from '../constants/image.constant'

import { LuLogIn } from 'react-icons/lu'
import SidebarNavLeft from './SidebarNavLeft'
import { useAuthStore } from '@/features/auth/stores/auth.store'

const Header = () => {
  const getOphimGetCategoriesApiResult = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await ophimGetCategoriesApi(),
  })
  const getOphimGetCountriesApiResult = useQuery({
    queryKey: ['countries'],
    queryFn: async () => await ophimGetCountriesApi(),
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { user } = useAuthStore()

  return (
    <>
      <div className="z-20 shadow bg-color-bg-container px-4 ">
        <Wrapper className="py-2 flex gap-4 items-center justify-between">
          <button className="lg:hidden" onClick={handleOpen}>
            <HiBars3BottomLeft size={24} />
          </button>
          <div className="flex items-center gap-4 flex-1">
            <Link to={`/movie`} className="block w-36 md:w-44">
              <img
                src={MOVIE_IMAGE_DEFAULT.phimmoi_image}
                alt={'logo'}
                loading="lazy"
              />
            </Link>
            <ul className="hidden lg:flex items-center gap-4 text-sm">
              {ophimHeaderLinks.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={`/movie/danh-muc/` + item.slug}
                    className={({ isActive }) =>
                      clsx(
                        `py-3 text-sm min-w-max block`,
                        isActive ? `text-blue-500` : `text-white`,
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              {/* dropdown */}
              <li className="relative py-3 group min-w-max">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span>Thể loại</span>
                  <FaAngleDown />
                </div>
                <ul className="z-50 bg-black shadow absolute top-full left-0 w-[450px] hidden group-hover:grid grid-cols-3">
                  {getOphimGetCategoriesApiResult.data?.data?.items?.map(
                    (item: IOphimCategory) => (
                      <li key={item._id}>
                        <NavLink
                          to={`/movie/the-loai/` + item.slug}
                          className={({ isActive }) =>
                            clsx(
                              `flex items-center gap-1 p-4 py-2 hover:text-white`,
                              isActive
                                ? `text-blue-500`
                                : `text-color-text-secondary-1`,
                            )
                          }
                        >
                          <FaCaretRight />
                          <span>{item.name}</span>
                        </NavLink>
                      </li>
                    ),
                  )}
                </ul>
              </li>
              {/* dropdown */}
              <li className="relative py-3 group min-w-max">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span>Quốc gia</span>
                  <FaAngleDown />
                </div>
                <ul className="z-50 bg-black shadow absolute top-full left-0 w-[450px] hidden group-hover:grid grid-cols-3">
                  {getOphimGetCountriesApiResult.data?.data?.items?.map(
                    (item: IOphimCategory) => (
                      <li key={item._id}>
                        <NavLink
                          to={`/movie/quoc-gia/` + item.slug}
                          className={({ isActive }) =>
                            clsx(
                              `flex items-center gap-1 p-4 py-2 hover:text-white`,
                              isActive
                                ? `text-blue-500`
                                : `text-color-text-secondary-1`,
                            )
                          }
                        >
                          <FaCaretRight />
                          {item.name}
                        </NavLink>
                      </li>
                    ),
                  )}
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <Link to={`/movie/tim-kiem`} className="sm:hidden">
              <IoSearch size={20} />
            </Link>
            <div className="flex-1 hidden sm:block">
              <InputSearch />
            </div>
            {user ? (
              <Link
                to={`/me/account`}
                className="w-7 block aspect-square overflow-hidden rounded-full"
              >
                <img
                  src={user.avatar || MOVIE_IMAGE_DEFAULT.avatar_notfound_image}
                  alt="avatar"
                  loading="lazy"
                  className="img"
                />
              </Link>
            ) : (
              <Link
                to={`/auth/signin`}
                className="text-xs font-medium flex items-center gap-2"
              >
                <LuLogIn />
                Đăng nhập
              </Link>
            )}
          </div>
        </Wrapper>
      </div>
      <SidebarNavLeft open={open} onClose={handleClose} />
    </>
  )
}

export default memo(Header)
