import asyncComponent from './asyncComponent';
import Home from 'views/home';
  
export const routers = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: Home
    },
    {
        path: '/reg',
        exact: true,
        component: asyncComponent(() => import('views/reg'))
    },
    {
        path: '/login',
        exact: true,
        component: asyncComponent(() => import('views/login'))
    },
    {
        path: '/search',
        exact: true,
        component: asyncComponent(() => import('views/search'))
    },
    {
        path: '/detail',
        exact: true,
        component: asyncComponent(() => import('views/detail'))
    },
    {
        path: '*',
        exact: true,
        component: asyncComponent(() => import('views/404'))
    }
];