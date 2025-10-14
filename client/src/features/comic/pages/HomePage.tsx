import { useQuery } from '@tanstack/react-query'
import ComicCard from '../components/ComicCard'
import type { IComic } from '../types/otruyen.type'
import ComicSide from '../components/ComicSide'
import { otruyenGetHomeApi, otruyenGetListApi } from '../apis/otruyen.api'

const HomePage = () => {
  const getHomeResult = useQuery({
    queryKey: ['home'],
    queryFn: async () => await otruyenGetHomeApi(),
  })
  const getCompleteComicResult = useQuery({
    queryKey: ['hoan-thanh'],
    queryFn: async () => await otruyenGetListApi('hoan-thanh'),
  })
  const getComingComicResult = useQuery({
    queryKey: ['sap-ra-mat'],
    queryFn: async () => await otruyenGetListApi('sap-ra-mat'),
  })
  return (
    <>
      <div className="space-y-8">
        {/* Head */}
        <div className="text-center px-4">
          <h3>{getHomeResult.data?.data?.seoOnPage?.titleHead}</h3>
          <p>{getHomeResult.data?.data?.seoOnPage?.descriptionHead}</p>
        </div>
        <ComicSide data={getHomeResult.data?.data?.items} />
        {/* comics */}
        <div className="bg-white p-4 rounded space-y-8">
          {/* Truyện mới cập nhật */}
          <div>
            <h2 className="text-xl font-medium mb-4">Truyện mới cập nhật</h2>
            <div className="grid gap-4 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {getComingComicResult.data?.data?.items?.map((item: IComic) => (
                <ComicCard key={item._id} data={item} />
              ))}
            </div>
          </div>
          {/* Truyện đã hoàn thành */}
          <div>
            <h2 className="text-xl font-medium mb-4">Truyện đã hoàn thành</h2>
            <div className="grid gap-4 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {getCompleteComicResult.data?.data?.items?.map((item: IComic) => (
                <ComicCard key={item._id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
