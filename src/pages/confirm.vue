

<template>
    <q-page class="flex row justify-center">
        <div class="col-lg-6 col-xs-10 q-ma-lg">
            <div v-if="newRequest">
                <div v-if="!mailSent">
                    <p class="q-display-1 text-center">Enter Your Email</p>
                    <p>We will re-send a confirmation mail to active your account</p>
                    <q-field error-label="That doesn't look like an email" 
                    helper="Your E-Mail Address" :error="$v.email.$error">
                        <q-input v-model="email"  
                            @keyup="$v.email.$touch()" />
                    </q-field>
                    <q-alert class="q-mb-md text-center" color="red" v-if="error" >
                        {{errorMessage}}
                    </q-alert>
                    <q-btn color="primary" :disabled="$v.email.$error" class="full-width block q-ma-md" 
                        label="Submit" @click="newConfirmRequest" :loading="loadingBtn">
                        <q-spinner-dots slot="loadingBtn"/>
                    </q-btn>
                </div>
                <div v-if="mailSent" class="bg-grey-3 q-pa-md">
                    We have sent a new confirmation email. Please follow it to activate your account.                    
                </div>
            </div>
            <div v-else>
                <div class="bg-grey-3 q-pa-md">
                    {{validationResponse}}                    
                </div>
               <div class="text-center q-pa-md">
                    <q-btn v-if="validationFail" color="primary" label="Request a new one" @click=flip />
                    <q-btn v-else color="primary" label="Log-In" @click="$router.push('/login');" />                    
                </div>                
            </div>
            
        </div>
    </q-page>
</template>


<script>
import { required, email } from 'vuelidate/lib/validators'
export default{
    data(){
        return{
            errorMessage:'',
            error:false,
            mailSent:false,
            code:'',
            newRequest:true,
            email:'',
            loadingBtn:false,
            validationResponse:'',
            validationFail:false,
        }
    },
    validations:{
        email:{required,email}
    },
    methods:{
        async newConfirmRequest(){
            this.$v.email.$touch();
            if(!this.$v.email.$error){
                this.loadingBtn = true;
                var res = await this.$axios.post('newConfirmRequest',{email:this.email});
                this.loadingBtn = false;
                if(res.status == 201) this.mailSent = true;
                else{
                    this.errorMessage = res.data.message;
                    this.error=true;
                }
            }   
        },
        flip(){
            this.newRequest = !this.newRequest;
        }        
    },
    async mounted(){
        this.code = this.$route.params.code;
        if(this.code){
            this.newRequest = false;
            var res = await this.$axios.post('verifyConfirmRequest',{code:this.code});
            if(res.status!=202) this.validationFail = true;
            this.validationResponse = res.data.message;
        }
    }
}
</script>