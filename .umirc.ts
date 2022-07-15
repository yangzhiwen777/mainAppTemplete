import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  title: '微应用2',
  // publicPath:'/qwer/',
  qiankun: {
    slave: {},
  },
});
