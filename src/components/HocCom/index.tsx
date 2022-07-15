import { connectMaster } from 'umi';

function HocCom(props) {
    console.log(props);
    
  return <div>{JSON.stringify(props)}</div>;
}

export default connectMaster(HocCom);