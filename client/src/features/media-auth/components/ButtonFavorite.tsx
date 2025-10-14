import { memo, useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'
import type { IFavoriteDTO } from '../types'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Button } from 'antd'
import { useMediaStore } from '../stores/media.store'

const ButtonFavorite = ({
  data,
  isFavorite,
}: {
  isFavorite: boolean
  data: IFavoriteDTO
}) => {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(isFavorite)
  }, [isFavorite])

  const { toggleFavorite } = useMediaStore()
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      return await toggleFavorite(data)
    },
    onSuccess: (data) => {
      toast.success(data.message)
      setChecked(!checked)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      <Button
        onClick={() => mutate()}
        loading={isPending}
        icon={<MdFavorite />}
        variant="solid"
        color="red"
      >
        {checked ? 'Hủy theo dõi' : 'Theo dõi'}
      </Button>
    </>
  )
}

export default memo(ButtonFavorite)
