import Route from 'vue-routisan'

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
      Route.view('/pide-en-linea', require('../layouts/pages/pide').default).options({
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
      })
    }
  )

export default Route.all()
