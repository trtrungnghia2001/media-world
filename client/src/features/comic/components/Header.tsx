import { memo } from 'react'
import { Link } from 'react-router-dom'
import { COMIC_IMAGE_DEFAULT } from '../constants/image.constant'
import InputSearch from './InputSearch'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { MOVIE_IMAGE_DEFAULT } from '@/features/movie/constants/image.constant'
import { LuLogIn } from 'react-icons/lu'

const Header = () => {
  const { user } = useAuthStore()
  return (
    <div
      style={{
        background: `url(${COMIC_IMAGE_DEFAULT.bg_header_image}) no-repeat center/cover`,
      }}
      className="z-20 shadow"
    >
      <div className="max-w-[1332px] w-full px-4 py-2 mx-auto flex items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Link
            to={`/comic`}
            className="font-bold text-base text-white w-[150px] block"
          >
            <img
              src={COMIC_IMAGE_DEFAULT.nettruyen_image}
              loading="lazy"
              alt=""
              className="img"
            />
          </Link>
          <div className="flex-1 hidden sm:block">
            <InputSearch />
          </div>
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
    </div>
  )
}

export default memo(Header)
