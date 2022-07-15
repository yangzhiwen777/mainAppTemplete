import React from 'react'
import { Form, Input, Modal } from 'antd'

import { useRequest } from '@/utils/useRequest'
import { getTrimValue } from '@/utils'
import { createDataCategory } from '@/services/develop/category'

import styles from './index.less'
import { PlusOutlined } from '@ant-design/icons'
function NewCategory(props) {
  const { id, refresh, inTip } = props

  // useState
  const [visible, set] = React.useState(false)

  // useRequest
  const { query, loading } = useRequest(createDataCategory)

  // useForm
  const [form] = Form.useForm()

  return (
    <>
      {inTip ? (
        <span
          onClick={() => {
            set(true)
          }}
          type="text"
        >
          新建分组
        </span>
      ) : (
        <span
          className={styles.newCatalogBtn}
          onClick={() => {
            set(true)
          }}
          type="text"
        >
          新建分组
        </span>
      )}
      <Modal
        title="新建分组"
        visible={visible}
        okButtonProps={{ loading: loading }}
        onOk={() => {
          form.validateFields().then(values => {
            query({
              ...values,
              parent: id || 0,
              creator: 1,
              editor: 1
            }).then(() => {
              form.resetFields()
              set(false)
              refresh()
            })
          })
        }}
        onCancel={() => {
          // 清空输入
          form.resetFields()
          set(false)
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: '未命名' }}
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

export default NewCategory
