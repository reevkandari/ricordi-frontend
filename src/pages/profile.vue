<template>
<q-page class="flex row q-ma-sm">
    <profilePage :pr_me=me />
</q-page>
</template>

<script>
import profilePage from '../components/profilePage.vue'

export default {
    components:{
        profilePage
    },
    data(){
        return{
            me:false,
        }
    },
    methods:{
        isItMe(newSlug){
            this.me = (this.$store.state.user.profile.slug == newSlug) ? true : false;
        }
    },
   watch: {
    $route: function (newRoute,oldRoute) {
        this.isItMe(newRoute.params.slug);
    },
   },
   created:function(){
       this.isItMe(this.$route.params.slug);       
   }   
}
</script>
<style>

</style>
