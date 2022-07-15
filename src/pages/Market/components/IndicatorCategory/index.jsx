import React from 'react'
import { Button, Spin } from 'antd'
import { useHistory, useParams } from 'umi'

import Category from './Category'
import New from './Category/Operate/new'

import { useTreeData } from '@/utils/hooks/marketTree'

import styles from './index.less'
import icon_indicator from '@/assets/svg/icon_indicator.svg'

const IndicatorCategory = ({ jumpHash, fromMarket = false }) => {
  const history = useHistory()

  const { loading, treeData = [], refresh } = useTreeData({ auto: true })

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img src={icon_indicator} alt="" className="margin-right-4" />
          <span className={styles.title}>指标目录</span>
        </div>
        <span className={styles.btnGroup}>
          {fromMarket ? (
            <a
              onClick={() => {
                history.push(jumpHash)
              }}
            >
              全部
            </a>
          ) : (
            <New refresh={refresh} />
          )}
        </span>
      </div>
      <Spin spinning={loading} wrapperClassName="spin">
        <Category data={treeData} refresh={refresh} jumpHash={jumpHash} fromMarket={fromMarket} />
      </Spin>
    </div>
  )
}

export default IndicatorCategory
