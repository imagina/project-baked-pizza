import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function () {
  // IMPORTANT! Instantiate Store inside this function
  const Store = new Vuex.Store({
    modules: {

    }
  })
  return Store
}
