import { memo, useCallback, useEffect, useMemo } from 'react'
import { FaAngleLeft, FaAngleRight, FaHome, FaList } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import type { IComicDetail } from '../types/otruyen.type'
import { otruyenGetChapterId } from '../apis/otruyen.api'

const ButtonChapterPrevAndNext = ({
  id,
  slug,
  comicData,
}: {
  id: string
  slug: string
  comicData: IComicDetail
}) => {
  const navigate = useNavigate()

  const comicDetailChapterData = useMemo(() => {
    const chapters = comicData?.chapters?.[0]?.server_data || []
    return chapters
  }, [comicData])

  const indexChapter = useMemo(() => {
    const index = comicDetailChapterData?.findIndex(
      (item) => otruyenGetChapterId(item?.chapter_api_data) === id,
    )
    return index
  }, [comicDetailChapterData, id])

  const handleClickPreviousChapter = useCallback(() => {
    if (indexChapter > 0) {
      navigate(
        `/comic/detail/${slug}/chapter/${otruyenGetChapterId(
          comicDetailChapterData[indexChapter - 1]?.chapter_api_data,
        )}`,
      )
    }
  }, [indexChapter, slug, comicDetailChapterData, navigate])

  const handleClickNextChapter = useCallback(() => {
    if (indexChapter < comicDetailChapterData?.length - 1) {
      navigate(
        `/comic/detail/${slug}/chapter/${otruyenGetChapterId(
          comicDetailChapterData[indexChapter + 1]?.chapter_api_data,
        )}`,
      )
    }
  }, [indexChapter, slug, comicDetailChapterData, navigate])

  useEffect(() => {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        if (indexChapter > 0) {
          navigate(
            `/comic/detail/${slug}/chapter/${otruyenGetChapterId(
              comicDetailChapterData[indexChapter - 1]?.chapter_api_data,
            )}`,
          )
        }
      }
      if (e.key === 'ArrowRight') {
        if (indexChapter < comicDetailChapterData?.length - 1) {
          navigate(
            `/comic/detail/${slug}/chapter/${otruyenGetChapterId(
              comicDetailChapterData[indexChapter + 1]?.chapter_api_data,
            )}`,
          )
        }
      }
    })
    return () => {
      document.removeEventListener('keydown', function () {})
    }
  }, [indexChapter, comicDetailChapterData, slug, navigate])

  return (
    <div className="w-full bg-white rounded space-y-4 text-center">
      <button className="bg-green-500 text-white rounded px-3 py-1.5">
        {comicData?.chapters?.[0]?.server_name}
      </button>
      <div className="p-2 rounded bg-sky-100">
        Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter
      </div>
      <div className="max-w-[600px] w-full mx-auto flex items-center gap-2">
        <Link to={`/comic`} className="text-red-500 rounded p-1 inline-block">
          <FaHome size={18} />
        </Link>
        <Link
          to={`/comic/detail/` + comicData?.slug}
          className="text-red-500 rounded p-1 inline-block"
        >
          <FaList size={18} />
        </Link>
        <button
          disabled={indexChapter === 0}
          onClick={handleClickPreviousChapter}
          className="bg-red-500 text-white rounded p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaAngleLeft size={18} />
        </button>
        <select
          className="border rounded px-4 py-1 flex-1 text-center"
          value={id}
          onChange={(e) => {
            const chapter = comicDetailChapterData?.find(
              (item) =>
                otruyenGetChapterId(item?.chapter_api_data) === e.target.value,
            )
            navigate(
              `/comic/detail/${slug}/chapter/${otruyenGetChapterId(
                chapter?.chapter_api_data as string,
              )}`,
            )
          }}
        >
          {comicDetailChapterData?.map((item, idx) => (
            <option
              key={item?.chapter_api_data + idx}
              value={otruyenGetChapterId(item.chapter_api_data)}
              className="py-1 border-b last:border-b-0"
            >
              Chapter {item?.chapter_name}
            </option>
          ))}
        </select>
        <button
          disabled={indexChapter >= comicDetailChapterData?.length - 1}
          onClick={handleClickNextChapter}
          className="bg-red-500 text-white rounded p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaAngleRight size={18} />
        </button>
      </div>
    </div>
  )
}

export default memo(ButtonChapterPrevAndNext)
