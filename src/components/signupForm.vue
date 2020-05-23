<template>
    <div class="col-xs-10 q-ma-xs q-pt-lg">
        <div v-if="!showSignupForm" class="bg-grey-3 q-pa-md">
            Yor Account has been created. We have sent you a verification email.
            If you still haven't recieved it click 
            <router-link to="/confirm" class="router-link">here</router-link>
            .
        </div>
        <div v-if="showSignupForm">
            <div class="q-display-1 text-center q-pa-xs">Create an Account</div>
            <div class="q-mb-md">
                <!--Input Elements-->
                <q-field :error-label="error.name" helper="Your Name" :error="$v.signupForm.name.$error">
                    <q-input v-model="signupForm.name" 
                        @blur="validateOne('name')" @keyup="validateAll"  />
                </q-field>                
                <q-field :error-label="error.email" helper="Your E-Mail Address" :error="$v.signupForm.email.$error">
                    <q-input v-model="signupForm.email" 
                        @keyup="validateOne('email')"/>
                </q-field>
                <q-field helper="Your Password" >
                    <q-input type="password" v-model="signupForm.pass"
                        @blur="validateOne('pass')" @keyup="validateAll" />
                </q-field>
                <!--Input Elements-->
            </div>
            <div class="q-mb-md text-weight-light">
                <small>
                By registering with us, you agree to our Terms and promise to abide by them.
                </small>
            </div>
            <q-alert class="q-mb-md text-center" color="red" v-if="error.form" >
                {{signupError}}
            </q-alert>
            <q-btn color="primary" :disabled="disableSignupButton" class="full-width block q-mb-md" 
                label="Sign-Up" @click="trySignup()" :loading="loading">
                <q-spinner-dots slot="loading"/>
            </q-btn>
            <div class="text-center q-mb-md">
                <router-link to="/login" class="router-link">Have and account? Login Here</router-link>
            </div>            
        </div>
    </div>
</template>



<script>
import { required, email , minLength} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            loading:false,
            signupError:null,
            showSignupForm:true,
            error:{
              form:false,
              email:"Please enter a valid e-mail address",
              name:"Please enter your full name properly"
            },
            acceptTerms:false,
            disableSignupButton:false,
            signupForm:{
              name: '',
              email: '',
              pass: ''
            }
        }
    },
    validations: {
      signupForm: {
        name:{required, minLength: minLength(4)},
        email: {required, email},
        pass: {required, minLength: minLength(4)}
      }
    },
    methods: {
      validateOne(elementName){
        eval("this.$v.signupForm."+elementName+".$touch()");
        var singleError = eval("this.$v.signupForm."+elementName+".$error");
        this.judgeValidation(singleError);
      },
      validateAll() {
        this.$v.signupForm.$touch();
        this.judgeValidation();
      },
      judgeValidation(singleError){
        var allError = this.$v.signupForm.$error;
        singleError = singleError || allError;
        if(singleError || allError){
          this.disableSignupButton = true;
        }else{
          this.disableSignupButton = false;
        }
      },
      async trySignup(){
        this.validateAll();
        if(this.$v.signupForm.$error) this.judgeValidation();
        else{
          this.loading = true;
          var res = await this.$axios.post('signup',{signupForm:this.signupForm});
          this.loading = false;
          if(res.status==201){
            this.showSignupForm=false;
          }else{
            this.error.form = true;
            this.signupError = res.data.message;
          }
        }
      }
      }  
    }
</script>

