import { useAuthStore } from '@/features/auth/stores/auth.store'
import type { IChangePasswordDTO } from '@/features/auth/types/auth'
import { useMutation } from '@tanstack/react-query'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'

type FieldType = IChangePasswordDTO

const initialValues: FieldType = {
  password: '',
  confirm_password: '',
}

const UpdatePasswordPage = () => {
  const [form] = Form.useForm()
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values)
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
  }

  const { changePassword } = useAuthStore()

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IChangePasswordDTO) => await changePassword(data),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  })

  return (
    <Form
      name="password"
      form={form}
      initialValues={initialValues}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        label="Confirm password"
        name="confirm_password"
        rules={[
          { required: true, message: 'Please input your confirm password!' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={isPending}
          loading={isPending}
          type="primary"
          htmlType="submit"
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UpdatePasswordPage
