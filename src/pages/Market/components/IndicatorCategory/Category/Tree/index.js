/* eslint-disable @typescript-eslint/prefer-for-of */
import React, { useRef, useState } from 'react'
import { Tree, Input, Dropdown, Tooltip } from 'antd'

import { useHistory, useParams } from 'umi'
import { loop, getIncludeCategory } from './utils'

import styles from './index.less'
import treeMore from '@/assets/svg/icon_tree_more.svg'

function CategoryTree(props) {
  // 受控输入框
  const [searchIpt, setSearchIpt] = useState('')
  // props
  const { data, operateMenu, jumpHash, move, customClickFn, height, refresh, fromMarket } = props

  // useHook
  const { id: _id } = useParams()
  const id = Number(_id) // 路由上取的id默认是string类型，转成number才能默认选中树节点
  const history = useHistory()

  // useState
  const [expandedKeys, setExpandedKeys] = React.useState([id]) // （受控）展开指定的树节点
  const [selectedKeys, setSelectedKeys] = React.useState([id]) // （受控）设置选中的树节点
  // const [autoExpandParent, setAutoExpandParent] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [NodeTreeItem, setNodeTreeItem] = React.useState({}) // 节点右侧的操作图标

  // effect
  React.useEffect(() => {
    // 第一次渲染是data为[]，需要监听data来重新给expandedKeys赋值，才能展开指定的树节点
    setExpandedKeys([id])
    // data变化时，清空目录树种的右侧操作图标
    setNodeTreeItem({})
  }, [data])

  // 选中树节点
  const onSelect = selectedKeysValue => {
    setSearchIpt('')
    setSelectedKeys(selectedKeysValue)
    const id = selectedKeysValue?.[0]
    if (id) {
      history.push(`${jumpHash}/${id}`)
    }
  }

  // 将树形节点改为一维数组
  const generateList = (res, dataList) => {
    for (let i = 0; i < res.length; i++) {
      const node = res[i]
      const { key, title } = node
      dataList.push({ key, title })
      if (node.children) {
        generateList(node.children, dataList)
      }
    }
    return dataList
  }

  const getParentKey = (key, tree) => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  const onChange = e => {
    let { value } = e.target
    setSearchIpt(e.target.value)
    value = String(value).trim()
    const dataList = generateList(data, [])
    const keys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1 && value) {
          return getParentKey(item.key, data)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    setExpandedKeys(keys)
    // setAutoExpandParent(true)
    setSearchValue(value)
  }

  const onSearch = v => {
    refresh({ name: v?.trim() }) // 前后空格处理
  }

  // 在树节点右侧添加操作的图标
  const getNodeTreeMenu = () => {
    const { pageX, pageY } = { ...NodeTreeItem }
    const tmpStyle = {
      position: 'absolute',
      maxHeight: 40,
      textAlign: 'center',
      left: `${pageX - 20}px`,
      top: `${pageY + 40}px`,
      display: 'flex',
      flexDirection: 'row',
      zIndex: 99
    }
    return (
      <div style={tmpStyle}>
        <div>
          <Dropdown
            placement="bottomLeft"
            overlay={operateMenu?.(NodeTreeItem)}
            trigger={['hover', 'click']}
          >
            <img src={treeMore} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </div>
      </div>
    )
  }

  // 鼠标划入，设置当前节点的属性，用于展示操作图标
  const onMouseEnter = e => {
    const x = e.event.currentTarget.offsetLeft + e.event.currentTarget.clientWidth
    const y =
      e.event.currentTarget.offsetTop - e.event.currentTarget.offsetParent.offsetParent.scrollTop
    setNodeTreeItem({
      pageX: x,
      pageY: y,
      id: e.node.key,
      pid: e.node.pid,
      name: e.node.title_original,
      isLeaf: e.node.children?.length === 0, // 是否为叶子节点
      includeCategory: getIncludeCategory(e.node.children || [], e.node.key) // 当前目录及当前目录子目录的集合 [0, 0-1, 0-1-1]
    })
  }

  // 展开/收起节点时触发
  const onExpand = expandedKeysValue => {
    setExpandedKeys(expandedKeysValue)
    // setAutoExpandParent(false)
  }

  return (
    <div className={styles.tree}>
      {!fromMarket && JSON.stringify(NodeTreeItem) !== '{}' ? getNodeTreeMenu() : ''}
      <Input.Search
        value={searchIpt}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="请输入"
        style={{ marginBottom: 8 }}
      />
      {move ? (
        <Tree
          showLine={{ showLeafIcon: false }}
          onSelect={(keys, e) => {
            customClickFn(keys, e)
          }}
          treeData={loop(data, searchValue)}
          height={height}
          autoExpandParent // ={autoExpandParent} // 是否自动展开父节点
          expandedKeys={expandedKeys} // （受控）展开指定的树节点
          onExpand={onExpand}
        />
      ) : (
        <div className={styles.treeContainer}>
          <Tree
            blockNode
            treeData={loop(data, searchValue)}
            showLine={{ showLeafIcon: false }} // 是否展示连接线
            autoExpandParent // ={autoExpandParent} // 是否自动展开父节点
            expandedKeys={expandedKeys} // （受控）展开指定的树节点
            onExpand={onExpand} // 展开/收起节点时触发
            selectedKeys={selectedKeys} // （受控）设置选中的树节点
            onSelect={onSelect}
            onMouseEnter={onMouseEnter}
            height={height}
            titleRender={v => (
              <div>
                <div style={{ color: 'rgba(0,0,0,0.65)' }}>
                  <Tooltip
                    placement="topLeft"
                    title={v.title}
                    color="#666"
                    overlayStyle={{ maxWidth: 350 }}
                  >
                    <span className="truncate-common margin-right-16">{v.title}</span>
                  </Tooltip>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default CategoryTree
