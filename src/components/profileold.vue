<template>

<div  class="col-xl-6 col-lg-6 col-xs-12 col-md-12 q-pa-lg">
    <div class="flex row">  
        <div class="col-4">
            <img :width=avatarSize :height=avatarSize 
            style="border-radius:360px;border:2px solid red" 
            :src="profile.avatarImage"/>
        </div>

        <div class="col-8 text-center flex row q-pt-md">
            <div class="col-4" v-for="(item,index) in stats" :key=index>
                <span class="text-weight-medium infoCount">{{item.count}}</span>                
                <p class="text-weight-thin infoName">{{item.name}}</p>
            </div>
                <q-btn v-if=me icon="edit" outline  label="Edit Profile" 
                size="sm" class="q-mb-xs full-width" @click="editModal = true"/>

                <q-btn v-if="!me && !followingThem"  outline color="green" label="Follow" 
                size="sm" class="q-mb-xs full-width"  @click="act('follow')"/>

                <q-btn v-if="!me && followingThem" outline color="red" label="Un-Follow" 
                size="sm" class="q-mb-xs full-width" @click="act('unfollow')"/>                

            <span class="text-center full-width" >
            @{{ profile.slug }}
            </span>
        </div>
    </div>

    <div class="flex row q-mt-md">
        <div>
            <span class="q-title q-mb-lg capitalize">{{profile.name}}</span><br>
            <div class="infoName q-pt-xs " v-html=profileBioHtml />
        </div>
    </div>
    <hr>
   
<editProfileModal :show=editModal :myProfile=profile  
@closed="editModal = false" @updated="reloadProfile"/> 



</div>


</template>

<script>
import editProfileModal from './editProfileModal';

export default {
    components:{
        editProfileModal
    },
    props:{
        pr_me:{       
            type:Boolean
        }        
    },
    data () {
        return{
            profile:{},
            avatarSize: screen.height/5,
            stats : [],
            editModal:false,
            profileBioHtml:null,
            followingThem:false,
        }
    }, 
    methods: {
        async act(type){
            var res = await this.$axios.post(type,{user:profile._id});
        },
        async reloadProfile(){
            this.stats = [];
            var userStats = {};
            if(this.me){
                this.profile = this.myProfile;
                userStats = this.myStats;
            }else{
                var res = await this.$axios.get('theirProfile/'+this.$route.params.slug);
                this.profile = res.data.profile;
                this.followingThem = (this.$_.indexOf(this.following, this.profile._id ) >= 0) ? true :false;
                userStats = res.data.stats;
            }
            /*
            if(!this.me && this.profile.avatar){
                    this.profile.avatarImage = 'https://wisedumb.rivilabs.com/media/'+ this.profile.avatar;
            }            
            else {
                this.profile.avatarImage = '../assets/emptyProfile.jpg';
            }*/
            if(this.profile.avatar && !this.profile.avatar.includes(':')){
                this.profile.avatarImage = 'https://wisedumb.rivilabs.com/media/'+ this.profile.avatar;
            }             
            if(this.profile.bio) this.profileBioHtml = this.profile.bio.replace(/\n/g, "<br />");             
            this.$_.forEach(userStats, async (value,key) => {
                this.stats.push({name:key, count: value});
            });
        }
    },
    watch: {
        pr_me: function (newVal , oldVal) {
            this.reloadProfile();
        },
        $route: function (newRoute,oldRoute) {
            this.reloadProfile();
        }        
    },
    computed:{
        me(){
            return this.pr_me;
        },
        myProfile(){
            return this.$store.getters['user/profile'];
        },
        myfollowing(){
            return this.$store.getters['user/following'];
        },
        myStats(){
            return this.$store.getters['user/stats'];
        }              
    },
    created: async function(){
        await this.reloadProfile();
    }      
}

</script>
<style>
.infoName{
    font-size:0.9em;
}
.infoCount{
    font-size:1.3em;
}

</style>
