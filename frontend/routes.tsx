import ContactsView from 'Frontend/views/about/contact/ContactsView';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';

const AboutView = lazy(async () => import('Frontend/views/about/AboutView'));

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <ContactsView />},
      { path: '/about', element: <AboutView />},
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
