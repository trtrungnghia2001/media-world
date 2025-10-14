import { memo, useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import type { ILikeDTO } from '../types'
import { Button } from 'antd'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useMediaStore } from '../stores/media.store'

const ButtonLike = ({ data, isLike }: { isLike: boolean; data: ILikeDTO }) => {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(isLike)
  }, [isLike])

  const { toggleLike } = useMediaStore()
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      return await toggleLike(data)
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
        icon={<AiFillLike />}
        variant="solid"
        color="purple"
      >
        {checked ? 'Hủy thích' : 'Thích'}
      </Button>
    </>
  )
}

export default memo(ButtonLike)
