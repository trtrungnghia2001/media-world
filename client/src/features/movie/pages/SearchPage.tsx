import useSearchParamsValue from '@/shared/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {
  ophimGetCategoriesApi,
  ophimGetCountriesApi,
  ophimGetListMovieApi,
  ophimGetSearchMovieApi,
} from '../apis/ophim.api'
import type { IMovie, OphimListMoveType } from '../types/ophim.type'
import InputSearch from '../components/InputSearch'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import MovieCard from '../components/MovieCard'
import PaginateComponent from '../components/paginate-component'
import MovieFilterGroup from '../components/MovieFilterGroup'

const SearchPage = () => {
  const { slug } = useParams()
  const location = useLocation()
  const pathnameType = useMemo(
    () => location.pathname.split('/').filter((item) => item !== '')?.[1],
    [location.pathname],
  )

  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const getDataResult = useQuery({
    queryKey: ['search', slug, searchParams.toString()],
    queryFn: async () => {
      if (slug) {
        if (pathnameType === `danh-muc`) {
          return await ophimGetListMovieApi(
            slug as OphimListMoveType,
            searchParams.toString(),
          )
        }
        if (pathnameType === `the-loai`) {
          return await ophimGetCategoriesApi(slug, searchParams.toString())
        }
        if (pathnameType === `quoc-gia`) {
          return await ophimGetCountriesApi(slug, searchParams.toString())
        }
      }

      return await ophimGetSearchMovieApi(searchParams.toString())
    },
  })

  return (
    <div className="space-y-4">
      {/* filter */}
      {![`tim-kiem`, `quoc-gia`, `the-loai`].includes(pathnameType) && (
        <MovieFilterGroup
          slug={slug as string}
          searchParams={searchParams}
          handleSearchParams={handleSearchParams}
        />
      )}

      {/* content */}
      {[`quoc-gia`, `the-loai`].includes(pathnameType) && (
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-color-border h-0.5"></div>
          <h2 className="text-xl">
            {getDataResult.data?.data?.seoOnPage?.titleHead}
          </h2>
          <div className="flex-1 bg-color-border h-0.5"></div>
        </div>
      )}

      {/* content */}
      {[`tim-kiem`].includes(pathnameType) && (
        <>
          <div className="sm:hidden">
            <InputSearch />
          </div>
          <div className="text-color-text-secondary-1">
            <h4>{getDataResult.data?.data?.seoOnPage?.titleHead}</h4>
            <div>{getDataResult.data?.data?.seoOnPage?.descriptionHead}</div>
          </div>
        </>
      )}

      {/* results */}
      {getDataResult.isLoading && (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array(30)
            .fill(0)
            .map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
        </div>
      )}

      {/* no results */}
      {getDataResult.data?.data?.items?.length === 0 && (
        <div>Không tìm thấy kết quả nào.</div>
      )}

      {/* paginate */}
      {!getDataResult.isLoading &&
        getDataResult.data?.data?.items?.length > 0 && (
          <>
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {getDataResult.data?.data?.items?.map((item: IMovie) => (
                <MovieCard key={item._id} data={item} />
              ))}
            </div>
            <PaginateComponent
              forcePage={
                Number(
                  getDataResult.data?.data?.params?.pagination?.currentPage,
                ) - 1
              }
              pageCount={Math.ceil(
                getDataResult.data?.data?.params?.pagination?.totalItems /
                  getDataResult.data?.data?.params?.pagination
                    ?.totalItemsPerPage,
              )}
              onPageChange={(e) =>
                handleSearchParams('page', (e.selected + 1).toString())
              }
            />
          </>
        )}
    </div>
  )
}

export default SearchPage
