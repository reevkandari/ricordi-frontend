<template>
</template>
<script>
export default{
    created: async function(){
        await this.$axios.post('logout');
        this.$q.localStorage.clear();
        this.$q.notify({message:"You have been logged Out"});
        this.$store.commit('auth/logMeOut');
        this.$router.push('/');  
    }
  
}
</script>