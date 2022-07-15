import React from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

interface SearchProps {
  label: string;
}

const Search: React.FC<SearchProps> = (props) => {
  const { label } = props;

  return (
    <div className={styles.container}>
      <div className={styles.name}>{label}</div>
      <Input className={styles.input} placeholder="请输入" />
      <Button type="primary" className={styles.searchBtn}>
        查询
      </Button>
      <Button className={styles.resetBtn}>重置</Button>
    </div>
  );
};

export default Search;
