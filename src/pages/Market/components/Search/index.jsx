import { Input, Button } from 'antd'
import { useSelector, useDispatch, useHistory } from 'umi'
import styles from './index.less'

const Search = props => {
  const { id } = props
  const dispatch = useDispatch()
  const history = useHistory()

  const {
    searchVal,
    searchParams: { pageNum, pageSize }
  } = useSelector(({ market }) => {
    return {
      ...market
    }
  })

  // 输入框改变事件
  const changeVal = e => {
    dispatch({
      type: 'market/changeState',
      payload: {
        searchVal: e.target.value.trim(),
        pageNum,
        pageSize
      }
    })
  }

  // 查询
  const searchData = () => {
    dispatch({
      type: 'market/getMarkeList',
      payload: {
        name: searchVal,
        pageNum: 1,
        pageSize: 10,
        categoryId: id
      }
    })
    dispatch({
      type: 'market/changeState',
      payload: {
        pageNum,
        pageSize
      }
    })
  }

  // 重置
  const resetQuery = () => {
    dispatch({
      type: 'market/getMarkeList',
      payload: {
        pageNum: 1,
        pageSize: 10
      }
    })
    dispatch({
      type: 'market/changeState',
      payload: {
        searchVal: ''
      }
    })
    history.push('/market')
  }

  return (
    <div className={styles.container}>
      <div className={styles.name}>指标名称</div>
      <Input value={searchVal} className={styles.input} placeholder="请输入" onChange={changeVal} />
      <Button type="primary" className={styles.searchBtn} onClick={searchData}>
        查询
      </Button>
      <Button className={styles.resetBtn} onClick={resetQuery}>
        重置
      </Button>
    </div>
  )
}

export default Search
