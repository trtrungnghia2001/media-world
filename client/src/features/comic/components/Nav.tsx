import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { otruyenGetCategoryApi } from '../apis/otruyen.api'
import type { IComicCategory } from '../types/otruyen.type'
import { navList } from '../constants/links.constant'

const Nav = () => {
  const categoriesResult = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await otruyenGetCategoryApi(),
  })

  return (
    <div className="bg-orange-500 z-10 sticky top-0 left-0 right-0">
      <div className="max-w-[1332px] w-full px-4 mx-auto flex items-center gap-4">
        <ul className="flex items-stretch">
          <li className="group">
            <h5 className="group-hover:text-black group-hover:bg-white text-white cursor-pointer p-2 inline-block">
              <Link to={`/comic`}>Trang chủ</Link>
            </h5>
          </li>
          <li className="group">
            <h5 className="group-hover:text-black group-hover:bg-white text-white cursor-pointer p-2 inline-block">
              Thể loại
            </h5>
            <div className="group-hover:block hidden absolute top-full left-0 right-0 max-h-[50vh] overflow-y-auto bg-white shadow">
              <ul className="max-w-[1332px] w-full px-4 py-4 mx-auto grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {categoriesResult?.data?.data?.items?.map(
                  (item: IComicCategory) => (
                    <li key={item?._id}>
                      <Link
                        className="hover:text-orange-500"
                        to={`/comic/the-loai/` + item.slug}
                      >
                        {item?.name}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </li>
          <li className="group">
            <h5 className="group-hover:text-black group-hover:bg-white text-white cursor-pointer p-2 inline-block">
              Xếp hạng
            </h5>
            <div className="group-hover:block hidden absolute top-full left-0 right-0 max-h-[50vh] overflow-y-auto bg-white shadow">
              <ul className="max-w-[1332px] w-full px-4 py-4 mx-auto grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {navList?.map((item) => (
                  <li key={item?.title}>
                    <Link
                      className="hover:text-orange-500"
                      to={`/comic/xep-hang` + item.path}
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="group">
            <h5 className="group-hover:text-black group-hover:bg-white text-white cursor-pointer p-2 inline-block">
              <Link to={`/comic/tim-kiem`}>Tìm kiếm</Link>
            </h5>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default memo(Nav)
