<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar dense class="row" :class="{'justify-center':$q.platform.is.desktop}" color="indigo-7" v-if="loggedIn">
        <div class="col-lg-8 col-xl-8 row justify-around">
  
          <!--Toolbar avatar-->
          <div class="col-1">
          <img class="float-left shadow-3 avatar dense" style="border-radius:360px;border:2px solid white" :src="profile.avatar | avatarImage" />
          <q-popover>
            <div class="q-pa-xs">
              <q-list link dense no-border>
                <q-item v-for="(item,index) in toolBarMenu" :key=index :to=item.to>
                  <q-item-side :icon=item.icon />
                  <q-item-main :label=item.label />
                </q-item>
              </q-list>
            </div>
          </q-popover>
          </div>
          <!--Toolbar -->
          <div class="col-auto row">
            <q-tabs color="default" animated no-pane-border>
              <q-route-tab v-for="(item,index) in desktopTabMenu" :key="index" :icon="item.icon" size="md" :to="item.to" exact slot="title" />
            </q-tabs>
          </div>
          <!--tabs-->


          <div v-if="$q.platform.is.mobile" class="col-auto row">
            <q-btn class="absolute-right q-pr-md" size="lg" flat dense icon="search" @click="mobileSearch = !mobileSearch" />
          </div>
  
          <!--Toolbar Search Box-->
          <div v-if="$q.platform.is.desktop" class="q-pa-sm col-6 row">
            <q-field class="col-12 bg-white round-borders">
              <search />
            </q-field>
          </div>
  
        </div>
      </q-toolbar>
  
      <q-field v-if="mobileSearch" class="bg-white col-12 bg-white round-borders ">
        <q-field class="col-12 bg-white round-borders ">
          <search />
        </q-field>
      </q-field>
  
    </q-layout-header>
  
  
    <q-page-container class="row justify-center">
      <router-view class="col-lg-10 col-xl-10" />
    </q-page-container>
  
    <q-layout-footer> </q-layout-footer>
  </q-layout>
</template>

<script>
  import search from '../components/search';
  
  export default {
    components: {
      search
    },
    name: 'MyLayout',
    data() {
      return {
        mobileSearch: false,
        drawerWidth: (this.$q.platform.is.desktop) ? screen.width / 5 : screen.width / 1.5,
        avatarSize: screen.height / 16,
        drawer: this.$q.platform.is.desktop,
        toolBarMenu: [{
            label: "Account",
            icon: "person",
            to: "/account"
          },
          {
            label: "Settings",
            icon: "settings",
            to: "/settings"
          },
          {
            label: "Log-Out",
            icon: "exit_to_app",
            to: "/logout"
          },
          {
            label: "Help",
            icon: "help",
            to: "/help"
          }
        ],
        desktopTabMenu: [{
          label: "Home",
          icon: "home",
          to: "/home"
        }],
        mobileTabMenu: [{
            label: "Home",
            icon: "home",
            to: "/home"
          },
          {
            label: "Search",
            icon: "search",
            to: "/search"
          },
          {
            label: "Account",
            icon: "person",
            to: "/account"
          }
        ]
      }
    },
    computed: {
      loggedIn() {
        return this.$store.getters['auth/loggedIn'];
      },
      profile() {
        return this.$store.getters['user/profile'];
      }
    }
  }
</script>

<style>
  
</style>
