<template>
  <div class="row relative-position">
    <!-- Template Chalu-->
    <!-- if such a user Exists-->
    <div v-if="profileExists" class="row">
      <!-- User PRofile-->
      <div class="col-lg-6 col-xl-6 col-12 justify-center">
        <div class="q-pa-sm  column row  sticky justify-center shadow-4" :class="{'q-ma-sm':$q.platform.is.desktop}">
          <!-- Upper Part of profile-->
          <div class="row">
            <!-- Avatar Image / Left side of upper profile-->
            <div class="col-4 row justify-center">
              <img class="q-pa-xs" :width=avatarSize :height=avatarSize style="border-radius:360px;border:1px solid grey" :src="profile.avatar | avatarImage" />
            </div>
            <!-- Avatar Image / Left side of upper profile-->
            <!-- Buttons and name / Right side of upper profile-->
            <div class="col-8">
              <div class="row justify-center q-mt-sm q-pl-md q-pr-md">
                <!-- Name and Username-->
                <span class="full-width q-title capitalize">{{profile.name}}</span>
                <span class="full-width q-caption">@{{profile.slug}}</span>
                <!-- Name and Username-->
  
                <!-- Follow Unfollow buttons-->
                <div class="row q-mt-md column full-width">
                  <div class="row column" v-for="(item,index) in profileButtons" :key=index>
                    <q-btn :icon="item.icon" :color="item.color" :label="item.label" 
                    :outline=item.outline size="md" class="q-mb-sm" @click="profileAction(item.click)" />
                  </div>
                </div>
                <!-- Follow Unfollow buttons-->
  
              </div>
            </div>
          </div>
          <!-- Buttons and name / Right side of upper profile-->
          <!-- Upper Part of profile-->
  
          <!-- Middle part of Profile with stats-->
          <div class="row full-width text-center q-pt-md">
            <div class="col-4" v-for="(item,index) in profile.stats" :key=index>
              <span class="text-weight-medium infoCount">{{item.count}}</span>
              <p class="text-weight-thin infoName">{{item.name}}</p>
            </div>
          </div>
          <!-- Middle part of Profile with stats-->
  
          <!-- Lower part of Profile with User Bio-->
          <div class="row">
            <p class="text-weight-regular q-pl-sm" v-html="$options.filters.text2html(profile.bio)" />
          </div>
          <!-- Lower part of Profile with User Bio-->
        </div>
      </div>
      <!-- User PRofile-->
      <div class="col-lg-6 col-xl-6 col-12 q-pt-sm">
        <showStories  :userId=profile._id />
      </div>
  
    </div>
  
    <!-- if Profile not found -->
    <div v-else class="row">
      <Error404 />
    </div>
  
    <!-- Template Khatam-->
    <editProfileModal v-if="me" :show=editModal @closed="editModal = false" 
    @updated="reloadProfile" />
     
  
  </div>
  </div>
</template>

<script>

import editProfileModal from "./editProfileModal";
import showStories from "./showStories";
import Error404 from "../pages/Error404";

export default {
  components: {
    editProfileModal,
    Error404,
    showStories
  },
  props: {
    pr_me: {
      type: Boolean
    }
  },
  data() {
    return {
      profile: {},
      profileExists: true,
      avatarSize: screen.height / 5.5,
      editModal: false,
      messageModal: false
    };
  },
  methods: {
    message() {
      if (this.me) this.$router.push('/messages');
      else {
        this.messageModal = true;

      }
    },
    toggleEditProfileModal() {
      this.editModal = true;
    },
    sendMessage() {
      if (this.me) this.$router.push('/messages');
      else {
        this.messageModal = true;
      }
    },
    profileAction(action) {
      eval('this.' + action + '()');
    },
    async relate() {
      var action = (this.followingThem) ? 'unfollow' : 'follow';
      await this.$axios.put(action, {
        theirId: this.profile._id
      });
      this.reloadStats();
    },
    async reloadStats() {
      var res = await this.$axios.get('me/stats following');
      var userData = {
        stats: res.data.stats,
        following: res.data.following
      };
      this.$_.forEach(userData, async(value, key) => {
        this.$q.localStorage.set(key, value);
      });
      this.$store.dispatch('user/loadProfile', userData);
      this.reloadProfile();
    },
    async reloadProfile() {
      var userStats = {};
      if (this.me) {
        this.profile = this.myProfile;
        userStats = this.myStats;
      } else {
        var res = await this.$axios.get(
          "theirProfile/" + this.$route.params.slug
        );
        if (res.status != 200) this.profileExists = false;
        else {
          this.profile = res.data.profile;
          userStats = res.data.stats;
        }
      }
      this.profile.stats = Array();
      this.$_.forEach(userStats, async(value, key) => {
        this.profile.stats.push({
          name: key,
          count: value
        });
      });
    }
  },
  watch: {
    $route: function(newRoute, oldRoute) {
      this.reloadProfile();
    }
  },
  computed: {
    followingThem() {
      return (this.$_.indexOf(this.myFollowing, this.profile._id) > -1) ? true : false;
    },
    profileButtons() {
      var buttons = Array();
      if (this.me) {
        buttons.push({
          color: 'blue',
          label: 'Edit Profile',
          icon: 'create',
          outline: true,
          click: 'toggleEditProfileModal'
        });
      } else {
        if (this.followingThem) {
          buttons.push({
            color: 'red',
            label: 'Un-Follow',
            icon: 'person_add_disabled',
            click: 'relate'
          });
        } else {
          buttons.push({
            color: 'green',
            label: 'Follow',
            icon: 'person_add',
            click: 'relate'
          });
        }
      }

      return buttons;

    },
    me() {
      return this.pr_me;
    },
    myProfile() {
      return this.$store.getters["user/profile"];
    },
    myFollowing() {
      return this.$store.getters["user/following"];
    },
    myStats() {
      return this.$store.getters["user/stats"];
    }
  },
  created: async function() {
    await this.reloadStats();
  }
};
</script>

<style>
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 10vh;
  }
  
  .infoName {
    font-size: 0.8em;
  }
  
  .infoCount {
    font-size: 1.2em;
  }
</style>
