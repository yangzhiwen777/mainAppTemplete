import { useModel } from 'umi';

export const qiankun = {
  // 生命周期
  // 应用加载之前
  async bootstrap(props) {
    console.log('应用1111加载之前', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    // const masterProps = useModel('@@qiankunStateFromMaster');
    // console.log(masterProps);
    
    console.log('应用1111挂载', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('应用1111卸载', props);
  },
};
