<template>
<q-page class="q-pa-lg row justify-center">
  <div class="col-1g-10 col-xl-10 col-10 justify-center row">
    <div class="full-width">

<q-list>
  <q-collapsible group="somegroup" icon="lock" label="Change Password">
          <changePassword class="q-pa-md" />
  </q-collapsible>
  <q-collapsible group="somegroup" icon="computer" label="Places I am logged In">
    <placesLoggedIn class="q-pa-md" />
  </q-collapsible>
  <q-collapsible group="somegroup" icon="info" label="Need More Help">
    <div>
    Send us an email on reevkandari@gmail.com.
    </div>
  </q-collapsible>
</q-list>

    </div>
  </div>
</q-page>
</template>

<style>
</style>

<script>
import changePassword from '../components/changePassword.vue';
import placesLoggedIn from '../components/placesLoggedIn.vue';

export default{
  components:{
    placesLoggedIn,
    changePassword
  },
  data(){
    return{
      menuList:[
        {icon:'lock', label:'Change My password',to:"password"},
        {icon:'computer', label:'Places I am logged In',to:"activesessions"},
        {icon:'delete', label:'Delete My Account',to:"delete"}
      ]
    }
  }
}
</script>
