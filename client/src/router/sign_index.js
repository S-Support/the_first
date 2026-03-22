export default [
    {
        path: '/sign/register',
        name: 'register',
        component: () => import('@/views/pages/sign/register.vue')
    }, 
    {
        path: '/sign/register/search',
        name: 'registerSearch',
        component: () => import('@/views/pages/sign/search.vue')
    }
];
