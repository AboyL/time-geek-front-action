export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index.tsx',
      routes: [
        // 配置微应用 app1 关联的路由
        {
          path: '/',
          microApp: 'app1',
        },
      ]
    },
  ],
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app1', // 唯一 id
          entry: '//localhost:7001', // html entry
        },
      ],
    },
  },
};