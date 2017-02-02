import * as guards from './guards';

export default [
  {
    path: '/',
    name: 'home',
    component: require('../views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: require('../views/login.vue'),
    beforeEnter: guards.restrictToUnauthenticated
  },
  {
    path: '/logout',
    name: 'logout',
    component: require('../components/logout.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: require('../views/register.vue'),
    beforeEnter: guards.restrictToUnauthenticated
  },
  {
    path: '/private',
    name: 'private',
    component: require('../views/private.vue'),
    beforeEnter: guards.restrictToAuthenticated
  },
  {
    path: '*',
    name: 'not-found',
    component: require('../views/not-found.vue')
  }
];
