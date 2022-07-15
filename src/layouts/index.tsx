import React, { useEffect } from 'react';
import styles from './index.less';
import { IRouteComponentProps, useHistory } from 'umi';

interface Props extends IRouteComponentProps {
  name: 123;
  age: string;
}

const LayoutIndex: React.FC<Props> = (props) => {
  console.log(props.children);
  // console.log(props.age);
  
  // fetch('/123',{
  //     headers
  // })
  const history = useHistory();
  useEffect(() => {
    return () => {
      console.log(123);
      clearTimeout();
    };
  });
  const btnHandle = () => {
    history.push('/list');
  };
  const btnHandle2 = () => {
    history.push('/admin');
  };
  const btnHandle3 = () => {
    history.push('/micro1');
  };
  const btnHandle4 = () => {
    history.push('/micro2');
  };
  return (
    <div>
      <h1 className={styles.title}>乾坤主应用</h1>
      <button onClick={btnHandle}>list</button>
      <button onClick={btnHandle2}>admin</button>
      <button onClick={btnHandle3}>微应用1</button>
      <button onClick={btnHandle4}>微应用2</button>
      <div>{props.children}</div>
      <div>123</div>
    </div>
  );
};

export default LayoutIndex;
