import React, { useState, useRef } from 'react';
import styles from './index.less';
/**
 * 
四、拖拽API的相关函数

解释了什么是源对象和目标对象后，回归前端中的拖拽API，由上面的操作我们可以得出几个函数

被拖动的源对象可以触发的事件：

(1)ondragstart：源对象开始被拖动

(2)ondrag：源对象被拖动过程中(鼠标可能在移动也可能未移动)

(3)ondragend：源对象被拖动结束

  拖动源对象可以进入到上方的目标对象可以触发的事件：

(1)ondragenter：目标对象被源对象拖动着进入

(2)ondragover：目标对象被源对象拖动着悬停在上方

(3)ondragleave：源对象拖动着离开了目标对象

(4)ondrop：源对象拖动着在目标对象上方释放/松手

拖拽API总共就是7个函数！！
 */

const Item = ({
  itemdata,
  leftDdragStart,
}: {
  itemdata: { name: string; id: string };
  leftDdragStart: any;
}) => {
  return (
    <div
      //   ref={ref}
      data-id={itemdata.id}
      id={itemdata.id}
      style={{
        textAlign: 'center',
        backgroundColor: 'GrayText',
        marginBottom: 10,
        borderRadius: 3,
        boxSizing: 'border-box',
      }}
      onDragStart={(e) => {
        leftDdragStart(e);
      }}
      draggable
    >
      <div>{itemdata.name}</div>
    </div>
  );
};

const Drag = () => {
  const [data, setData] = useState([
    { name: '张三', id: '1' },
    { name: '李四', id: '2' },
    { name: '王五', id: '3' },
  ]);

  const leftDdragStart = (e: DragEvent) => {
    // console.log(e.target?.__reactProps$w4xt96r62tr);
    // console.log(e);
    // // console.log(ref.current);

    // console.log(e.target?.attributes);

    // console.log(e.target?.attributes.id.value);
    // console.log(String(e.target?.attributes.id));

    // // const arr = String(e.target?.attributes.id).join('')
    // // console.log(arr);

    // console.log(React.createElement(e.target));

    // const ele = React.cloneElement(e.target);
    // console.log(ele);

    // console.log('拖拽开始');
    e.dataTransfer?.setData('id', e.target?.attributes.id.value);
  };

  // 拖拽开始
  const dragStart = (e: DragEvent) => {
    console.log(e);
    console.log('拖拽开始');
    e.dataTransfer?.setData('name', '2321');
  };

  // 拖拽中
  const drag = (e: DragEvent) => {
    // console.log('拖拽中');
  };

  // 拖拽离开事件
  const dragLeave = () => {
    console.log('离开了拖拽区');
  };

  // 拖拽进入事件
  const dragEnter = () => {
    console.log('拖拽进入事件');
  };

  // 拖拽结束事件
  const dragEnd = (e) => {
    console.log('拖拽结束事件');
  };

  // 目标对象被源对象拖动着悬停在上方
  const dragOver = (e) => {
    // console.log('目标对象被源对象拖动着悬停在上方');
    console.log(e.dataTransfer.getData('name'));

    e.preventDefault(); //阻止默认行为，使得drop可以触发
  };

  // 松手事件
  const drop = (e) => {
    console.log(e.dataTransfer.getData('name'));
    console.log('松手事件');
  };

  //
  const roghtdragOver = (e) => {
    e.preventDefault();
  };

  // 右侧松手事件
  const rightDrop = (e) => {

    console.log(e.dataTransfer?.getData('id'));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>拖拉拽</h1>
      <div className={styles.box}>
        <div
          data-index={1}
          draggable
          className={styles.drop}
          // 源对象开始被拖动
          onDragStart={(e) => {
            dragStart(e);
          }}
          // 源对象被拖动过程中(鼠标可能在移动也可能未移动)
          onDrag={drag}
          // 源对象被拖动结束
          onDragEnd={(e) => {
            dragEnd(e);
          }}
        >
          拖拽区
        </div>
        <div
          // 目标对象被源对象拖动着进入
          onDragEnter={dragEnter}
          // 源对象拖动着离开了目标对象
          onDragLeave={dragLeave}
          // 目标对象被源对象拖动着悬停在上方 (须在这个方法中阻止默认行为，才能触发 drop )
          onDragOver={(e) => {
            dragOver(e);
          }}
          // 源对象拖动着在目标对象上方释放/松手
          onDrop={(e) => {
            drop(e);
          }}
          className={styles.drap}
        >
          目标区
        </div>
      </div>
      <h1 className={styles.title}>左到右</h1>
      <div className={styles.box2}>
        <div className={styles.left}>
          {data.map((item) => {
            return (
              <Item
                leftDdragStart={leftDdragStart}
                key={item.id}
                itemdata={item}
              ></Item>
            );
          })}
        </div>
        <div
          onDragOver={(e) => {
            roghtdragOver(e);
          }}
          onDrop={rightDrop}
          className={styles.right}
        >
          右侧
        </div>
      </div>
    </div>
  );
};
export default Drag;
