import React from 'react'

import { useRequest } from '@/utils/useRequest'

import { getDataCategoryTree } from '@/services/develop/category'

const format = list =>
  list?.children?.map(re => {
    // console.log(list,'-----------------------------------------');
    const { name, id, parent } = re || {}
    return {
      title: name,
      value: id,
      key: id,
      pid: parent, // 父id
      children: format(re)
    }
  }) || []

export const useTreeData = ({ auto } = {}) => {
  const { loading, data = {}, query } = useRequest(getDataCategoryTree, { cache: true, auto })

  const treeData = format(data)

  return { loading, treeData, refresh: query }
}
