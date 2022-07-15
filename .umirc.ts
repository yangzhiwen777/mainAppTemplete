import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/Login' },
    { path: '/ts', component: '@/pages/Ts' },
    { path: '/micro', component: '@/pages/Micro' },
    { path: '/drag', component: '@/pages/Drag' },
    { path: '/svg', component: '@/pages/Svg' },
    { path: '/x6', component: '@/pages/X6' },
    { path: '/x6Test', component: '@/pages/X6Test' },
    {
      path: '/app1',
      microApp: 'app1',
      microAppProps: {
        szhz:'微应用',
        autoSetLoading: true,
        className: 'myContainer',
        wrapperClassName: 'myWrapper',
      },
    },
    {
      path: '/app2',
      microApp: 'app2',
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/list', component: '@/pages/List/index' },
        { path: '/admin', component: '@/pages/Admin/index' },
        {
          path: '/micro1',
          microApp: 'app1',
          container: '#app1Cotainer'
        },
        {
          path: '/micro2',
          microApp: 'app2',
        },
      ],
    },
  ],
  fastRefresh: {},
  title: '主应用',
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app1', // 唯一 id
          entry: '//localhost:7001', // html entry
          props: {
            gongsi: '杭州城市大脑',
            address: '西湖区转塘',
          },
        },
        {
          name: 'app2', // 唯一 id
          entry: '//localhost:7002', // html entry
        },
      ],
    },
  },
});
