import useSearchParamsValue from '@/shared/hooks/useSearchParamsValue'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import {
  otruyenGetCategoryApi,
  otruyenGetListApi,
  otruyenGetSearchApi,
} from '../apis/otruyen.api'
import type { ComicListType, IComic } from '../types/otruyen.type'
import InputSearch from '../components/InputSearch'
import ComicCard from '../components/ComicCard'
import PaginateComponent from '../components/paginate-component'

const SearchPage = () => {
  const { slug, type } = useParams()
  const location = useLocation()
  const { searchParams, handleSearchParams } = useSearchParamsValue()
  const dataResult = useQuery({
    queryKey: ['search', slug, type, searchParams.toString()],
    queryFn: async () => {
      if (location.pathname.includes('/the-loai') && slug) {
        return await otruyenGetCategoryApi(slug, searchParams.toString())
      }
      if (location.pathname.includes('/xep-hang') && type) {
        return await otruyenGetListApi(
          type as ComicListType,
          searchParams.toString(),
        )
      }
      return await otruyenGetSearchApi(searchParams.toString())
    },
  })

  return (
    <>
      <div className="sm:hidden mb-4">
        <InputSearch />
      </div>
      <div className="bg-white rounded p-4 space-y-8">
        {/* Head */}
        <div>
          <h3>{dataResult.data?.data?.seoOnPage?.titleHead}</h3>
          <p>{dataResult.data?.data?.seoOnPage?.descriptionHead}</p>
        </div>
        {dataResult.data?.data?.items?.length > 0 && (
          <div className="grid gap-4 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {dataResult.data?.data?.items?.map((item: IComic) => {
              return <ComicCard key={item?.slug} data={item} />
            })}
          </div>
        )}
        {dataResult.data?.data?.items?.length === 0 && (
          <div>Không tìm thấy kết quả nào.</div>
        )}
        {!dataResult.isLoading && dataResult.data && (
          <PaginateComponent
            forcePage={
              Number(dataResult.data?.data?.params?.pagination?.currentPage) - 1
            }
            pageCount={Math.ceil(
              dataResult?.data?.data?.params?.pagination?.totalItems /
                dataResult?.data?.data?.params?.pagination?.totalItemsPerPage,
            )}
            onPageChange={(page) =>
              handleSearchParams('page', (page.selected + 1).toString())
            }
          />
        )}
      </div>
    </>
  )
}

export default SearchPage
