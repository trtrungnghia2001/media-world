// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import Swiper core and required modules
import { Autoplay } from 'swiper/modules'
import { memo } from 'react'
import type { IComic } from '../types/otruyen.type'
import ComicSideItem from './ComicSideItem'

const ComicSide = ({ data }: { data: IComic[] }) => {
  return (
    <div className="bg-white p-4 rounded">
      <h2 className="text-xl font-medium mb-4">Truyện đề cử</h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {data?.map((item) => (
          <SwiperSlide key={item?._id}>
            <ComicSideItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default memo(ComicSide)
