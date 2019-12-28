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
      },
      {
        path: '/lib/',
        redirect: '/lib/search-book'
      },
      {
        path: '/lib/search-book',
        component: './lib/search-book',
      },
      {
        path: '/lib/search-result',
        component: './lib/search-result',
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
  ],
};
export default config;
