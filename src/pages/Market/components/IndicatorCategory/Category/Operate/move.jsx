/* eslint-disable sonarjs/no-identical-functions */
import React from 'react'
import { Radio, Modal, message, Spin } from 'antd'
import MyEmpty from '@/components/Empty'

import Tree from '../Tree'

import { useRequest } from '@/utils/useRequest'
import { updateDataCategory } from '@/services/develop/category'
import { useTreeData } from '../../state'

function Move(props) {
  // props
  const { id, refresh, includeCategory } = props // id：被移动的节点id includeCategory 当前目录及子目录的id集合 [0, 0-1, 0-1-1]
  // console.log(props);

  // useState
  const [visible, setVisible] = React.useState(false)
  const [type, setType] = React.useState(true) // true：移到同级 false：移到子级
  const [target, setTarget] = React.useState({}) // 目标位置 current 当前节点id, parent 父id

  // useTreeData
  const { loading, treeData = [], refresh: query } = useTreeData()

  // useRequest
  const { query: update, loading: okLoading } = useRequest(updateDataCategory)

  // useEffect
  // React.useEffect(() => {
  //   if (visible) query()
  // }, [visible])

  // fn
  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    if (JSON.stringify(target) !== '{}') {
      // 不能移动到 当前目录及子目录 的 同级或子级
      if (includeCategory.includes(target?.current)) {
        message.warning('不可以移动到当前位置！')
        return
      }
      // 移到已选节点的同级，parent=已选节点的父id 移到已选节点的子级，parent=已选节点的id
      const parent = type ? target.parent : target.current
      update({ id, parent }).then(() => {
        setVisible(false)
        setTarget({})
        refresh()
      })
    } else {
      message.warning('请先选择移动的位置！')
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setTarget({})
  }

  // 选择目标节点的事件
  const handleCategoryTree = (v, e) => {
    if (v.length === 0) {
      setTarget({})
    } else {
      // 记录目标节点的id和父id
      setTarget({ current: v[0], parent: e?.node?.pid })
    }
  }

  // radio切换事件
  const onChange = e => {
    setType(e.target.value)
  }

  return (
    <>
      <div onClick={showModal}>移动到 &gt;</div>
      <Modal
        title="移动到"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ loading: okLoading }}
      >
        <div style={{ marginBottom: 16 }}>
          <Radio.Group onChange={onChange} value={type}>
            <Radio value>同级</Radio>
            <Radio value={false}>子级</Radio>
          </Radio.Group>
        </div>
        <Spin spinning={loading}>
          {treeData?.length ? (
            <Tree
              data={treeData}
              move
              customClickFn={handleCategoryTree}
              height={300}
              refresh={query}
            />
          ) : (
            <MyEmpty description="暂无目录" />
          )}
        </Spin>
      </Modal>
    </>
  )
}

export default Move
