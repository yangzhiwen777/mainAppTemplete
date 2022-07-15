import React from 'react'
import { Modal, message } from 'antd'

import { useRequest } from '@/utils/useRequest'
import { deleteDataCategory } from '@/services/develop/category'

import { ExclamationCircleOutlined } from '@ant-design/icons'
function Delete(props) {
  const { id, refresh, isLeaf } = props

  // useRequest
  const { query, loading } = useRequest(deleteDataCategory)

  return (
    <div
      onClick={() => {
        if (isLeaf) {
          Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '您确定要删除该分组吗？',
            onOk() {
              query({ id }).then(() => {
                refresh()
              })
            },
            okButtonProps: { loading: loading },
            onCancel() {}
          })
        } else {
          message.warning('请先移除该分组下的其它分组')
        }
      }}
    >
      删除
    </div>
  )
}

export default Delete
