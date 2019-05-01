<template>
  <q-page class="row q-mt-sm">
    <div class="col-lg-6">
      <newStory class="q-pa-xs" />
    </div>  

    <div v-if="$q.platform.is.desktop" class="col-lg-6 q-pa-xs">
      <ul>
        <li>Write a story and share it with your followers and everyone else.</li>
        <li>You can predate a story to the date it actually happened.</li>
        <li>You can keep stories private that you do not wish to share with the world.</li>
        <li>Short titles make them easy on the eyes.</li>
      </ul>
    </div>

  </q-page>
</template>

<style>
</style>

<script>
import newStory from '../components/newStory'
export default {
  components:{
    newStory,
  },
 
}
</script>
<style>
li{
  font-size:1.2em;
  margin-bottom: 10px;
}
</style>
