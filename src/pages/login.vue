<template>
  <q-page class="flex row justify-center">
  <div class="col-lg-6 col-xs-10">
  <loginForm v-bind:class="{ 'q-ma-lg q-pa-lg': $q.platform.is.desktop }" />
  </div>
  </q-page>
</template>

<style>
</style>

<script>
import loginForm from '../components/loginForm'
export default{
  components:{
    loginForm
  }
}
</script>
