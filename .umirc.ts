import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/

const config: IConfig = {
  treeShaking: true,
  routes: [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/about',
        component: './about',
        title: '关于 - SCNU.APP',
      },
      {
        path: '/lib/',
        component: './lib/search-book',
        title: '书籍搜索 - SCNU.APP',
      },
      {
        path: '/lib/search-result',
        component: './lib/search-result',
        title: '书籍搜索 - SCNU.APP',
      },
      {
        path: '/lib/book-detail',
        component: './lib/book-detail',
      },
      {
        path: '/',
        component: '../pages/index',
      },
    ]
  }
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
          loadingComponent: './components/Loading.tsx',
        },
        title: 'SCNU.APP',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
    [
      'umi-plugin-sentry',
      {
        dsn: 'https://46949a7a95d84603ab8113307cb38db4@sentry.io/1868621',
        log: process.env.NODE_ENV === 'development' ? true : false,
      },
    ],
  ],
};
export default config;
