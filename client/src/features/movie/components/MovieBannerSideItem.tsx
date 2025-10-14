import clsx from 'clsx'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { IMovie } from '../types/ophim.type'
import { ophimGetImage } from '../apis/ophim.api'

const MovieBannerSideItem = ({
  data,
  height,
}: {
  data: IMovie
  height?: number
}) => {
  return (
    <Link to={`/movie/detail/` + data?.slug} className="block">
      <div className="relative">
        <div
          className={clsx(
            `aspect-video w-full`,
            height ? `h-[${height}px]` : `h-auto`,
          )}
        >
          <img
            src={ophimGetImage(data?.thumb_url)}
            loading="lazy"
            alt={ophimGetImage(data?.thumb_url)}
            className="img"
          />
        </div>
        <div className="absolute bottom-2 left-2">
          <div className="">
            <h5 className="pb-0.5 line-clamp-1 ">{data?.name}</h5>
            <div className="text-xs">{data?.year}</div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-10 px-2 py-1">
          <span>{data?.quality}</span>
          <span className="ml-1">{data?.lang}</span>
        </div>
      </div>
    </Link>
  )
}

export default memo(MovieBannerSideItem)
