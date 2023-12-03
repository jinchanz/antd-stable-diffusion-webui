import React from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from './layout';

const Loading = () => null;

const SD = React.lazy(() => import('./sd'));

const Page404 = React.lazy(() => import('./404'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <React.Suspense fallback={<Loading />}>
        <Layout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        path: '/',
        element: (
          <React.Suspense fallback={<Loading />}>
            <SD />
          </React.Suspense>
        ),
      },
    ]
  },
  {
    path: '/*',
    element: (
      <React.Suspense fallback={<Loading />}>
        <Page404 />
      </React.Suspense>
    ),
    children: [],
  },
];

export default routes;
