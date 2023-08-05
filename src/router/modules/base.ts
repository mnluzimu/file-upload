import { DashboardIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/task',
    component: Layout,
    redirect: '/task/list',
    name: 'task',
    meta: {
      title: 'GPT 使用',
      icon: DashboardIcon,
    },
    children: [
      {
        path: 'upload',
        name: 'DashboardBase',
        component: () => import('@/pages/upload/base/index.vue'),
        meta: { title: '文件上传' },
      },
      {
        path: 'list',
        name: 'DashboardDetail',
        component: () => import('@/pages/tasklist/base/index.vue'),
        meta: { title: '任务列表' },
      },
    ],
  },
];
