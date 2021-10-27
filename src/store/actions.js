import * as types from './mutations-types'
import axios from 'axios'

export default {
  login({ commit }, { token, responseCode, responseMessage, merchantTags, roles }) {
    commit(types.LOGIN, { token, responseCode, responseMessage, merchantTags, roles })
  }
}
