<template>
  <q-page>
    <div class="row q-ma-md justify-center">
      <div class="col-lg-8 ">
        <div v-if="$q.platform.is.desktop" class="column full-width shadow-5 q-pa-sm q-mb-md row">
          <q-input type="textarea" :value=null rows=2 hide-underline @click="newStoryModal=true" :placeholder="newStoryPlaceholder" />
        </div>
        <div class="column row">
          <showStories />
        </div>
      </div>
    </div>
  
    <!--
              <q-btn v-if="$q.platform.is.desktop" color="red-6" class="full-width block q-ma-md" 
              label="Create New Story" @click="newStoryModal =true">
              </q-btn>
  -->
    <!-- Modal hai -->
    <q-page-sticky v-if="$q.platform.is.mobile" position="bottom-right" :offset="[20, 20]">
      <q-btn round color="red-6" @click="newStoryModal = true" icon="create" size="lg" />
    </q-page-sticky>
  
  
    <q-modal v-model=newStoryModal :content-css="modalCSS" no-backdrop-dismiss>
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn class="absolute-left" flat round dense size="lg" icon="close" @click="newStoryModal=false" />
          <q-toolbar-title class="text-center">
            Write a New Story
          </q-toolbar-title>
        </q-toolbar>
        <newStory @created="newStoryModal = false" />
      </q-modal-layout>
    </q-modal>
    <!--Modal-->
  
  </q-page>
</template>

<style>
  
</style>

<script>
  import newStory from '../components/newStory'
  import showStories from '../components/showStories'
  
  export default {
    components: {
      newStory,
      showStories
    },
    data() {
      return {
        modalCSS: {
          minWidth: (this.$q.platform.is.desktop) ? '20vw' : '100vw',
          minHeight: (this.$q.platform.is.desktop) ? '20vh' : '80vh',
          maxWidth: (this.$q.platform.is.desktop) ? '40vw' : '100vw',
          maxHeight: (this.$q.platform.is.desktop) ? '80vh' : '100vh'
        },
        newStoryModal: false
      }
    },
    computed: {
      newStoryPlaceholder() {
        var name = this.$store.state.user.profile.name.split(/\s(.+)/)[0];
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return 'Hi ' + name + ' ! Post something Here';
      }
    }
  }
</script>

<style>
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 10vh;
  }
</style>