import * as types from './mutations-types'

export default {
  [types.LOGIN](state, { token, responseCode, responseMessage, merchantTags, roles }) {
    state.token = token
    state.responseCode= responseCode
    state.responseMessage= responseMessage
    state.merchantTags= merchantTags
    state.roles= roles
  },
  [types.LOGOUT](state) {
    state.token = ''
    state.responseCode= ''
    state.responseMessage= ''
    state.merchantTags= []
    state.roles= []
  }
}
