

<template>
    <q-page class="flex row justify-center">
        <div class="col-lg-6 col-xs-10 q-ma-lg">
            <div v-if="newRequest">
                <div v-if="!mailSent">
                    <p class="q-display-1 text-center">Enter Your Email</p>
                    <p>We will send you an email with a password reset link</p>
                    <q-field error-label="That doesn't look like an email" 
                        helper="Your E-Mail Address" :error="$v.email.$error">
                        <q-input v-model="email"  
                            @keyup="$v.email.$touch()" />
                    </q-field>
                    <q-alert class="q-mb-md text-center" color="red" v-if="error" >
                        {{errorMessage}}
                    </q-alert>
                    <q-btn color="primary" :disabled="$v.email.$error" class="full-width block q-ma-md" 
                        label="Submit" @click="newForgotRequest" :loading="loadingBtn">
                        <q-spinner-dots slot="loadingBtn"/>
                    </q-btn>
                </div>
                <div v-else class="bg-grey-3 q-pa-md">
                    We have sent an email with a new password reset link. Please follow it to change your password.                    
                </div>
            </div>
            <div v-else>
                <div class="q-pa-md">
                    <div v-if="validationFail" class="text-center ">
                      <div class="bg-grey-3 q-pa-md">
                        {{validationResponse}}                    
                      </div>                      
                        <q-btn  color="primary" label="Request a new one" @click=flip />
                    </div>
                    <div v-else>
                        <div v-if="passChanged">
                          <div class="bg-grey-3 q-pa-md">
                            Your password has been changed. You can now Log-In with your new password.
                          </div>
                          <q-btn class="full-width q-mt-md" color="primary" label="Log-In" @click="$router.push('/login');" />
                        </div>
                        <div v-else>
                          <div>
                            Type in a new password for your account.
                          </div>                            
                            <q-field error-label="A password is required" 
                                helper="A new password" :error="$v.newPass.$error">
                                <q-input type="password" v-model="newPass"  
                                    @keyup="$v.newPass.$touch()" />
                            </q-field>
                            <q-alert class="q-mb-md text-center" color="red" v-if="passChangeError" >
                                {{passChangeErrorMessage}}
                            </q-alert>
                            <q-btn class="full-width q-mt-md" color="primary" label="Submit" @click=submitNewPass />
                        </div>
                    </div>
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
            newPass:'',
            passChangeError:'',
            passChangeErrorMessage:'',
            passChanged:false
        }
    },
    validations:{
        email:{required,email},
        newPass:{required}
    },
    methods:{
        async newForgotRequest(){
            this.$v.email.$touch();
            if(!this.$v.email.$error){
                this.loadingBtn = true;
                var res = await this.$axios.post('newForgotRequest',{email:this.email});
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
        },
        async submitNewPass(){
            this.$v.newPass.$touch();
            if(!this.$v.newPass.$error){
              this.loadingBtn = true;
              var res = await this.$axios.post('changePassword',{newPass:this.newPass});
              this.loadingBtn = false;            
              if(res.status == 202){
                this.passChanged = true;
              }else{
                this.passChangeErrorMessage = res.data.message;
                this.error = true;                                  
              }
            }          
        }  
    },
    async mounted(){
        this.code = this.$route.params.code;
        if(this.code){
            this.newRequest = false;
            var res = await this.$axios.post('verifyForgotRequest',{code:this.code});
            if(res.status!=202){
              this.validationFail = true;
              this.validationResponse = res.data.message;
            }
        }
    }
}
</script>