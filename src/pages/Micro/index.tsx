import { MicroApp, useLocation } from 'umi';

const Micro = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <h1>标签页</h1>
      <div id="app1Cotainer"></div>
      <MicroApp
        form={pathname}
        name="app1"
        autoSetLoading
        base={pathname}
        className="app1Cotainer"
        wrapperClassName="myWrapper"
        age={18}
        hobby={['性别', '年龄']}
      ></MicroApp>
    </div>
  );
};
export default Micro;
