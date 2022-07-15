import React from 'react'
import { Form, Input, Modal } from 'antd'

import { useRequest } from '@/utils/useRequest'
import { getTrimValue } from '@/utils'
import { updateDataCategory } from '@/services/develop/category'

import styles from '../../index.less'

function Rename(props) {
  // props
  const { pid, id, refresh, name } = props

  // usehook
  const [form] = Form.useForm()
  form.setFieldsValue({ name })

  // useState
  const [visible, set] = React.useState(false)

  // useRequest
  const { query, loading } = useRequest(updateDataCategory)

  return (
    <>
      <div
        className={styles.btn}
        onClick={() => {
          set(true)
        }}
      >
        重命名
      </div>
      <Modal
        title="重命名"
        visible={visible}
        onOk={() => {
          form.validateFields().then(values => {
            query({
              ...values,
              id,
              parent: pid || 0,
              creator: 1,
              editor: 1
            }).then(() => {
              form.resetFields()
              set(false)
              refresh()
            })
          })
        }}
        okButtonProps={{ loading: loading }}
        onCancel={() => {
          set(false)
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="分组名称"
            name="name"
            getValueFromEvent={getTrimValue}
            rules={[
              { required: true, message: '请输入分组名称' },
              { max: 20, message: '名称过长，请重新输入' }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Rename
