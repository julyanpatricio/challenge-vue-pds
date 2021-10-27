import * as types from './mutations-types'
import axios from 'axios'

export default {
  login ({ commit }) {
    axios.post(`http://lbl-bistro-nc-wa-preprod-884f88ddc91b1d08.elb.us-east-1.amazonaws.com:5000/api/Token`,{
      Username,
      Password
    })
      .then(({data}) => {
        commit(types.LOGIN, {
          token:data['token'],
          responseCode:data['responseCode'],
          responseMessage:data['responseMessage'],
          merchantTags:data['merchantTags'],
          roles:data['roles'],
        })
      })
  }
}
