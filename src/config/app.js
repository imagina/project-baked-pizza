import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

//Pages
import eCommercePages from '@imagina/qcommerce/_config/pages'

//Custom Page eCommerce
eCommercePages.productsIndex.layout = require('src/layouts/pages/eCommerce/products/index').default
eCommercePages.productsShow.layout = require('src/layouts/pages/eCommerce/products/show').default
eCommercePages.checkout.layout = require('src/layouts/pages/eCommerce/checkout/index').default
eCommercePages.orders.layout = require('src/layouts/pages/eCommerce/orders/index').default
eCommercePages.order.layout = require('src/layouts/pages/eCommerce/orders/show').default

export default {
  version: '1.0.2',//Version of APP
  registerUsers : true,//PErmit register users
  modules: {
    apiRoutes: {//All api routes
      api: require('src/config/apiRoutes/api').default,
      app: require('src/config/apiRoutes/application').default,
      site: require('@imagina/qsite/_config/site').default,
      profile: require('@imagina/quser/_config/profile').default,
      blog: require('@imagina/qblog/_config/blog').default,
      slider: require('@imagina/qslider/_config/slider').default,
      eCommerce: require('@imagina/qcommerce/_config/apiRoutes').default,
      iform: require('src/config/apiRoutes/iform').default,
    },
    pages: {//All Pages
      users: require('@imagina/quser/_config/pages').default,
      media: require('@imagina/qmedia/_config/pages').default,
      site: require('@imagina/qsite/_config/pages').default,
      blog : require('@imagina/qblog/_config/pages').default,
      slider : require('@imagina/qslider/_config/pages').default,
      eCommerce : eCommercePages,
      application: require('src/config/pages/application').default, //<-----Always last
    },
    store: {//All Store's
      app: require('src/store/app/index').default,
      auth: require('@imagina/quser/_store/index').default,
      site: require('@imagina/qsite/_store/index').default,
      blog: require('@imagina/qblog/_store/index').default,
      shoppingCart: require('@imagina/qcommerce/_store/cart/index').default,
    }
  },
  saveStorage : {
    refresh : [
      'userToken',
      'userId',
      'userData',
      'offlineRequests',
      'notifications',
      'auth.department.id',
      'auth.role.id',
      'redirect.to.from.login',
      'dataAddress'
    ],
    logout : [
      'offlineRequests',
      'dataAddress'
    ]
  }
}
