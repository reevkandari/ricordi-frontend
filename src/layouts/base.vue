<template>
  <q-layout view="lHh Lpr lFf">  
  <q-layout-header>

    <q-toolbar color="indigo-7">
      <q-btn  v-if="loggedIn" flat round dense @click="drawer = !drawer" icon="menu" />
      <q-toolbar-title> Ricordi </q-toolbar-title>
      <div v-if="$q.platform.is.desktop && loggedIn" 
    class="relative position col-8 flex row float-right q-ml-xl q-pl-xl">
    <q-field class="col-12 float-right bg-white round-borders">
      <search />
    </q-field>
    </div>  
    </q-toolbar>
  </q-layout-header>

  <!-- Left Side Drawer -->
  <q-layout-drawer :width=drawerWidth v-if="loggedIn" side="left" v-model="drawer">
        <div class="flex bg-red-6  text-white justify-center q-pt-md q-pb-xs">
            <img class="shadow-3" :width=avatarSize :height=avatarSize
            style="border-radius:360px;border:2px solid white" 
            :src="profile.avatar | avatarImage"/>
            <div class="text-center q-ma-xs">
              <div class="capitalize q-title">{{profile.name}}</div>
              <div class="q-text-light q-body-2">@{{profile.slug}}</div>
        </div>
        </div>


    <q-list no-border link >
      <q-item class="" v-for="(item,index) in menuList" :key=index :to=item.to>
        <q-item-side :icon=item.icon />
        <q-item-main :label=item.label />
      </q-item>
    </q-list>
    <div class="absolute-bottom text-center text-white bg-indigo">
      Made by Rishabh at RiviLabs
    </div>
  </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  <q-layout-footer >
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
      drawerWidth:(this.$q.platform.is.desktop) ? screen.width/5 : screen.width/1.5,
      avatarSize: screen.height/5,
      drawer:this.$q.platform.is.desktop,
      toolBarMenu:[
        {label:"Log-Out", icon:"exit_to_app" ,to:"/logout"},
        {label:"Settings",  icon:"settings",  to:"/settings"},
        {label:"Help",  icon:"help",  to:"/help"}
      ],
      menuList:[
        {label:"Home", icon:"home", to:"/home"},
        {label:"Search", icon:"search" ,to:"/search"},
        {label:"Create", icon:"create",to:"/newstory"},
        {label:"Account", icon:"person",to:"/account"},
        {label:"Settings", icon:"settings",to:"/settings"},
        {label:"Log-Out", icon:"exit_to_app" ,to:"/logout"},
        {label:"About This Project",  icon:"help",  to:"/about-this-project"}        
      ]      
    }
  },
  computed:{
    loggedIn(){
         return this.$store.getters['auth/loggedIn'];
      },
    profile(){
      return this.$store.getters['user/profile'];
    }
  }
  }
</script>

<style>

</style>
