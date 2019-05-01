<template>
  <q-page class="flex row justify-center">
  <div class="col-lg-6 col-xs-10">
  <signupForm v-bind:class="{ 'q-ma-lg q-pa-lg': $q.platform.is.desktop }" />
  </div>

  </q-page>
</template>

<style>
</style>

<script>
import signupForm from '../components/signupForm'
export default{
  components:{
    signupForm
  }
}
</script>
