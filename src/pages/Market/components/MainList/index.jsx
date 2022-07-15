import { Empty, Spin } from 'antd'
import { useSelector } from 'umi'
import MainListItem from './components/MainListItem'
import styles from './index.less'
const MainList = props => {
  const { onSearchResult, onGatewayHandle, toViewHandle } = props

  const { list = [], isLoadingMarkeList } = useSelector(({ market }) => {
    return {
      ...market
    }
  })
  // console.log(list);

  return (
    <div className={styles.container} style={{ justifyContent: list.length === 0 ? 'center' : '' }}>
      <Spin spinning={isLoadingMarkeList}>
        {list.length > 0 ? (
          list.map(item => {
            return (
              <MainListItem
                {...item}
                key={item.id}
                onSearchResult={onSearchResult}
                onGatewayHandle={onGatewayHandle}
                toViewHandle={toViewHandle}
              ></MainListItem>
            )
          })
        ) : (
          <Empty />
        )}
      </Spin>
    </div>
  )
}
export default MainList
