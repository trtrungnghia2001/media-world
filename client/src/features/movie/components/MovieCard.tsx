import { memo } from 'react'
import { FaPlay, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import type { IMovie, OphimCardLayoutType } from '../types/ophim.type'
import { ophimGetImage } from '../apis/ophim.api'

const MovieCard = ({
  data,
  layout,
}: {
  data: IMovie
  layout?: OphimCardLayoutType
}) => {
  const link = `/movie/detail/` + data.slug

  if (layout === 'horizontal')
    return (
      <Link to={link} className="block">
        <div className="flex items-start bg-color-bg-item text-color-text-secondary-1 hover:text-white hover:bg-black">
          {/* thumbnail */}
          <div className="aspect-thumbnail-2 w-16">
            <img
              src={ophimGetImage(data.thumb_url)}
              alt={ophimGetImage(data.thumb_url)}
              loading="lazy"
              className="img"
            />
          </div>
          {/* detail */}
          <div className="flex-1 space-y-1 p-2 px-3">
            <h5 className="line-clamp-1">{data.name}</h5>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 border border-color-border px-2 py-0.5 rounded">
                <FaStar />
                <span>{data.tmdb.vote_average}</span>
              </div>
              <span>{data.year}</span>
            </div>
          </div>
        </div>
      </Link>
    )

  return (
    <div>
      <Link to={link}>
        <div className="relative group">
          {/* thumbnail */}
          <div className="aspect-thumbnail-1 overflow-hidden">
            <img
              src={ophimGetImage(data.thumb_url)}
              loading="lazy"
              alt={`thumbnail`}
              className="group-hover:scale-110 transition img"
            />
          </div>
          {/* overlay */}
          <div className="absolute inset-0 bg-black/80 hidden transition-opacity  group-hover:flex items-center justify-center ">
            <button>
              <FaPlay className="opacity-0 group-hover:opacity-100 duration-500 scale-90 text-5xl" />
            </button>
          </div>
          {data?.episode_current && (
            <div className="absolute bottom-0 left-0 right-0 p-1.5 flex flex-col gap-0.5 items-start">
              <div className="inline-block bg-blue-500 text-white text-10 px-2 py-1 rounded">
                <div className="line-clamp-1">
                  {data?.episode_current} {data?.lang}
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="mt-4 mb-2">
        <h5 className="pb-0.5 line-clamp-1 ">
          <Link to={link} className="hover:text-blue-500">
            {data.name}
          </Link>
        </h5>
        <div className="text-xs text-color-text-secondary-1">{data.year}</div>
      </div>
    </div>
  )
}

export default memo(MovieCard)
