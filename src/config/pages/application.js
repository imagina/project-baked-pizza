//Layout container
import master from 'src/layouts/master'
import config from 'src/layouts/config'
import notFound from 'src/layouts/404'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	//Home Page
	home: {
		permission: null,
		activated: true,
		path: '/inicio',
		name: 'app.home',
		layout: require('src/layouts/pages/inicio').default,
		containerLayout: master,
		title: 'Home',
		icon: 'fas fa-home'
	},
	//
	ubications: {
		permission: null,
		activated: true,
		path: '/donde-estamos',
		name: 'ubications',
		layout: require('src/layouts/pages/dondeEstamos').default,
		containerLayout: master,
		title: 'Donde estamos',
		icon: 'fas fa-home',
	},
	//Page About
	about: {
		permission: null,
		activated: true,
		path: '/nosotros',
		name: 'nosotros',
		layout: require('src/layouts/pages/about').default,
		containerLayout: master,
		title: 'nosotros',
		icon: 'fas fa-home',
	},
	//Config Page
	config: {
		permission: null,
		activated: true,
		path: '/config',
		name: 'app.config',
		layout: require('src/layouts/app/config').default,
		containerLayout: config,
		title: 'Config',
		icon: 'fas fa-home',
	},
	//Not found Page
	notFound: {
		permission: null,
		activated: true,
		path: '*',
		name: 'app.not.found',
		layout: null,
		containerLayout: notFound,
		title: 'Not Found',
		icon: 'fas fa-chart-bar'
	},
	//test page
	notFound: {
		permission: null,
		activated: true,
		path: '/test',
		name: 'app.test',
		layout: master,
		containerLayout: require('src/layouts/pages/category').default,
		title: 'Not Found',
		icon: 'fas fa-chart-bar'
	},
}