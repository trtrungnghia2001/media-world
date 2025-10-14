import { AiFillLike } from 'react-icons/ai'
import {
  MdAccountCircle,
  MdFavorite,
  MdHome,
  MdLocalMovies,
  MdMenuBook,
  MdOutlineHistory,
  MdOutlinePassword,
} from 'react-icons/md'

export const header_links = []

export const nav_links = {
  top: [
    {
      icon: <MdHome size={18} />,
      name: 'Home',
      path: '',
    },
    {
      icon: <MdLocalMovies size={18} />,
      name: 'Movie',
      path: 'movie',
    },
    {
      icon: <MdMenuBook size={18} />,
      name: 'Comic',
      path: 'comic',
    },
  ],
  main: [
    {
      icon: <MdAccountCircle size={18} />,
      name: 'Account',
      path: 'account',
    },
    {
      icon: <MdOutlinePassword />,
      name: 'Update Password',
      path: 'update-password',
    },
    {
      icon: <AiFillLike />,
      name: 'Like',
      path: 'like',
    },
    {
      icon: <MdFavorite />,
      name: 'Favorite',
      path: 'favorite',
    },
    {
      icon: <MdOutlineHistory />,
      name: 'History',
      path: 'history',
    },
  ],
}

export const media_links = [
  {
    icon: <MdAccountCircle size={22} />,
    title: 'Account',
    path: 'me/account',
  },
  {
    icon: <MdLocalMovies size={22} />,
    title: 'Movie',
    path: 'movie',
  },
  {
    icon: <MdMenuBook size={22} />,
    title: 'Comic',
    path: 'comic',
  },
]
