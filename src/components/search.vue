<template>
<q-input class="q-pl-md q-pr-md " v-model="terms" placeholder="Search for Users" 
:after="[{icon:'search'}]" >
    <q-autocomplete :debounce=350 @click="navigate" @selected="navigate" @search="search" hide-underline />
</q-input>
</template>

<script>
export default {
    data(){
        return{
            terms:null
        }
    },
    methods:{
        async search(terms,done){
            var res = await this.$axios.get('searchUser',{params:{name:terms}});
            var usersArray=[];
            if(res.data.length > 0){

                this.$_.forEach(res.data, (value)=>{
                    usersArray.push({
                        label:value.name, 
                        avatar:this.$options.filters.avatarImage(value.avatar),
                        sublabel:'@'+ value.slug
                    });                    
                });
                /*
                this.$_.forEach(res.data, function(value) {
                    usersArray.push({
                        label:value.name, 
                        avatar:this.$options.filters.avatarImage(value.avatar),
                        //'https://ricordi.rivilabs.com/media/'+value.avatar, 
                        sublabel:'@'+ value.slug
                    });
                });*/
            }else{
                usersArray.push({
                    label:'No Users Found',
                    sublabel:'Try searching again',
                    user:false 
                });                
            }
            done(usersArray);
        },
        async navigate(item,keyboard){
            if(!item.user){
                var routeToPush = item.sublabel.replace('@','/');
                this.$router.push(routeToPush);
            }
        }
    }
}
</script>
