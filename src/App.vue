<template>
  <div id="app">
      <Auth v-on:passUser="userData = $event"></Auth>
    <Hangman
            header="Welcome to hangman!"
            v-on:passTimer="time = $event"
            v-on:showHighscores="initHighscoresComponent"
            v-on:hideHighscores="removeHighscoresComponent"
    ></Hangman>




  </div>

</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import Auth from './components/Auth.vue';
import Hangman from "@/components/Hangman.vue";
import Highscores from "@/components/Highscores.vue";

@Component({
  components: {
    Auth,
    Hangman,
    Highscores

  }
})


export default class App extends Vue {
    // :time=time :userData=userData
  @Prop() private userData!: UserData;
  @Prop() private time!: number;
  @Prop() private highscores!: Vue;

  @Watch('time')
  onPropertyChanged(){

    console.log("property changed");

  }
  initHighscoresComponent(){

      const hsCtor = Vue.extend(Highscores);
      this.highscores = new hsCtor({
          propsData: {
              timer: this.time,
              userData: this.userData
          }
      }).$mount('#mount');
      //this.$forceUpdate();
      //this.$nextTick();


  }
  removeHighscoresComponent(){
      this.highscores.$off();
  }

}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
