import { MicroApp } from 'umi';

import ModalData from '../components/ModalData';
import HocCom from '../components/HocCom';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>微应用1</h1>
      {/* 全局数据流 */}
      <ModalData></ModalData>
      <hr></hr>
      <HocCom></HocCom>
      <MicroApp name="app2" base="/app1" url="/app1" />
    </div>
  );
}
