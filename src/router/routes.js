import Route from 'vue-routisan'
import user from '@imagina/quser/_router/routes' //Routes module QUser
import auth from '@imagina/quser/_router/middlewares/auth' //Middleware auth

/*VIEWS*/
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'


/*=============== Route Redirects ===========================*/
Route.redirect('/', '/inicio');

/*===================== Routes ============================*/
/*Pages*/
Route.view('/', master)
  .children(() => {
      Route.view('/inicio', require('../layouts/pages/inicio').default).options({
        name: 'home'
      }),
      Route.view('/pide-en-linea/:id?', require('../layouts/pages/pide').default).options({
        name: 'pide-en-linea'
      }),
      Route.view('/nosotros', require('../layouts/pages/about').default).options({
        name: 'nosotros'
      }),
      Route.view('/donde-estamos', require('../layouts/pages/franchise').default).options({
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
      Route.view('/login', require('../layouts/pages/login').default).options({
        name: 'login'
      }),
      Route.view('/busqueda', require('../layouts/pages/busqueda').default).options({
        name: 'busqueda'
      }),
      Route.view('/perfil', require('../layouts/pages/perfil').default).options({
        name: 'perfil'
      }),








      // Ruta test, para probar componentes de manera separada de todos los demas componentes.
      Route.view('/addresses', require('../layouts/test').default).options({
        name: 'test'
      })

    }
  )

export default Route.all()
