<template>
  <q-page class="flex row justify-center">

  <div v-if="$q.platform.is.desktop" class="col-lg-6 row justify-center bg-blue-3">
  <div class="col-10 text-black q-mt-lg">
    <ul>
      <li> Post Job Listings for your company</li>
      <li> Follow various recruiters </li>
      <li> Get Job Updates</li>   
      <li> And finally ! WORK ! </li>                
    </ul>
  </div>
  </ul>
  </div>

  <div class="col-lg-6 col-xs-10">
  <loginForm v-bind:class="{ 'q-ma-lg q-pa-lg': $q.platform.is.desktop }" />
  </div>

  </q-page>
</template>

<script>
import loginForm from '../components/loginForm'
export default{
  components:{
    loginForm
  },
  data: function(){
    return{

    }
  }
}
</script>

<style>
.bannerDescription{
  font-size: 1.5em;
}
li{
  margin-bottom:20px;
}
ul{
  font-size: 2em;
  list-style-type: disc;
}
</style>