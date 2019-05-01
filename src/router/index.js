import Vue from 'vue'
import VueRouter from 'vue-router'
import { LocalStorage} from 'quasar'
import store from '../store'
import axios from 'axios'

import routes from './routes'
Vue.use(VueRouter)

const Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach(async (to, from, next) => {
  var isLoggedIn = await loggedIn();
  if(isLoggedIn){
    loadMyProfile();
    if(to.meta.includes('rich')) return next();
    else return next('/home');
  }else{
    if(to.meta.includes('poor')) return next();
    else return next('/login');
  }
});

function loadMyProfile(){
  if(!store.state.user.profile.name){
    var user = LocalStorage.get.all();
    store.dispatch('user/loadProfile',user);
  }  
}

async function loggedIn(){
  if(store.state.auth.expire > Date.now()) return true;
  var res = await axios.get('/authStatus');
  if(res.status == 202) return true;
  else return false;
}





export default Router