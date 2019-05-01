<template>
  <q-page class="row q-pt-xs justify-center">
        <q-field class="col-lg-6 col-12 round-borders">
          <search />
        </q-field>
  </q-page> 
</template>

<script>
import search from '../components/search'
export default {
    components:{
        search
    }
}
</script>
