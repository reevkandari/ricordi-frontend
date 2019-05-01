<template>
<div>
        <!-- Upper Part of profile-->
        <div class="row" >
            <!-- Avatar Image / Left side of upper profile-->
            <div class="col-4 row justify-center">
                <img class="shadow-2" :width=avatarSize :height=avatarSize style="border-radius:360px;border:2px solid white" :src="profile.avatar | avatarImage" />
            </div>
            <!-- Avatar Image / Left side of upper profile-->

            <!-- Buttons and name / Right side of upper profile-->
            <div class="col-8">
                <div class="row justify-center q-mt-sm q-pl-md q-pr-md">
                    <!-- Name and Username-->
                    <span class="full-width q-title capitalize">{{profile.name}}</span>
                    <br>
                    <span class="full-width q-caption">@{{profile.slug}}</span>
                    <!-- Name and Username-->

                    <!-- Follow Unfollow buttons-->
                    <div class="q-mt-md">
                        <q-btn v-if=me icon="edit" outline label="Edit Profile" size="sm"
                         class="q-mb-xs full-width" @click="editModal = true" />
                        <q-btn v-if="!me && !followingThem" outline color="green" label="Follow" 
                        size="sm" class="q-mb-xs full-width" @click="act('follow')" />
                        <q-btn v-if="!me && followingThem" outline color="red" label="Un-Follow" 
                        size="sm" class="q-mb-xs full-width" @click="act('unfollow')" />
                        <q-btn v-if=!me color="red" label="Send secret Message" size="sm" 
                        class="q-mb-xs full-width" />
                    </div>
                    <!-- Follow Unfollow buttons-->
                </div>

            </div>
            <!-- Buttons and name / Right side of upper profile-->
        </div>
        <!-- Upper Part of profile-->

        <!-- Middle part of Profile with stats-->
        <div class="row full-width  text-center q-pt-md">
            <div class="col-4" v-for="(item,index) in stats" :key=index>
                <span class="text-weight-medium infoCount">{{item.count}}</span>
                <p class="text-weight-thin infoName">{{item.name}}</p>
            </div>
        </div>
        <!-- Middle part of Profile with stats-->

        <!-- A horizontal separator
                        <hr class="q-hr q-mr-md q-ml-md">
            -->
        <!-- Lower part of Profile with User Bio-->
        <div class="row">
            <p class="text-weight-regular" v-html="$options.filters.text2html(profile.bio)" />
        </div>
        <!-- Lower part of Profile with User Bio-->
<editProfileModal v-if="me" :show=editModal 
@closed="editModal = false" @updated="reloadProfile" />

</div>
</template>

<script>
import editProfileModal from "./editProfileModal";

export default{
    components:{
        editProfileModal
    },
    props:{
        userData:{
            type:Object
        },
        pr_me:{
            type:Boolean
        },
        following:{
            type:Boolean
        }        
    },
    data(){
        return{
            editModal:false,
            avatarSize: screen.height / 5.5,
        }
    },
    methods:{
    async act(type) {
      await this.$axios.put(type, { theirId: this.profile._id });      
      this.$emit('updated');
    }
    },
    computed:{
        profile(){
            return this.userData;
        },
        followingThem(){
            return this.following;
        },
        me(){
            return this.pr_me;
        },        
        stats(){
            var stats= [];
            this.$_.forEach(this.userData.stats, async (value, key) => {
                stats.push({ name: key, count: value });
            });
            return stats;
        }
    },
}

</script>