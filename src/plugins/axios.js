import axios from 'axios'
import store from '../store'

axios.defaults.baseURL = 'api';
export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
}

axios.interceptors.response.use(function (response) {
  if(response.headers.auth == 'pass'){
    store.commit('auth/logMeIn');
  }
  return response;
}, function (error) {
  return error.response;
});

