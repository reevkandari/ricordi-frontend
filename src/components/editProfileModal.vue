<template>
	<q-modal class="row" v-model=showModal :content-css="modalCSS" no-esc-dismiss no-backdrop-dismiss>
		<q-modal-layout>
			<!--Toolbar -->
            <q-toolbar slot="header">
				<q-btn class="absolute-left" flat round dense size="lg" 
                    icon="close" @click="$emit('closed')"/>
				<q-btn class="absolute-right" size="lg" flat round dense
                    icon="check" @click="updateProfile"/>
				<q-toolbar-title class="text-center">
                    Edit your Profile
                </q-toolbar-title>
			</q-toolbar>
			<!--Toolbar -->


			<div class="q-pa-lg">
				<div class="q-mb-md">
					<q-alert class="q-mb-md text-center" color="red" v-if="error" >
                        {{errorMessage}}.
                    </q-alert>
					<div class="flex row justify-center col-4 q-mb-md">
						<img v-if="showAvatar" @click="$refs.profilePic.click()" width="100px" 
                        height="100px" style="border-radius:360px;" 
                        :src="profile.avatar | avatarImage">
							<input @change="uploadAvatar" ref="profilePic"
                         accept="image/x-png,image/gif,image/jpeg" 
                          type="file" style="display:none"/>
						</img>
					</div>
					<!--Input Elements-->
					<q-input v-model="profile.name" float-label="Your Name"/>
					<q-input v-model="profile.slug" float-label="Username"/>
					<q-field :count=151 >
						<q-input maxlength=151 :rows="2" type="textarea" 
                            v-model="profile.bio" float-label="Describe yourself" />
					</q-field>
					<!--Input Elements-->
				</div>
			</div>
		</q-modal-layout>
	</q-modal>
</template>


<script>
export default{
    props:{
        show:{       
            type:Boolean
        }               
    },
    data(){
        return{
            showModal:this.show,
            error:false,
            errorMessage:null,
            showAvatar:true,
            modalCSS:{
                minWidth: (this.$q.platform.is.desktop)? '40vw' : '100vw',
                minHeight:(this.$q.platform.is.desktop)? '80vh' : '80vh'
            }  
        }
    },
    watch:{ 
        show: function(newVal, oldVal) {
            this.showModal = newVal;
        }             
    },
    methods:{
        selectFile(){
            document.getElementById('profilePic').click();
        },        
        async notify(message,type){
            this.$q.notify({
                message: message,
                position: 'center',
                timeout: 800, 
                type: type,
            });
        },
        async updateProfile(){
            var newProfile = this.$_.pick(this.profile,['avatar, bio, name, slug']);
            var res = await this.$axios.post('updateProfile',{newProfile:this.profile});
            if(res.status != 200){
                this.error = true;
                this.errorMessage = res.data.message;                
            }else{
                this.profile.avatar = res.data.profile.avatar;
                this.$q.localStorage.set('profile',this.profile);
                this.$store.commit('user/profileUpdate',this.profile);
                this.$emit('closed');
                this.$emit('updated');
                this.notify('Your profile has been updated','positive');
            }       
        },
        async uploadAvatar(){
            this.showAvatar = false;
            var profilePic = this.$refs.profilePic.files[0];
            this.profile.avatar = window.URL.createObjectURL(profilePic);
            this.showAvatar = true;
            var formData = new FormData();
            formData.append('avatar',profilePic);
            await this.$axios.put('uploadAvatar',formData);         
        }   
    },
    computed:{
        myProfile(){
            return this.$store.getters['user/profile'];
        },
        profile(){
            return JSON.parse(JSON.stringify(this.myProfile));
        }        
    }
}
</script>