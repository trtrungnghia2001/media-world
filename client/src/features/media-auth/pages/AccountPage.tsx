import { useAuthStore } from '@/features/auth/stores/auth.store'
import type { IUpdateMeDTO, IUser } from '@/features/auth/types/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

type FieldType = Partial<IUser>

const initialValues: FieldType = {
  name: '',
  address: '',
  phoneNumber: '',
  education: '',
  bio: '',
}

const AccountPage = () => {
  const [form] = Form.useForm()
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values as IUpdateMeDTO)
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
  }

  const { getMe, updateMe } = useAuthStore()
  const { isLoading, data } = useQuery({
    queryKey: ['me'],
    queryFn: async () => await getMe(),
  })
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data.data)
    }
  }, [data])

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IUpdateMeDTO) => await updateMe(data),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  })

  if (isLoading)
    return <div className="text-gray-500 text-center">Loading...</div>

  return (
    <Form
      name="account"
      form={form}
      initialValues={initialValues}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType> label="Address" name="address">
        <Input />
      </Form.Item>
      <Form.Item<FieldType> label="Phone Number" name="phoneNumber">
        <Input />
      </Form.Item>
      <Form.Item<FieldType> label="Bio" name="bio">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={isPending}
          loading={isPending}
          type="primary"
          htmlType="submit"
        >
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AccountPage
