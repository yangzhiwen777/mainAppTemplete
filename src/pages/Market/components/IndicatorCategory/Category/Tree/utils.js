import React from 'react'

import styles from '../../index.less'

export const loop = (data, searchValue) =>
  data?.map(item => {
    const index = item.title.indexOf(searchValue)
    const beforeStr = item.title.substr(0, index)
    const afterStr = item.title.substr(index + searchValue?.length)
    const title =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className={styles['site-tree-search-value']}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      )
    if (item.children) {
      return {
        pid: item.pid,
        key: item.key,
        title,
        children: loop(item.children, searchValue),
        title_original: item.title,
        item
      }
    }
    return {
      pid: item.pid,
      key: item.key,
      title,
      title_original: item.title,
      item
    }
  })

// 获取当前目录（包含当前目录）下的所有子目录的key
export const getIncludeCategory = (arr, currentKey) => {
  const flag = [currentKey]
  const format = arr2 => {
    try {
      arr2.forEach(item => {
        flag.push(item.key)
        if (item.children.length) {
          format(item.children)
        }
      })
    } catch {}
  }
  format(arr)
  return flag
}
