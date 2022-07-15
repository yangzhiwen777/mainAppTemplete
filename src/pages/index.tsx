import React from 'react';
import { useHistory } from 'umi';
import styles from './index.less';

const IndexPage = () => {
  return (
    <div>
      <h1 className={styles.title}>乾坤主应用</h1>
      <button>微应用1</button>
      <button>微应用2</button>
    </div>
  );
};

export default IndexPage;
