<template>
  <q-layout view="lHh Lpr lFf">  
  <q-layout-header>
  <q-toolbar color="red" class="flex row">

  <q-toolbar-title v-if=!loggedIn class="absolute-center text-left">
    WiseDumb
      <span slot="subtitle">
      Be wise, Be Dumb, but Be You
    </span>
  </q-toolbar-title>

<q-tabs color="red" v-if="$q.platform.is.desktop && loggedIn"
class="float-right" >
  <q-route-tab v-for="(item,index) in tabMenu" :key="index"
  :icon="item.icon" :to="item.to" exact slot="title"/>
</q-tabs>


    <div v-if="$q.platform.is.desktop && loggedIn" 
    class="relative position col-6 flex row float-right q-ml-xl q-pl-xl">
        <q-field class="col-12 float-right bg-white round-borders">
          <search />
        </q-field>
    </div>  


<div class="absolute-right q-ma-xs q-pr-md">
 <q-btn round size="lg" flat dense icon="more_vert">
        <q-popover>
          <q-list no-border inset-separator dense link v-for="(item,index) in toolBarMenu" :key="index">
            <q-item v-close-overlay :to="item.to">
              <q-item-side :icon="item.icon" color="secondary" />
              <q-item-main :label="item.label"/>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
  </div>

</q-toolbar>
  </q-layout-header>    


    <q-page-container class="q-pt-xs">
      <router-view />
    </q-page-container>
  <q-layout-footer >

<q-tabs color="red" animated no-pane-border swipeable v-if="$q.platform.is.mobile && loggedIn" dense class="shadow-6">
  <q-route-tab v-for="(item,index) in tabMenu" :key="index"
  :icon="item.icon"  size="md" :to="item.to" exact slot="title"/>
</q-tabs>
  </q-layout-footer>
  </q-layout>
</template>

<script>
import search from '../components/search';

export default {
  components:{
    search
  },
  name: 'MyLayout',
  data () {
    return {
      toolBarMenu:[
        {label:"Log-Out", icon:"exit_to_app" ,to:"/logout"},
        {label:"Settings",  icon:"settings",  to:"/settings"},
        {label:"Help",  icon:"help",  to:"/help"}
      ],
      tabMenu:[
        {label:"Home", icon:"home", to:"/home"},
        {label:"Search", icon:"search" ,to:"/search"},
        {label:"Create", icon:"create",to:"/newstory"},
        {label:"Settings", icon:"person",to:"/account"}

      ]      
    }
  },
  computed:{
    loggedIn(){
         return this.$store.getters['auth/loggedIn'];
      }
  }
  }
</script>

<style>

</style>
