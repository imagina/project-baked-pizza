import Route from 'vue-routisan'
import user from '@imagina/quser/_router/routes' // Routes module QUser
import auth from '@imagina/quser/_router/middlewares/auth' // Middleware auth

/*Views*/
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'

Route.redirect('/', '/inicio');

/*Pages*/
Route.view('/', master)
  .children(() => {
    Route.view('/inicio', require('../layouts/pages/inicio').default).options({
      name: 'home'
    }),
    Route.view('/pide-en-linea/', require('../layouts/pages/pide').default).options({
      name: 'pide-en-linea'
    }),
    Route.view('/pide-en-linea/category/:slug', require('../layouts/pages/pide').default).options({
      name: 'pide-en-linea/category'
    }),
    Route.view('/pide-en-linea/product/:slug', require('../layouts/pages/pide').default).options({
      name: 'pide-en-linea/product'
    }),
    Route.view('/nosotros', require('../layouts/pages/about').default).options({
      name: 'nosotros'
    }),
    Route.view('/donde-estamos', require('../layouts/pages/dondeEstamos').default).options({
      name: 'donde-estamos'
    }),
    Route.view('/pedido', require('../layouts/pages/pedido').default).options({
      name: 'pedido'
    }),
    Route.view('/checkout', require('../layouts/pages/checkout').default).options({
      name: 'checkout'
    }),
    Route.view('/pqrs', require('../layouts/pages/qprs').default).options({
      name: 'qprs'
    }),
    Route.view('/busqueda', require('../layouts/pages/busqueda').default).options({
      name: 'busqueda'
    }),
    Route.view('/perfil', require('../layouts/pages/perfil').default).options({
      name: 'perfil'
    }),
    Route.view('/order/:id', require('../layouts/pages/order').default).options({
      name: 'order'
    })
  })

  Route.view('/logout', require('../layouts/pages/logout').default).options({
    name: 'logout'
  })

export default Route.all()
