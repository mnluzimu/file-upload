import { DashboardIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: {
      title: 'GPT 使用',
      icon: DashboardIcon,
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/upload/base/index.vue'),
        meta: { title: '文件上传' },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/tasklist/base/index.vue'),
        meta: { title: '任务列表' },
      },
    ],
  },
];
