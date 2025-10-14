import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { memo, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { otruyenGetSearchApi } from '../apis/otruyen.api'
import type { IComic } from '../types/otruyen.type'
import ComicSearchItem from './ComicSearchItem'

const InputSearch = () => {
  const [text, setText] = useState('')
  const [debounce] = useDebounce(text, 1000)
  const searchResult = useQuery({
    queryKey: ['search', debounce],
    queryFn: async () => await otruyenGetSearchApi(`keyword=` + debounce),
    enabled: !!debounce,
  })

  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={clsx(['relative sm:max-w-[432px] w-full'])}>
      <div className="flex items-center gap-2 bg-white px-4 rounded w-full">
        <IoSearch />
        <input
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            if (!show) {
              setShow(true)
            }
          }}
          onClick={() => {
            if (!show) {
              setShow(true)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && text) {
              navigate(`/comic/tim-kiem?keyword=${text}`)
              setShow(false)
            }
          }}
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none border-none py-1.5 flex-1"
        />
      </div>
      {show && (
        <ul className="mt-0.5 z-20 absolute top-full left-0 right-0 bg-white rounded shadow max-h-60 overflow-y-auto">
          {searchResult.data?.data?.items?.map((item: IComic) => (
            <li key={item?.slug}>
              <ComicSearchItem data={item} />
            </li>
          ))}
          {searchResult.isLoading && (
            <li className="flex gap-2 p-1.5">Loading...</li>
          )}
          {!searchResult.isLoading &&
            searchResult.data?.data?.items?.length === 0 && (
              <li className="flex gap-2 p-1.5">Not found results</li>
            )}
        </ul>
      )}
    </div>
  )
}

export default memo(InputSearch)
