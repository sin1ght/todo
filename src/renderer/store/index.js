import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState } from 'vuex-electron'

import {state} from './state'
import {mutations} from './mutations'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [
    // createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
