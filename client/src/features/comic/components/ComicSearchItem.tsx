import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { IComic } from '../types/otruyen.type'
import { otruyenGetImage } from '../apis/otruyen.api'

const ComicSearchItem = ({ data }: { data: IComic }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`/comic/detail/` + data.slug}
      onMouseDown={(e) => {
        e.preventDefault()
        navigate(`/comic/detail/` + data.slug)
      }}
      className="flex gap-2 p-1.5 hover:bg-gray-100"
    >
      <div className="aspect-video w-8">
        <img
          src={otruyenGetImage(data.thumb_url)}
          alt={otruyenGetImage(data.thumb_url)}
          loading="lazy"
        />
      </div>
      <div className="flex-1">{data.name}</div>
    </Link>
  )
}

export default memo(ComicSearchItem)
