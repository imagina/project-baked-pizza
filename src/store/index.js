import Vue from 'vue'
import Vuex from 'vuex'
import cart from 'src/store/cart/index';
import address from 'src/store/address/index';
import shippingmethod  from 'src/store/shippingMethod/index'
import paymentmethod  from 'src/store/paymentMethod/index'
import auth from '@imagina/quser/_store/auth/index';

Vue.use(Vuex)

export default function () {
  // IMPORTANT! Instantiate Store inside this function
  const Store = new Vuex.Store({
    modules: {
    	auth,
      cart,
      address,
      shippingmethod,
      paymentmethod
    }
  })
  return Store
}
