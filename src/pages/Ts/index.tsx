import React, { useEffect, useState, useRef } from 'react';
// import { IndexModelState } from '@/models/TsModel'
import {
  Layout,
  Pagination,
  Drawer,
  Button,
  Space,
  DatePicker,
  Form,
  Input,
  Spin,
  Table,
} from 'antd';

import type { PaginationProps } from 'antd';
import { useSelector, IndexModelState, useStore, ConnectProps } from 'umi';
import styles from './index.less';
import Search from './components/Search';
import Add from './components/Add';
import { tabelColumns } from '@/utils/index'

console.log(window);

interface SelectorProps {
  index: IndexModelState;
}

const Market = () => {
  const mainRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const store = useStore();
  type A = ReturnType<typeof store.getState>;
  const a = () => {
    const abc = store.getState();
    return { ...abc };
  };

  useEffect(() => {
    console.log(mainRef.current.clientHeight);
  }, []);

  const { tabelList } = useSelector<SelectorProps>(({ index }) => {
    return {
      ...index,
    };
  }) as IndexModelState;
  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };


  return (
    <Layout className={styles.tsContainer}>
      <div className={styles.mainContainer}>
        {/* 搜索区域 */}
        <Search label="任务名称"></Search>

        {/* 新增区域 */}
        <Add></Add>

        {/* 表格 */}
        <div
          ref={mainRef}
          style={{ height: window.innerHeight - 198 }}
          //  className={styles.main}
        >
          <Table
            scroll={{ y: mainRef?.current?.clientHeight - 55 || 500 }}
            dataSource={tabelList}
            columns={tabelColumns}
            pagination={false}
          />
        </div>
        {/* 分页 */}
        <div className={styles.footer}>
          <Pagination
            showQuickJumper
            defaultCurrent={2}
            total={500}
            onChange={onChange}
            showTotal={(total) => `总数 ${total} 条`}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Market;
