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
      Route.view('/menu', require('../layouts/pages/menu').default).options({
        name: 'menu'
      }),
      Route.view('/about', require('../layouts/pages/about').default).options({
        name: 'about'
      }),
      Route.view('/catering', require('../layouts/pages/catering').default).options({
        name: 'catering'
      }),
      Route.view('/locations', require('../layouts/pages/locations').default).options({
        name: 'locations'
      })
      Route.view('/franchise', require('../layouts/pages/franchise').default).options({
        name: 'franchise'
      }),
      Route.view('/test', require('../layouts/pages/test').default).options({
        name: 'franchise'
      })
    }
  )

export default Route.all()
