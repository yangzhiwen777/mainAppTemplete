import React from 'react'
import { Menu } from 'antd'

import Tree from './Tree'
import New from './Operate/new'
import Rename from './Operate/rename'
import Delete from './Operate/delete'
import Move from './Operate/move'

const Category = ({ jumpHash, data, refresh, fromMarket }) => {
  const operateMenu = data => {
    const { id, name, pid, isLeaf, includeCategory } = data

    return (
      <Menu>
        <Menu.Item key="1">
          <New refresh={refresh} id={id} inTip />
        </Menu.Item>
        <Menu.Item key="2">
          <Delete refresh={refresh} id={id} isLeaf={isLeaf} />
        </Menu.Item>
        <Menu.Item key="3">
          <Rename refresh={refresh} id={id} pid={pid} name={name} />
        </Menu.Item>
        <Menu.Item key="4">
          <Move refresh={refresh} id={id} includeCategory={includeCategory} />
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Tree
      data={data}
      operateMenu={operateMenu}
      refresh={refresh}
      jumpHash={jumpHash}
      fromMarket={fromMarket}
    />
  )
}

export default Category
