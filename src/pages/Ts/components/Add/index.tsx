import React from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';
import CustomButton from '@/components/Button';

const Add: React.FC = (props) => {
  return (
    <div className={styles.addContainer} >
      <CustomButton size='middle'>新增</CustomButton>
    </div>
  );
};

export default Add;
