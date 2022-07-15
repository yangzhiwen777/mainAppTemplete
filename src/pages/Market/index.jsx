import React, { useEffect, useState } from 'react'
import { Layout, Pagination, Drawer, Button, Space, DatePicker, Form, Input, Spin } from 'antd'
import { useParams, useDispatch, useSelector } from 'umi'
import DetailDrawer from '@/components/DetailDrawer'
import IndicatorCategoryTree from './components/IndicatorCategory'
import styles from './index.less'
import Search from './components/Search'
import MainList from './components/MainList'
import Table from './components/Table'
import { getTrimValue } from '@/utils'

const { Sider, Content } = Layout
const { TextArea } = Input

const Market = () => {
  // 路由中携带的指标目录id
  const { id } = useParams()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')

  // 操作类型 结果查询 or 上下架
  const [operateType, setOperateType] = useState('searchResult')
  const [isShowDetailDrawer, setIsShowDetailDrawer] = useState(false)
  const {
    searchParams: { pageNum, pageSize },
    indexCode,
    startTime,
    endTime,
    searchData,
    total,
    basicInfoList,
    scheduleInfoList,
    configList,
    isLoadingInfoData
  } = useSelector(({ market }) => {
    return {
      ...market
    }
  })
  const [form] = Form.useForm()

  useEffect(() => {
    getMarketDataList()
  }, [id, pageNum, pageSize])

  // useEffect(() => {
  // dispatch({
  //   type: 'market/getTreeData'
  // })
  // }, [])
  // 获取首页数据
  const getMarketDataList = () => {
    dispatch({
      type: 'market/changeState',
      payload: {
        searchVal: ''
      }
    })
    if (!id) {
      dispatch({
        type: 'market/getMarkeList',
        payload: {
          pageNum,
          pageSize
        }
      })
    } else {
      dispatch({
        type: 'market/getMarkeList',
        payload: {
          categoryId: id,
          pageNum,
          pageSize
        }
      })
    }
  }

  // 页码改变事件
  const pageChange = (pageNum, pageSize) => {
    dispatch({
      type: 'market/changeSearchParams',
      payload: {
        pageNum,
        pageSize
      }
    })
  }

  // 关闭 结果查询抽屉
  const closeSearchDrawer = async () => {
    if (operateType === 'add') {
      const res = await form.validateFields()
      // res &&
      //   (await dispatch({
      //     type: 'market/aaa',
      //     payload: {
      //       indexCode,
      //       apiName: res.apiName,
      //       node: res.node || ''
      //     }
      //   }))
      // getMarketDataList()
    }
    dispatch({
      type: 'market/changeState',
      payload: {
        startTime: '',
        endTime: '',
        searchData: {}
      }
    })
    form.resetFields()
    setVisible(false)
  }

  // 结果查询操作
  const onSearchResult = (indexCode, name) => {
    setTitle(name)
    setOperateType('searchResult')
    dispatch({
      type: 'market/changeState',
      payload: {
        indexCode
      }
    })
    dispatch({
      type: 'market/getIndexDispatchResultData',
      payload: {
        indexCode: indexCode,
        startTime,
        endTime,
        pageNum: 1,
        pageSize: 10
      }
    })
    setVisible(true)
  }

  const searchByPage = (pageNum, pageSize) => {
    dispatch({
      type: 'market/getIndexDispatchResultData',
      payload: {
        indexCode: indexCode,
        startTime,
        endTime,
        pageNum,
        pageSize
      }
    })
  }
  // 上架网关
  const onGatewayHandle = indexCode => {
    setOperateType('add')
    setTitle('新增')
    setVisible(true)
    dispatch({
      type: 'market/changeState',
      payload: {
        indexCode
      }
    })
  }

  // 查看
  const toViewHandle = (code, name) => {
    dispatch({
      type: 'market/getIndexInfoData',
      payload: {
        code
      }
    })
    setTitle(name)
    setIsShowDetailDrawer(true)
  }

  // 时间改变事件
  const changeStartTime = (value, moment, dateStr) => {
    if (value === 'start') {
      dispatch({
        type: 'market/changeState',
        payload: {
          startTime: dateStr
        }
      })
    } else {
      dispatch({
        type: 'market/changeState',
        payload: {
          endTime: dateStr
        }
      })
    }
  }

  // 关闭 查看查询抽屉
  const closeDetailDrawer = () => {
    setIsShowDetailDrawer(false)
  }

  return (
    <Layout className={styles.market}>
      <Sider className={styles.sider} width={250} theme="light">
        {/* <IndicatorCategory jumpHash="/market" fromMarket></IndicatorCategory> */}
        <IndicatorCategoryTree jumpHash="/market" fromMarket></IndicatorCategoryTree>
      </Sider>
      <Layout className={styles.rightLayout}>
        <Content className={styles.content}>
          <div className={styles.mainContainer}>
            {/* 搜索区域 */}
            <Search id={id} />
            {/* <Button onClick={onSearchResult}>结果查询</Button>
            <Button onClick={toViewHandle}>查看</Button> */}
            {/* 主体列表区域 */}
            <MainList
              onSearchResult={onSearchResult}
              onGatewayHandle={onGatewayHandle}
              toViewHandle={toViewHandle}
            />

            {/* 分页区域 */}
            <div className={styles.pageContainer}>
              <Pagination
                showQuickJumper
                showSizeChanger
                defaultCurrent={pageNum}
                defaultPageSize={pageSize}
                total={total}
                onChange={pageChange}
                showTotal={total => `总共 ${total} 条数据`}
              />
            </div>
          </div>
        </Content>
      </Layout>

      {/* 结果查询 抽屉 */}
      <Drawer
        width={520}
        title={
          <div className={styles.drawerTitle}>
            <div> {title} </div>
          </div>
        }
        destroyOnClose
        placement="right"
        onClose={closeSearchDrawer}
        visible={visible}
        footer={
          <Space>
            <Button onClick={closeSearchDrawer} type="primary">
              取消
            </Button>
            <Button onClick={closeSearchDrawer}>确定</Button>
          </Space>
        }
        footerStyle={{ display: 'flex', justifyContent: 'end' }}
      >
        {operateType === 'searchResult' ? (
          <div className={styles.searchTitleContainer}>
            {/* 条件过滤标题 */}
            <div className={styles.titleBox}>
              <div className={styles.titleOne}>过滤条件</div>
            </div>
            {/* 日期选择 */}
            <div className={styles.dataBox}>
              <div className={styles.titleDate}>业务日期</div>
              <div className={styles.dateContainer}>
                <DatePicker
                  onChange={(moment, timeStr) => {
                    changeStartTime('start', moment, timeStr)
                  }}
                  placeholder="开始时间"
                  className={styles.selectDate}
                />
                <div className={styles.line}></div>
                <DatePicker
                  onChange={(moment, timeStr) => {
                    changeStartTime('end', moment, timeStr)
                  }}
                  placeholder="结束时间"
                  className={styles.selectDate}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    onSearchResult(indexCode)
                  }}
                >
                  查询
                </Button>
              </div>
            </div>

            {/* 查询结果 */}
            <div className={styles.searchResult}>
              <div className={styles.title}>查询结果</div>

              {/* 结果渲染区域 */}
              <Table renderData={searchData} visible={visible} searchByPage={searchByPage}></Table>
              {/* <div style={{ height: 200 }}>
                <Pagination
                  showQuickJumper
                  showSizeChanger
                  defaultCurrent={pageNum}
                  defaultPageSize={pageSize}
                  total={total}
                  onChange={pageChange}
                />
              </div> */}
            </div>
          </div>
        ) : (
          <Form labelCol={{ span: 4 }} colon={false} form={form} name="control-hooks">
            <Form.Item
              name="APIName"
              label="API名称"
              getValueFromEvent={getTrimValue}
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input
                placeholder="请输入"
                style={{ backgroundColor: '#f7f7f7', width: 240, height: 32 }}
              />
            </Form.Item>
            <Form.Item name="node" label="备注">
              <TextArea
                placeholder="请输入"
                maxLength={200}
                style={{ backgroundColor: '#f7f7f7', height: 200 }}
              />
            </Form.Item>
          </Form>
        )}
      </Drawer>
      <DetailDrawer
        basicInformation={basicInfoList}
        IndicatDevelop={configList}
        scheduConfig={scheduleInfoList}
        isShow={isShowDetailDrawer}
        onClose={closeDetailDrawer}
        title={title}
        loading={isLoadingInfoData}
      ></DetailDrawer>
    </Layout>
  )
}

export default Market
