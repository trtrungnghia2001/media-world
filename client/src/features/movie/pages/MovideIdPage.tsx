import useSearchParamsValue from '@/shared/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import {
  ophimGetImage,
  ophimGetMovieDetailApi,
  ophimGetPeoplesApi,
} from '../apis/ophim.api'
import { useEffect, useMemo } from 'react'
import type { IMovieDetail, IOphimPeople } from '../types/ophim.type'
import { Rate } from 'antd'
import MoviePlay from '../components/MoviePlay'
import ButtonLike from '@/features/media-auth/components/ButtonLike'
import ButtonFavorite from '@/features/media-auth/components/ButtonFavorite'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { useMediaStore } from '@/features/media-auth/stores/media.store'
import _ from 'lodash'
import PeopleCard from '../components/PeopleCard'

const MovideIdPage = () => {
  const { slug } = useParams()
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    server: `0`,
    episode: `0`,
  })

  const getMovieBySlugResult = useQuery({
    queryKey: ['movie', slug],
    queryFn: async () => await ophimGetMovieDetailApi(slug as string),
    enabled: !!slug,
  })
  const movieData = useMemo(() => {
    return getMovieBySlugResult.data?.data?.item as IMovieDetail
  }, [getMovieBySlugResult.data])

  const getPeoplesApiResult = useQuery({
    queryKey: ['movie', slug, 'peoples'],
    queryFn: async () => await ophimGetPeoplesApi(slug as string),
    enabled: !!slug,
  })

  const peopleGroup = useMemo(() => {
    return _.groupBy(
      (getPeoplesApiResult.data?.data?.peoples as IOphimPeople[]) || [],
      'known_for_department',
    )
  }, [getPeoplesApiResult.data])

  const server = useMemo(
    () => searchParams.get('server') || '0',
    [searchParams, slug],
  )
  const episode = useMemo(
    () => searchParams.get('episode') || '0',
    [searchParams, slug],
  )

  const { isAuthenticated } = useAuthStore()
  const { getInfoMedia, addHistory } = useMediaStore()
  const MediaInfoResult = useQuery({
    queryKey: ['movie', 'info', slug],
    queryFn: async () => await getInfoMedia(slug as string, 'movie'),
    enabled: !!(slug && isAuthenticated),
  })

  useEffect(() => {
    if (movieData && isAuthenticated) {
      addHistory({
        mediaId: movieData.slug,
        mediaName: movieData.name,
        mediaThumbnail: movieData.thumb_url,
        mediaType: 'movie',
      })
    }
  }, [isAuthenticated, movieData])

  if (!movieData) return

  return (
    <>
      <div className="space-y-10 mb-16">
        {movieData?.episodes?.[Number(server)]?.server_data?.[Number(episode)]
          ?.link_embed && (
          <MoviePlay
            movieData={movieData}
            handleSearchParams={handleSearchParams}
            episode={episode}
            server={server}
          />
        )}

        {/* detail */}
        <article className="flex flex-col sm:flex-row items-start gap-5">
          {/* thumbnail */}
          <div className="w-full aspect-video sm:w-44 sm:aspect-thumbnail-1 overflow-hidden">
            <img
              src={ophimGetImage(movieData?.thumb_url)}
              alt={ophimGetImage(movieData?.thumb_url)}
              loading="lazy"
              className="img"
            />
          </div>
          {/* info */}
          <div className="flex-1 space-y-2 text-13">
            <h2 className="text-xl font-medium">{movieData?.name}</h2>
            <div className="text-color-text-secondary-1 space-x-2">
              <span>{movieData?.origin_name}</span>
              <span>{movieData?.year}</span>
            </div>
            <div className="text-color-text-secondary-1 space-x-2">
              <span>
                {movieData?.created?.time &&
                  new Date(movieData?.created?.time).toDateString()}
              </span>
              <span>{movieData?.time}</span>
              <span>{movieData?.lang}</span>
              {movieData?.country?.map((item) => (
                <Link
                  className="hover:text-blue-500"
                  key={item?.slug}
                  to={`/quoc-gia/` + item?.slug}
                >
                  {item?.name}
                </Link>
              ))}
            </div>
            <div className="border-y border-color-border py-2 flex items-center gap-4">
              <span className="inline-block p-2 px-3.5 text-xl rounded bg-[rgb(41,41,41)]">
                {movieData?.tmdb?.vote_average?.toFixed(1)}
              </span>
              <div className="space-y-0.5">
                <Rate
                  className="text-sm text-blue-500"
                  disabled
                  value={
                    movieData?.tmdb?.vote_average &&
                    Math.floor(movieData?.tmdb?.vote_average)
                  }
                  count={10}
                />
                <div className="text-10">
                  {movieData?.tmdb?.vote_count} đánh giá
                </div>
              </div>
            </div>
            <div className="border-b border-color-border pb-2 flex flex-wrap gap-2">
              {movieData?.category?.map((item) => (
                <Link
                  key={item.slug}
                  to={`/the-loai/` + item?.slug}
                  className="hover:text-blue-500"
                >
                  {item?.name}
                </Link>
              ))}
            </div>
            {/* actions */}
            <div className="flex flex-wrap gap-2 text-xs">
              <ButtonFavorite
                isFavorite={MediaInfoResult.data?.data?.isFavorite as boolean}
                data={{
                  mediaId: slug as string,
                  mediaType: 'movie',
                  mediaName: movieData.name,
                  mediaThumbnail: movieData.thumb_url,
                }}
              />
              <ButtonLike
                isLike={MediaInfoResult.data?.data?.isLike as boolean}
                data={{
                  mediaId: slug as string,
                  mediaType: 'movie',
                  mediaName: movieData.name,
                  mediaThumbnail: movieData.thumb_url,
                }}
              />
            </div>
          </div>
        </article>

        {/* content */}
        <article className="space-y-6">
          <h2 className="pl-3 text-xl font-medium border-l-[3px] border-l-blue-500 leading-5">
            Tóm tắt
          </h2>
          <div
            className="text-color-text-secondary-1"
            dangerouslySetInnerHTML={{ __html: movieData?.content }}
          ></div>
          <iframe
            src={
              `https://www.youtube.com/embed/` +
              movieData?.trailer_url?.split('=')?.[1]
            }
            title={movieData?.name}
            className="aspect-video w-full"
            loading="lazy"
            allowFullScreen
            frameBorder="0"
            allow="autoplay=0; encrypted-media"
          ></iframe>
        </article>

        {/* peopleGroup */}
        {Object.keys(peopleGroup).length > 0 &&
          Object.entries(peopleGroup).map(([key, value]) => (
            <article key={key} className="space-y-6">
              <h2 className="pl-3 border-l-[3px] border-l-blue-500 leading-5">
                {key}
              </h2>
              <ul className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {value?.map((item) => (
                  <li key={item.tmdb_people_id}>
                    <PeopleCard data={item} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
      </div>
    </>
  )
}

export default MovideIdPage
