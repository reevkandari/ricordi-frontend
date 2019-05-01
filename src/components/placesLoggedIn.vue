<template>
<div>
    <q-btn v-if="loginHistory.length < 1" class="full-width q-mb-md" label="Show Recent Login Information" 
    @click="loadLogins" />
    <q-btn v-else color="red" class="full-width q-mb-md" label="Log Me Out of all devices" 
    @click="logOutAllDevices" />    
    <q-scroll-area v-if="loginHistory.length > 0" style="height: 250px;">
    <q-list>
        <q-item v-for="(item,index) in loginHistory" :key="index" >
            <q-item-side icon="computer" />
            <q-item-main>
            {{item.createdAt | dateClean}} using a  &nbsp;<b>{{item.device}}</b>
            &nbsp;from &nbsp;<b>{{item.remoteAddr}}</b>
            </q-item-main>
            <!--
            <q-item-side icon="close" class="clickable" @click="logOutThisDevice(index)" />
            -->
        </q-item>
    </q-list>
    </q-scroll-area>
</div>
</template>

<script>
export default {
    data(){
        return{
            loginHistory:[]
        }
    },
    methods:{
        async logOutThisDevice(index){

            var res = await this.$axios.post('log_out_all_devices',
            {session_id:this.loginHistory[index]._id});
            if(res.status==204){
                delete this.loginHistory[index];
                this.$q.notify({message:"Logged out from that device",color:"green"})
            }else{
                this.$q.notify({message:"Unauthorized",color:"green"})
            }
        },
        async logOutAllDevices(){
            await this.$axios.post('log_out_all_devices');
            this.$router.push('/logout');
        },
        async loadLogins(){
            var res = await this.$axios.get("active_sessions");
            this.loginHistory = res.data;
        }
    }
}
</script>

<style>
.clickable{
    cursor:pointer;
}
</style>
