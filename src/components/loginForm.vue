
<template>
 <div class="col-xs-10 q-ma-xs q-pt-lg">
    <div class="q-display-1 text-center q-pa-xs">Log-In to Continue</div>
    <div class="q-mb-md">
        <q-field error-label="Username or Email required" helper="Username or Email"
        :error="$v.loginForm.accName.$error">
            <q-input v-model="loginForm.accName"/>
        </q-field>
        <q-field error-label="Password required"  helper="Your Password"
        :error="$v.loginForm.pass.$error">
            <q-input type="password" v-model="loginForm.pass"/>
        </q-field>    
    </div>    
    <q-alert class="q-mb-md text-center" color="red" v-if="loginError" >
        {{errorMessage}}.
        <span v-if="accNotVerified">
            Your email isn't verified, Click 
            <router-link class="router-link" to="/confirm">here</router-link> to request a 
            verification email for your account.
            </span>
        </q-alert>
    <q-btn color="primary" class="full-width block q-mb-md" 
    label="Log-In" @click="login()" :loading="loading">
    <q-spinner-dots slot="loading" />
    </q-btn>
    <div class="text-center q-mb-md">
            <router-link to="/forgot" class="router-link"> Forgot Password ? </router-link>
    </div>
    <div class="text-center q-mb-md">
            <router-link to="/signup" class="router-link">Naye Aaye ho? Create an Account</router-link>
    </div>
    <div class="text-center q-mb-md">
            <router-link to="/confirm" class="router-link">Verify your Email</router-link>
    </div>    
  </div>

</template>

<script>
import { required, email , minLength} from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            accNotVerified:false,
            loading:false,
            loginError:false,
            errorMessage: "Yo la",
            loginForm: {
                accName: '',
                pass: ''
            },
        }
    },
    validations: {
        loginForm:{
            accName:{required},
            pass:{required}
        }
    },
    methods: {
      async login(){
          this.accNotVerified=false;
          this.loginError=false;
          this.$v.loginForm.$touch();
          if(!this.$v.loginForm.$error){
              this.loading =true;
              var res = await this.$axios.post('login', {loginForm:this.loginForm});
              this.loading =false;
              if(res.status!=201){
                  this.loginError = true;
                  this.errorMessage = res.data.message;
                  if(res.status==200) this.accNotVerified = true;
              }
              else{
                  var res = await this.$axios.get('me/_id name avatar slug bio stats following');
                  var user = res.data; 
                  var profile = {_id:user._id, name:user.name, avatar : user.avatar, slug : user.slug, bio : user.bio};
                  var userData = {profile , stats: user.stats , following : user.following || Array()};
                  this.$_.forEach(userData, async (value, key)=>{
                      this.$q.localStorage.set(key,value);
                });
                this.$store.commit('auth/logMeIn');
                this.$router.push('/home');
              }
          }
        }
      }
    }
</script>

<style>
</style>