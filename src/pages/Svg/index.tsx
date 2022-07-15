import styles from './index.less';

const Svg = () => {
  const circleClick = () => {
    console.log('circleClick');
  };

  const cirStart = () => {
    console.log('cirStart');
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>svg</h1>
      <svg width={300} height={300}>
        <rect width={300} height={200} fill={'red'}></rect>
        <circle
        
          onClick={circleClick}
          onDragStart={cirStart}
          x1={20}
          y1={20}
          r={20}
          fill={'yellow'}
        ></circle>
      </svg>
    </div>
  );
};
export default Svg;
