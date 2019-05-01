<template>
	<q-modal class="row" v-model=showModal :content-css="modalCSS" 
    no-esc-dismiss no-backdrop-dismiss>
		<q-modal-layout>

			<!--Toolbar -->
            <q-toolbar slot="header">
				<q-btn class="absolute-left" flat round dense size="lg" 
                    icon="close" @click="$emit('closed')"/>
				<q-btn class="absolute-right" size="lg" flat round dense
                    icon="check" @click="updateStory"/>
				<q-toolbar-title class="text-center">
                    Edit Story
                </q-toolbar-title>
			</q-toolbar>
			<!--Toolbar -->

  <div class="q-pa-md row justify-center">
      <q-btn class="full-width" label="Delete this Story" icon="delete" color="brown" 
      @click="deleteStoryConfirm = true" size="md" />
      <div v-if="deleteStoryConfirm" class="column row justify-around ">
          <div class="column row q-pa-sm">
              Are you sure ? This valuable memory will be lost forever.
        </div>
        <div class="row justify-around ">
            <q-btn class="col-4" dense label="Yes !" outline icon="delete" color="red" 
            @click="deleteStory" size="sm" /> 
            <q-btn class="col-4" label="No" icon="cancel" outline  color="blue" 
            @click="deleteStoryConfirm = false" size="sm" />                        
        </div>      
      </div>     
      <q-input float-label="Write a short title(Optional)" maxlength="75"
      v-model="story.title"  
      type="text" hide-underline class="q-pb-sm q-ma-sm full-width"/> 

      <q-input class="q-pb-sm q-ma-sm full-width " float-label="Write your story, Be descriptive"
       hide-underline v-model=story.content type="textarea"  rows="4"/> 

      <q-datetime class="q-pb-sm q-ma-sm full-width"  
      placeholder="Today"  hide-underline format="Do MMM, YYYY" v-model="story.date"  />        
       
      <q-checkbox  class="q-pb-sm q-ma-sm full-width"
      v-model="story.private"  label="Keep this Private for now " /> 
  </div>            

		</q-modal-layout>
	</q-modal>
</template>


<script>
export default{
    props:{
        show:{       
            type:Boolean
        },
        storyData:{
            type:Object
        }
    },
    data(){
        return{
            deleteStoryConfirm:false,
            error:false,
            errorMessage:'There was an error updating your story. Try again or contact support',
            modalCSS:{
                position:'fixed',
                top:this.$q.platform.is.desktop ? '5vh' :  '20vh',
                minWidth: (this.$q.platform.is.desktop)? '20vw' : '100vw',
                minHeight:(this.$q.platform.is.desktop)? '20vh' : '80vh',
                maxWidth: (this.$q.platform.is.desktop)? '40vw' : '100vw',
                maxHeight:(this.$q.platform.is.desktop)? '80vh' : '100vh'               
            }  
        }
    },
    methods:{    
        async notify(message,type){
            this.$q.notify({
                message: message,
                position: 'bottom',
                timeout: 800, 
                type: type,
            });
        },
        async updateStory(){
            
            if(this.story.content.length < 1) this.$q.notify({position:'top',message:"Story cannot be empty"});
            else{
                var editedStory = this.$_.pick(this.story,['content','private','title','date']);
                var storyId = this.story._id;
                var res = await this.$axios.put('editStory',{editedStory,storyId});
                if(res.status != 200) this.error = true;
                else{
                    this.$emit('updated',JSON.parse(JSON.stringify(this.story)));
                    this.$emit('closed');
                    this.notify('Your Story has been edited','positive');
                }   
            }
        },
        async deleteStory(){
            var storyId = this.story._id;
            var res = await this.$axios.put('deleteStory',{storyId});
            this.deleteStoryConfirm = false,
            this.$emit('updated');
            this.$emit('closed');            
            this.notify('We have deleted your story','positive');
        } 
    },
    computed:{
        showModal(){
            return this.show;
        },
        story(){
            return this.storyData;
        }
    }
}
</script>