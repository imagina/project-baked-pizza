import Vue from 'vue'
import Vuex from 'vuex'
import cart from 'src/store/cart/index';
import auth from '@imagina/quser/_store/auth/index';

Vue.use(Vuex)

export default function () {
  // IMPORTANT! Instantiate Store inside this function
  const Store = new Vuex.Store({
    modules: {
    	auth,
    	cart
    }
  })
  return Store
}
