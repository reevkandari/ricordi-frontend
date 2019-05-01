<template>
<div class="full-width">
    <q-input classs="full-width" placeholder="Curent Password"
      autofocus v-model="pass.old" type="password" />

    <q-input classs="q-mt-lg full-width" placeholder="New Password"
     v-model="pass.new" type="password" />  
    <q-alert class="q-mt-md" v-if="error">{{error}}</q-alert>
    <q-btn label="submit" @click="changePass" color="primary" class="col q-mt-md full-width" />   

</div>
</template>

<script>
export default {
    data(){
        return{
            error:false,
            pass:{
                new:'',
                old:''
            }
        }
    },
    methods:{
        async changePass(){
            if(this.pass.new.length > 1 && this.pass.old.length > 1){
                var res = await this.$axios.post('change_my_pass',{pass:this.pass});
                if(res.status==202){
                    this.$q.notify({message:"Your Password has been changed"});
                    this.error=false;
                    this.pass.new = '';
                    this.pass.old = '';
                }else this.error=res.data.message;
            }else{
                this.error="Please Enter Both Passwords properly";
            }
        }
    }
}
</script>

<style>

</style>
