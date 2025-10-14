import ComicCard from '@/features/comic/components/ComicCard'
import { useMediaStore } from '../stores/media.store'
import { useQuery } from '@tanstack/react-query'
import type { IComic } from '@/features/comic/types/otruyen.type'
import MovieCard from '@/features/movie/components/MovieCard'
import type { IMovie } from '@/features/movie/types/ophim.type'
import useSearchParamsValue from '@/shared/hooks/useSearchParamsValue'
import PaginateComponent from '@/features/comic/components/paginate-component'

const LikePage = () => {
  const { mediasLike, getLikes } = useMediaStore()

  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const { isLoading, data } = useQuery({
    queryKey: ['like', searchParams.toString()],
    queryFn: async () => await getLikes(searchParams.toString()),
  })

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>

  if (mediasLike.length === 0)
    return <div className="text-center text-gray-500">Your list is empty</div>

  return (
    <div className="space-y-4">
      <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {mediasLike.map((m) => {
          switch (m.mediaType) {
            case 'comic':
              return (
                <ComicCard
                  key={m._id}
                  data={
                    {
                      thumb_url: m.mediaThumbnail,
                      name: m.mediaName,
                      slug: m.mediaId,
                    } as IComic
                  }
                />
              )
            case 'movie':
              return (
                <MovieCard
                  key={m._id}
                  data={
                    {
                      thumb_url: m.mediaThumbnail,
                      name: m.mediaName,
                      slug: m.mediaId,
                    } as IMovie
                  }
                />
              )
          }
        })}
      </div>
      {data?.pagination && (
        <PaginateComponent
          forcePage={Number(data.pagination.page) - 1}
          pageCount={data.pagination.totalPages}
          onPageChange={(page) =>
            handleSearchParams('_page', (page.selected + 1).toString())
          }
        />
      )}
    </div>
  )
}

export default LikePage
