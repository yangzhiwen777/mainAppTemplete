import React, { useEffect } from 'react';
import styles from './index.less';

export default function IndexPage() {
  console.log('IndexPage');
  useEffect(() => {
    console.log('微应用2');
    getData();
  }, []);

  // getData
  const getData = async () => {
    const res = await fetch('/api/users', {
      method: 'GET',
      headers: {
        token: '123456',
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        return data;
      });
    console.log(res);
  };

  return (
    <div>
      <h1 className={styles.title}>微应用2</h1>
    </div>
  );
}
