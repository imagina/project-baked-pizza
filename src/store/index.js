import Vue from 'vue'
import Vuex from 'vuex'
import cart from 'src/store/cart/index';

Vue.use(Vuex)

export default function () {
  // IMPORTANT! Instantiate Store inside this function
  const Store = new Vuex.Store({
    modules: {
    	cart
    }
  })
  return Store
}
