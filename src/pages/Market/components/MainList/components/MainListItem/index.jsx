import styles from './index.less'
import { INDICATORICON, INDICATORTYPE } from '@/utils/const'
import { Divider } from 'antd'

const MainListItem = props => {
  const {
    onSearchResult,
    onGatewayHandle,
    toViewHandle,
    id,
    name,
    type,
    indexConfig = '',
    indexCode,
    businessPeople,
    fbPeople,
    fbTime,
    visits,
    gatewayState
  } = props
  // console.log(props);
  return (
    <div className={styles.container}>
      {/* 标题 */}
      <div className={styles.itemTitle} style={{ width: 150, overflow: 'hidden' }}>
        <div className={styles.titleContainer}>
          <div className={styles.title} style={{ width: 150, overflow: 'hidden' }}>
            {name}
          </div>
        </div>
        <div className={styles.instructionContainer}>
          <div className={styles.instruction}>
            <div className={styles.subTitle}>指标类型</div>
            <div className={styles.subTitle}>
              <img src={INDICATORICON[type]} alt="" style={{ width: 16 }} />
            </div>
            <div className={styles.subTitle}>{INDICATORTYPE[type] || '待类型'}</div>
          </div>
        </div>
      </div>
      {/* 维度 */}
      <div className={styles.itemTitle} style={{ width: 150, overflow: 'hidden' }}>
        <div className={styles.titleContainer}>
          <div className={styles.title}></div>
        </div>
        <div className={styles.instructionContainer}>
          <div className={styles.instruction} style={{ width: 150, overflow: 'hidden' }}>
            <div className={styles.subTitle}>维度支持</div>
            {indexConfig.split('、').map((item, index) => {
              return (
                <div key={index} className={styles.subTitleDeep}>
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* 负责人 */}
      <div className={styles.itemTitle} style={{ width: 100 }}>
        <div className={styles.titleContainer}>
          <div className={styles.title}></div>
        </div>
        <div className={styles.instructionContainer}>
          <div className={styles.instruction}>
            <div className={styles.subTitle}>负责人</div>
            <div className={styles.subTitleDeep}>{businessPeople}</div>
          </div>
        </div>
      </div>
      {/* 发布人 */}
      <div className={styles.itemTitle} style={{ width: 100 }}>
        <div className={styles.titleContainer}>
          <div className={styles.title}></div>
        </div>
        <div className={styles.instructionContainer}>
          <div className={styles.instruction}>
            <div className={styles.subTitle}>发布人</div>
            <div className={styles.subTitleDeep}>{fbPeople}</div>
          </div>
        </div>
      </div>
      {/* 时间 */}
      <div className={styles.itemTitle} style={{ width: 180 }}>
        <div className={styles.titleContainer}>
          <div className={styles.title}></div>
        </div>
        <div className={styles.instructionContainer}>
          <div className={styles.instruction}>
            <div className={styles.subTitle}>发布时间</div>
            <div className={styles.subTitleDeep}>{fbTime}</div>
          </div>
        </div>
      </div>
      {/* 操作 */}
      <div className={styles.operate}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div className={styles.total}>累计访问</div>
            <div className={styles.totalNum}>{visits}</div>
          </div>
        </div>
        <div className={styles.instructionContainer}>
          <div
            className={styles.opriteFont}
            onClick={() => {
              onSearchResult(indexCode, name)
            }}
          >
            结果查询
          </div>
          {/* <div className={styles.line}></div> */}
          <Divider type="vertical" />

          {/* <div
            className={gatewayState === 1 ? styles.down : styles.opriteFont}
            onClick={() => {
              onGatewayHandle(indexCode)
            }}
          >
            {gatewayState === 1 ? '下架' : '上架网关'}
          </div> */}
          <Divider type="vertical" />

          <div
            className={styles.opriteFont}
            onClick={() => {
              toViewHandle(indexCode, name)
            }}
          >
            查看
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainListItem
