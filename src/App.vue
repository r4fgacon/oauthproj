<template>
  <div id="app">
      <Auth v-on:passUser="setUserData($event)"></Auth>
      <Hangman
            header="Welcome to hangman!"
            v-on:passTimer="time = $event"
            v-on:showHighscores="initHighscoresComponent"
            v-on:hideHighscores="removeHighscoresComponent"
      ></Hangman>

      <Highscores v-if="highscoresVisible" :time="time" :userDataDTO="userDataDTO"></Highscores>



  </div>

</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
import Auth from './components/Auth.vue';
import Hangman from "@/components/Hangman.vue";
import Highscores from "@/components/Highscores.vue";

import UserDataDTO from "./components/models/UserDataDTO";

@Component({
  components: {
    Auth,
    Hangman,
    Highscores

  }
})


export default class App extends Vue {

  @Prop() private userDataDTO!: UserDataDTO;
  @Prop() private time!: number;
  @Prop() private highscoresVisible = false;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUserData($event: any) {
      this.userDataDTO = new UserDataDTO($event.name, $event.pictureUrl);
  }

  initHighscoresComponent(){
      this.highscoresVisible = true;
  }
  removeHighscoresComponent(){
      this.highscoresVisible = false;
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
