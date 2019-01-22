/**
 * Config for items in Menu
 */

/*
*{
  title: 'Assignment',
  icon: 'fas fa-users-cog',
  to: 'user.users.assignment',
  can:'user.users.index'
},*/

export default {
  /*home*/
  home: {
    title: 'inicio',
    icon: 'fas fa-home',
    to: 'home'
  },
  menu: {
    title: 'pedido',
    icon: 'fas fa-utensils',
    to: 'pedido'
  },
  about: {
    title: 'donde-estamos',
    icon: 'far fa-building',
    to: 'donde-estamos',
  },
  catering: {
    title: 'nosotros',
    icon: 'far fa-calendar-check',
    to: 'nosotros'
  },
  locations: {
    title: 'pide-en-linea',
    icon: 'fas fa-map-marked-alt',
    to: 'pide-en-linea'
  },
}
