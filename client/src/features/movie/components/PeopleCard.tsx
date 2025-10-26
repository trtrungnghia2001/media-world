import { memo } from 'react'
import type { IOphimPeople } from '../types/ophim.type'
import { ophimGetProfile } from '../apis/ophim.api'
import { MOVIE_IMAGE_DEFAULT } from '../constants/image.constant'

const PeopleCard = ({ data }: { data: IOphimPeople }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="max-w-14 min-w-14 aspect-square">
        <img
          src={
            ophimGetProfile(data.profile_path) ||
            MOVIE_IMAGE_DEFAULT.avatar_notfound_image
          }
          loading="lazy"
          alt="avatar"
          className="img"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <h4 className="line-clamp-1 font-medium text-sm">{data.character}</h4>
        <h4 className="line-clamp-1 text-gray-500 text-13">{data.name}</h4>
      </div>
    </div>
  )
}

export default memo(PeopleCard)
