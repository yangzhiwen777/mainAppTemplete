import React, { useState, useEffect } from 'react'
import { Empty, Spin, Pagination } from 'antd'
import { useSelector } from 'umi'
import styles from './index.less'

const Table = ({ renderData, visible, searchByPage }) => {
  const { tableHeaderName = [], tableContent = [], isDetailsFlag = false, total } = renderData
  const [isShow, setIsShow] = useState(false)
  const [detailTitle, setDetailTitle] = useState('')
  const [detailHeader, setDetailHeader] = useState([])
  const [detailContent, setDetailContent] = useState([])

  const { isLoadingSearch } = useSelector(({ market }) => {
    return { ...market }
  })

  useEffect(() => {
    if (!visible) {
      setIsShow(false)
    }
  }, [visible])

  // 显示
  const show = item => {
    setDetailTitle(item.label)
    setDetailHeader([...item.indexValue.tableHeaderName])
    const obj = {}
    item.indexValue.tableHeaderName.forEach(item => {
      obj[item] = item
    })
    const data = [...item.indexValue.tableContent]
    data.unshift(obj)
    setDetailContent([...data])
    setIsShow(true)
  }

  const hidden = () => {
    setIsShow(false)
  }
  // 页码改变事件
  const pageChange = (pageNum, pageSize) => {
    searchByPage(pageNum, pageSize)
  }

  return (
    <div className={styles.render} style={{ position: 'relative' }}>
      <Spin spinning={isLoadingSearch} style={{ flex: 1 }}>
        {/* 渲染数据 标题 */}
        <div className={styles.dataTitleContainer}>
          {tableHeaderName.map((item, index) => {
            return (
              <div className={styles.title} key={index}>
                {item}
              </div>
            )
          })}
        </div>

        {/* 渲染数据 内容 */}
        <div
          className={styles.listContent}
          style={{ justifyContent: tableContent.length > 0 ? '' : 'center' }}
        >
          {tableContent.length > 0 ? (
            <div>
              {tableContent.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.list}
                    style={{ backgroundColor: index % 2 === 0 ? '#fff' : '' }}
                  >
                    <div className={styles.listItem}>{item.label}</div>
                    <div
                      className={styles.listItem}
                      onClick={() => {
                        if (isDetailsFlag) {
                          show(item)
                        }
                      }}
                      style={{
                        color: isDetailsFlag ? '#1577ff' : '',
                        cursor: isDetailsFlag ? 'pointer' : ''
                      }}
                    >
                      {isDetailsFlag ? '查看详情' : item.indexValue}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <Empty></Empty>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          {tableContent.length > 0 ? (
            <Pagination size="small" total={total} onChange={pageChange} />
          ) : null}
        </div>
        {/* </Spin> */}

        {/* 详细弹窗 */}

        {isShow && (
          <div className={styles.detailContennar}>
            {/* 关闭 头 */}
            <div className={styles.titleClose}>
              <div className={styles.title}>{detailTitle}</div>
              <div className={styles.close} onClick={hidden}>
                x
              </div>
            </div>

            {/* 标题 */}
            {/* <div className={styles.detailTitleContainer}>
            {detailHeader.map((item, index) => {
              return (
                <div className={styles.title} key={index} style={{ width: 200 }}>
                  {item}
                </div>
              )
            })}
          </div> */}

            {/* 内容 */}
            <div className={styles.listContent} style={{ position: 'relative' }}>
              {detailContent.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.list}
                    style={{
                      width: detailHeader.length * 200,
                      backgroundColor: index === 0 ? '#f4f4f4' : '#fff',
                      fontWeight: index === 0 ? 700 : '',
                      fontSize: index === 0 ? 15 : ''
                    }}
                  >
                    {Object.keys(item).map((item1, index1) => {
                      return (
                        <div key={index1} className={[styles.listItem].join(' ')}>
                          {item[item1]}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Spin>
    </div>
  )
}
export default Table
