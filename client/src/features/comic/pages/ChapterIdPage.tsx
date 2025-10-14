import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { otruyenGetChapterApi, otruyenGetComicApi } from '../apis/otruyen.api'
import type { IComicChapter, IComicDetail } from '../types/otruyen.type'
import ButtonChapterPrevAndNext from '../components/ButtonChapterPrevAndNext'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { useMediaStore } from '@/features/media-auth/stores/media.store'

const ChapterIdPage = () => {
  const { id, slug } = useParams()

  const dataResult = useQuery({
    queryKey: ['chapter', id],
    queryFn: async () => {
      return (await otruyenGetChapterApi(id as string))?.data as IComicChapter
    },
    enabled: !!id,
  })
  const getComicIdResult = useQuery({
    queryKey: ['comic', slug],
    queryFn: async () => await otruyenGetComicApi(slug as string),
    enabled: !!slug,
  })
  const comicData = useMemo(() => {
    return getComicIdResult.data?.data?.item as IComicDetail
  }, [getComicIdResult.data])

  const { isAuthenticated } = useAuthStore()
  const { addHistory } = useMediaStore()
  useEffect(() => {
    if (comicData && isAuthenticated && id) {
      addHistory({
        mediaId: comicData.slug,
        mediaName: comicData.name,
        mediaThumbnail: comicData.thumb_url,
        mediaType: 'comic',
        chapter: id,
      })
    }
  }, [id, isAuthenticated, comicData])

  return (
    <>
      <div className="max-w-[1032px] px-4 w-full mx-auto space-y-4">
        {/* top */}
        <ButtonChapterPrevAndNext
          comicData={comicData}
          id={id as string}
          slug={slug as string}
        />
        {/* list image */}
        <div>
          <ul className="space-y-2">
            {dataResult?.data?.item?.chapter_image?.map((item) => (
              <li key={item.image_page} className="w-full">
                <img
                  src={
                    dataResult?.data?.domain_cdn +
                    '/' +
                    dataResult.data?.item?.chapter_path +
                    '/' +
                    item?.image_file
                  }
                  alt=""
                  loading="lazy"
                  className="img"
                />
              </li>
            ))}
          </ul>
        </div>
        {/* bottom */}
        <ButtonChapterPrevAndNext
          comicData={comicData}
          id={id as string}
          slug={slug as string}
        />
      </div>
    </>
  )
}

export default ChapterIdPage
