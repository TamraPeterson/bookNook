import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authGuard
  },
  {
    path: '/books',
    name: 'Books',
    component: loadPage('BooksPage')
  },
  {
    path: '/clubs',
    name: 'Clubs',
    component: loadPage('ClubsPage'),
    beforeEnter: authSettled
  },
  {
    path: '/clubs/:id',
    name: 'BookClub',
    component: loadPage('BookClub')
  },

]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
