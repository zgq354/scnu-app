import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/

const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/about',
      component: './about',
    },
    {
      path: '/',
      component: '../pages/index',
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'scnu.app',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
export default config;
