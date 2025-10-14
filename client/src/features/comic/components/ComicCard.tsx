import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { IComic } from '../types/otruyen.type'
import { otruyenGetChapterId, otruyenGetImage } from '../apis/otruyen.api'

const ComicCard = ({ data }: { data: IComic }) => {
  return (
    <div className="space-y-1">
      <Link to={`/comic/detail/` + data.slug}>
        <div className="aspect-thumbnail-1">
          <img
            src={otruyenGetImage(data.thumb_url)}
            alt={otruyenGetImage(data.thumb_url)}
            loading="lazy"
            className="img"
          />
        </div>
      </Link>
      <h4>
        <Link
          className="leading-5 line-clamp-1"
          to={`/comic/detail/` + data.slug}
        >
          {data.name}
        </Link>
      </h4>
      <h5>
        {data.chaptersLatest ? (
          <Link
            to={
              `/comic/detail/` +
              data.slug +
              `/chapter/` +
              otruyenGetChapterId(data.chaptersLatest?.[0]?.chapter_api_data)
            }
          >
            Chapter {data.chaptersLatest?.[0]?.chapter_name}
          </Link>
        ) : (
          <span>No chapter</span>
        )}
      </h5>
    </div>
  )
}

export default memo(ComicCard)
