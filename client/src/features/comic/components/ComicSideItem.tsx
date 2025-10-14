import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { IComic } from '../types/otruyen.type'
import { otruyenGetChapterId, otruyenGetImage } from '../apis/otruyen.api'

const ComicSideItem = ({ data }: { data: IComic }) => {
  return (
    <div className="relative leading-none overflow-hidden">
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
      <div className="bg-black/60 text-white p-2 absolute bottom-0 left-0 right-0 space-y-1">
        <h5 className="line-clamp-1">
          <Link to={`/comic/detail/${data?.slug}`}>{data?.name}</Link>
        </h5>
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
    </div>
  )
}

export default memo(ComicSideItem)
