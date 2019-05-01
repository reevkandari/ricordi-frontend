<template>
  <div class="row">
    <div class="row q-pa-sm q-mb-md shadow-3" v-for="(item,index) in stories" :key=index>
      <!-- Name  avatar and Date-->
      <div class="full-width row relative-position">
        <img class="col-auto justify-center avatar" :src="item.user.avatar | avatarImage" />
        <div class="col row q-pl-md ">
          <div class="row fill-width">
            <router-link class="col-auto capitalize postUser router-link" :to="item.user.slug" label="item.user.name">
              {{item.user.name}}
            </router-link>
          </div>
          <q-btn v-if="item.user._id == myId" 
          class="absolute-right" round block size="md" dense 
          flat icon="edit" @click="editStory(item)" />
  
          <div class="row full-width class postDate">{{item.date | dateClean}}</div>
        </div>
      </div>
      <!-- Name  avatar and Date-->
      <!-- PostContent-->
      <div v-if="item.title != 'null'" class="row postTitle q-pt-xs">
        {{item.title}}
      </div>
      <div class="full-width row q-pt-xs postContent">
        <p  v-html="$options.filters.text2html(item.content)" />
      </div>
      <!-- PostContent-->
    </div>
    <!--loading spinner and load more icon -->
    <div v-if="loadMore" class="full-width row justify-center">
      <q-btn round dense flat color="red-10" icon="keyboard_arrow_down" 
      size="xl" label="Load More"  @click="loadPost" />
    </div> 

    <div v-else class="column row q-pr-md q-pl-md">
      <p class="text-center shadow-3 q-pa-md">{{noMorePostMessage}}</p>
    </div> 

    <q-inner-loading :visible=loading>
      <q-spinner-dots size=49 color="primary"></q-spinner-dots>
    </q-inner-loading>
  <!--loading spinnger and load more icon -->

    <!--Template khatam-->
    <editStoryModal :show=editStoryModal :storyData=editStoryData @closed="editStoryModal=false" 
    @updated=storyUpdated />
  </div>
</template>

<script>
  import editStoryModal from './editStoryModal'
  
  export default {
    components: {
      editStoryModal
    },
    props: {
      userId: {
        type: String
      }
    },
    data() {
      return {
        user: null,
        home: true,
        lastId: false,
        editStoryData: {},
        editStoryModal: false,
        loading: false,
        loadMore: false,
        stories: [],
        myId: this.$store.state.user.profile._id
      };
    },
    methods: {
      editStory(item) {
        this.editStoryModal = true;
        var storyData = this.$_.pick(item, ['content', '_id', 'title', 'date', 'private']);
        if (typeof storyData.private == "undefined") {
          storyData.private = (this.home) ? false : true;
        }
        if (storyData.title == "null") storyData.title = '';
        this.editStoryData = storyData;
      },
      storyUpdated(inp){
        console.log(inp._id);
        for(var i = 0; i < this.stories.length;i++){
          if(this.stories[i]._id == inp._id){    
            this.stories[i] = this.$_.merge(this.stories[i],inp);
            break;
          }
        }
      },
      async loadPost() {
        var params = {};
        if ((this.home || this.user) && this.loadMore) {
          params.user = (this.home) ? false : this.user;
          params.lastId = this.lastId;
          this.loading = true          
          var res = await this.$axios.get('stories', {params} );
          this.loading = false;
          this.loadMore = (res.data.length >= 5) ? true : false;
          this.stories = _.concat(this.stories, res.data);
          if(this.loadMore){
            this.lastId = this.$_.last(res.data)._id;
          }  
        }
  
      },
      lightItUp() {
        this.stories = [];
        this.loadMore = true;
        this.lastId= false;        
        this.home = (this.$route.path.replace('/', '') == 'home') ? true : false;
        this.user = this.userId;
      },
      refresh(done){
        this.lightItUp();
        this.loadPost();
        done();        
      }
    },
    watch: {
      $route: async function(newVal, oldVal) {
        this.lightItUp();
        this.loadPost();
      },
      userId: async function(newVal, oldVal) {
        this.user = newVal;
        this.lightItUp();
        this.loadPost();
      }
  
    },
    computed: {
      noMorePostMessage() {
        if (this.home) {
          return "That's all for now. Follow some people to keep yourself updated with their stories";
        } else {
          return "That's all we have for now. No more stories to show."
        }
      }
    },
    created: async function() {
      this.lightItUp();
      this.loadPost();
    }
  };
</script>

<style>
  .top {
    font-size: 1.0em;
    font-weight: 400;
  }
  
  .postUser {
    letter-spacing: 0.04em;
    font-size: 1.3em;
    font-weight: 600;
  }
  
  .postTitle {
    font-size: 1.12em;
    font-weight: 450;
  }
  
  .postDate {
    font-family: "sans-serif";
    font-size: 0.95em;
  }
  .layoutSaver{
    font-size:0.5em;
  }
  .postContent {
    font-size: 1.05em;
  }
</style>