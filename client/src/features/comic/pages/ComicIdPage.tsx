import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiFillLike, AiFillRead } from 'react-icons/ai'
import { MdFavorite } from 'react-icons/md'
import { SiBookstack } from 'react-icons/si'
import { RiFileList3Line } from 'react-icons/ri'
import { FaEye, FaInfoCircle, FaUser } from 'react-icons/fa'
import {
  otruyenGetChapterId,
  otruyenGetComicApi,
  otruyenGetImage,
} from '../apis/otruyen.api'
import type { IComicDetail } from '../types/otruyen.type'
import ButtonFavorite from '@/features/media-auth/components/ButtonFavorite'
import ButtonLike from '@/features/media-auth/components/ButtonLike'
import { Button } from 'antd'
import { useAuthStore } from '@/features/auth/stores/auth.store'
import { useMediaStore } from '@/features/media-auth/stores/media.store'

const ComicIdPage = () => {
  const { slug } = useParams()
  const getComicIdResult = useQuery({
    queryKey: ['comic', slug],
    queryFn: async () => await otruyenGetComicApi(slug as string),
    enabled: !!slug,
  })

  const comicData = useMemo(() => {
    return getComicIdResult.data?.data?.item as IComicDetail
  }, [getComicIdResult.data])

  const { isAuthenticated } = useAuthStore()
  const { getInfoMedia, addHistory } = useMediaStore()
  const MediaInfoResult = useQuery({
    queryKey: ['movie', 'info', slug],
    queryFn: async () => await getInfoMedia(slug as string, 'comic'),
    enabled: !!(slug && isAuthenticated),
  })

  useEffect(() => {
    if (comicData && isAuthenticated) {
      addHistory({
        mediaId: comicData.slug,
        mediaName: comicData.name,
        mediaThumbnail: comicData.thumb_url,
        mediaType: 'comic',
      })
    }
  }, [isAuthenticated, comicData])

  const comicDetailData = useMemo(() => {
    return [
      {
        icon: <FaUser />,
        title: 'Tác giả',
        value: comicData?.author?.join(', '),
      },
      {
        icon: <FaUser />,
        title: 'Tình trạng',
        value: comicData?.status,
      },
      {
        icon: <AiFillLike />,
        title: `Lượt thích`,
        value: 0,
      },
      {
        icon: <MdFavorite />,
        title: 'Lượt theo dõi',
        value: 0,
      },
      {
        icon: <FaEye />,
        title: 'Lượt xem',
        value: 0,
      },
    ]
  }, [comicData])

  const comicChaptersData = useMemo(() => {
    const chapters = comicData?.chapters?.[0]?.server_data
    return chapters?.sort((a, b) => b.chapter_name - a.chapter_name) || []
  }, [comicData])

  if (!comicData) return

  return (
    <>
      <div className="space-y-8">
        <div className="bg-white rounded p-4 space-y-8">
          {/* top */}
          <div className="flex flex-col sm:flex-row items-start gap-8">
            {/* thumbnail */}
            <div className="mx-auto aspect-thumbnail w-48 overflow-hidden rounded shadow-md">
              <img
                src={otruyenGetImage(comicData?.thumb_url)}
                alt={otruyenGetImage(comicData?.thumb_url)}
                loading="lazy"
                className="img"
              />
            </div>
            {/* detail */}
            <div className="flex-1 space-y-3">
              {/* name */}
              <h2>{comicData?.name}</h2>
              {/* details */}
              <ul className="space-y-2">
                {comicDetailData.map((item) => (
                  <li key={item?.title} className="flex items-center gap-8">
                    <div className="w-32 flex items-center gap-2">
                      {item?.icon}
                      <span>{item?.title}</span>
                    </div>
                    <div className="flex-1">{item?.value}</div>
                  </li>
                ))}
                <li className="flex flex-wrap gap-2 items-center">
                  {comicData?.category?.map((item) => (
                    <Link
                      key={item?.id}
                      to={`/comic/the-loai/` + item?.slug}
                      className="inline-block px-3 py-1 rounded border border-orange-500 hover:text-white hover:bg-orange-500 transition"
                    >
                      {item?.name}
                    </Link>
                  ))}
                </li>
              </ul>
              {/* actions */}
              <div className="flex flex-wrap gap-2">
                {comicChaptersData?.length > 0 && (
                  <Link
                    to={
                      `chapter/` +
                      otruyenGetChapterId(
                        comicChaptersData?.[comicChaptersData.length - 1]
                          ?.chapter_api_data,
                      )
                    }
                  >
                    <Button
                      icon={<SiBookstack />}
                      variant="solid"
                      color="green"
                    >
                      Đọc từ đầu
                    </Button>
                  </Link>
                )}
                {MediaInfoResult.data?.data?.chapter && (
                  <Link to={`chapter/` + MediaInfoResult.data?.data?.chapter}>
                    <Button
                      icon={<AiFillRead />}
                      variant="solid"
                      color="primary"
                    >
                      Đọc tiếp
                    </Button>
                  </Link>
                )}
                <ButtonFavorite
                  isFavorite={MediaInfoResult.data?.data?.isFavorite as boolean}
                  data={{
                    mediaId: slug as string,
                    mediaType: 'comic',
                    mediaName: comicData.name,
                    mediaThumbnail: comicData.thumb_url,
                  }}
                />
                <ButtonLike
                  isLike={MediaInfoResult.data?.data?.isLike as boolean}
                  data={{
                    mediaId: slug as string,
                    mediaType: 'comic',
                    mediaName: comicData.name,
                    mediaThumbnail: comicData.thumb_url,
                  }}
                />
              </div>
            </div>
          </div>
          {/* Introduce */}
          <div>
            <h4 className="flex items-center gap-2 mb-2 text-orange-500">
              <FaInfoCircle />
              Giới thiệu
            </h4>
            <div dangerouslySetInnerHTML={{ __html: comicData?.content }}></div>
          </div>
          {/* Chapter list */}
          <div>
            <h4 className="flex items-center gap-2 mb-2 text-orange-500">
              <RiFileList3Line />
              Danh sách chương
            </h4>
            <ul className="max-h-[500px] overflow-y-auto p-4 border rounded">
              {comicChaptersData?.map((item, idx) => (
                <li
                  key={item?.chapter_api_data + idx}
                  className="py-1 border-b last:border-b-0"
                >
                  <Link
                    to={`chapter/${otruyenGetChapterId(
                      item?.chapter_api_data,
                    )}`}
                    className="block hover:text-orange-500"
                  >
                    Chapter {item?.chapter_name}
                  </Link>
                </li>
              ))}
              {comicChaptersData.length === 0 && (
                <div className="py-4 text-center">Chưa có chương nào</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComicIdPage
