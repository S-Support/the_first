export default [
    {
        // 기관정보조회-은지
        path: '/institutions/:id',
        name: 'institutioninfo',
        component: () => import('@/views/pages/InstitutionInfo.vue')
    }
];
