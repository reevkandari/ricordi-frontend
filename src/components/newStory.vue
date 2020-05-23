<template>
  <div class="q-pa-sm row">
      <q-input float-label="Write a short title(Optional)" maxlength="75"
      v-model="story.title" type="textarea" hide-underline class="q-pb-sm q-ma-sm full-width"/> 

      <q-input class="q-pb-sm q-ma-sm full-width " float-label="Write your JD, Be descriptive"
       hide-underline v-model=story.content type="textarea"  rows="4"/> 

      <q-datetime class="q-pb-sm q-ma-sm full-width"  
      placeholder="Last Date"  hide-underline format="Do MMM, YYYY" v-model="story.date"  />        
<!--       
      <q-checkbox  class="q-pb-sm q-ma-sm full-width"
      v-model="story.private"  label="Keep this Private for now " /> 
-->
       <q-alert class="q-pb-sm q-ma-sm text-center" color="red" v-if="newStoryError" >
         There has been an error, please try again. If the issue persists, contact us
        </q-alert> 

      <q-btn class="q-pb-sm q-ma-sm full-width" size="md" @click="createNewStory" 
      label="Submit Post"  color="red"/>
  </div>
</template>

<style>
</style>

<script>
/**
 * 
 *           <q-input float-label="Write something, Be descriptive"
          v-model="content" type="textarea" rows="3" class="q-mb-xs"/> 
 */
export default {

  data() {
    
    return {
      newStoryError:false,
      isPreDated:false,
      story: {
        content: null,
        title: null,
        date: Date.now(),
        private: false
      }
    };
  },
  methods:{
      async createNewStory(){
          var res = await this.$axios.post('newStory',{newStory:this.story});
          if (res.status==201){
              this.$router.push('/home');
              this.notify('Your post was successfully submitted','positive');
              this.$emit('created');
              this.resetNewStory();
          }
          else this.newStoryError = true;
      },
      async notify(message,type){
          this.$q.notify({
              message: message,
              position: 'center',
              timeout: 800, 
              type: type,
        });
      },
      async resetNewStory(){
        this.newStoryError = false;
        this.story = {
          content : null,
          title: null,
          date : Date.now(),
          private:false,
          anonymous: false          
        }
      }
  }
};
</script>
