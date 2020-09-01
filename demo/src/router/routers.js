import Main from '@/components/main/Main.vue'
import parentView from '@/components/parent-view'
export default [
	{
		path: '/login',
		name: 'login',
		meta: {
			title: 'Login - 登录',
			hideInMenu: true
		},
		component: () => import('@/views/login/login.vue')
	},
	{
		path: '/xzy',
		component: Main,
		name: 'xzy',
		redirect: '/xzy/app',
		meta: {
			title: '组件',
			icon: 'logo-buffer',
			hideInBread: true
		},
		children: [{
			path: 'app',
			name: 'app',
			meta: {
				title: '首页',
				notCache: true,
				icon: 'ios-albums'
			},
			component: () =>
				import('@/views/app/APP.vue')
		},
		{
			path: 'dev',
			name: 'dev',
			meta: {
				title: '消息推送',
				notCache: true,
				access: ['xzy', 'admin'],
				hideInBread: false,
				icon: 'ios-jet'
			},
			component: () =>
				import('@/views/dev/Dev.vue')
		},
		{
			path: 'manage',
			name: 'manage',
			meta: {
				title: '开发助手',
				notCache: true,
				icon: 'ios-nuclear'
			},
			component: () =>
				import('@/views/manage/Manage.vue')
		},
		{
			path: 'push',
			name: 'push',
			meta: {
				title: '应用分析',
				notCache: true,
				icon: 'ios-notifications'
			},
			component: () =>
				import('@/views/push/Push.vue')
		},
		{
			path: 'functional',
			name: 'functional',
			meta: {
				title: '函数化组件',
				notCache: true,
				icon: 'ios-notifications'
			},
			component: () =>
				import('@/views/functional/list.vue')
		}
		]
	},
	{
		path: '/xzy',
		name: 'zhan1',
		meta: {
			icon: 'md-menu',
			title: '多级菜单',
			hideInBread: true
		},
		component: Main,
		children: [{
			path: 'zhan',
			name: 'zhan',
			meta: {
				access: ['xzy'],
				icon: 'md-funnel',
				title: '展翅',
			},
			component: parentView,
			children: [{
				path: 'yu',
				name: 'yu',
				meta: {
					access: ['xzy'],
					icon: 'md-funnel',
					title: '飞翔'
				},
				component: () =>
					import('@/views/zhan/Yu.vue')
			},
			{
				path: 'yu1',
				name: 'yu1',
				meta: {
					access: ['xzy'],
					icon: 'md-funnel',
					title: '飞翔'
				},
				component: () =>
					import('@/views/zhan/Yu.vue')
			}
			]
		},
		{
			path: 'level_2_3',
			name: 'level_2_3',
			meta: {
				icon: 'md-funnel',
				title: '二级-3'
			},
			component: () =>
				import('@/views/level-2-3/level-2-3.vue')
		}
		]
	}
]
