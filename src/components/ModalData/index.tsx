import { useModel } from 'umi';

function ModalData() {
  const masterProps = useModel('@@qiankunStateFromMaster');
  console.log(masterProps);

  return (
    <div>
      <h1>{masterProps?.personState.name}</h1>
      <button
        onClick={() => {
          masterProps.setPersonState({
            ...masterProps?.personState,
            name: '老张',
          });
        }}
      >
        修改全局数据
      </button>
    </div>
  );
}

export default ModalData;
