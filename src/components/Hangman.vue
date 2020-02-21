<template>
    <div class="Hangman">
        <h1>
            {{ header }}
        </h1>
        <p>
            {{ hint }}
        </p>
        <div class="ProgressFields">
            <div v-for="field in capitalProgressFields" v-bind:key="field.id" class="ProgressField">
            {{ field }}
            </div>
        </div>

        <img alt="" :src="imageSrc()">


        <p v-if="gameOn" class="UsedLetter">
            Used letters:
        </p>
        <div class="UsedLetters">
            <div v-for="letter in usedLetters" v-bind:key="letter.id" class="UsedLetter">
                {{ letter }}

            </div>
        </div>


        <button @click="newGame()">
            New Game
        </button>
    </div>
</template>

<script lang = "ts">
    import axios from "axios";
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Stopwatch} from "ts-stopwatch";


    @Component
    export default class Hangman extends Vue {

        @Prop() private header!: string;
        @Prop() private usedLetters!: Array<string>;
        @Prop() private capitalProgressFields!: Array<string>;
        @Prop() private capital!: Capital;
        @Prop() private health!: number;
        @Prop() private time!: Stopwatch;
        @Prop() private hint!: string;
        @Prop() private countriesData!: Array<Capital>;
        @Prop() private gameOn = false;




        clearProperties(){
            this.header = "Time is running";
            this.hint = "Click letters to start guessing";
            this.health = 6;
            this.usedLetters = [];
            this.capitalProgressFields = [];
            this.time = new Stopwatch();
            this.time.start(true);
        }
        newGame() {

            this.clearProperties();
            this.gameOn = true;


            console.log("New game");

            this.getRandomCapital(this.randomiseCapitalId());

            this.fillAnswersWithBlanks();

            this.addKeypressListener();


            console.log(this.capital.Capital);


        }

        async created() {
            this.header = "Welcome to hangman!";
            try {
                const res = await axios.get('http://localhost:3000/countriesData');
                this.countriesData = res.data;

            } catch (e) {
                console.log("Error while receiving json data");
            }
        }

        private randomiseCapitalId() {
            const amountOfElements = this.countriesData.length;
            return Math.floor(Math.random() * (amountOfElements + 1));
        }

        private getRandomCapital(capitalId: number) {
            for (let i = 0; i < this.countriesData.length; i++) {
                const element: Capital = this.countriesData[i];
                if (element.Id == capitalId) {
                    this.capital = element;
                }
            }
        }

        private fillAnswersWithBlanks() {
            const capitalName = this.capital.Capital.toLowerCase().replace(/[a-z]/g, '_');
            for (let i = 0; i < capitalName.length; i++){
                this.capitalProgressFields.push(capitalName.charAt(i));
            }
        }

        private addLetter(letter: string){
            for(let i = 0; i< this.capital.Capital.length; i++){
                if (this.capital.Capital[i].toLowerCase()==letter){
                    this.capitalProgressFields[i] = letter;
                }
            }
        }

        private addKeypressListener(){
            window.addEventListener("keypress", this.handleKeyPress, true );
        }

        private handleKeyPress(e: KeyboardEvent){
            const letter: string = String.fromCharCode(e.keyCode).toLowerCase();
            this.handleLetter(letter);
            this.checkWinCondition();
            this.handleHealth();

        }

        private handleLetter(letter: string) {
            let hit = false;
            if (letter.length === 1 && letter.match(/[a-z]/i)) {
                if (!this.usedLetters.includes(letter)) {
                    for (let i = 0; i < this.capital.Capital.length; i++) {
                        if (this.capital.Capital[i].toLowerCase() === letter) {
                            hit = true;
                        }
                    }
                    hit ? this.addLetter(letter) : this.health-=1;
                    this.usedLetters.push(letter);
                }
            }
        }

        private handleHealth(){
            if (this.health < 3){
                this.hint="Hint: Capital of " + this.capital.Country + ".";
            }
            if (this.health == 0){
                console.log("gameover");
                this.header="Game Over";
                this.endGame()
            }

        }

        private checkWinCondition(){
            if (!this.capitalProgressFields.includes("_")){
                console.log("victory");
                this.header="Victory";
                this.endGame();
            }
        }
        private endGame(){
            this.time.stop();
            this.gameOn=false;
            window.removeEventListener("keypress", this.handleKeyPress, true );
            this.usedLetters=[];
            this.capitalProgressFields=[];
            console.log(this.time.getTime());
            this.hideGameWindow();
            this.showHighscore();
            this.attemptHighscore();
        }
        private hideGameWindow(){
            //TODO
        }
        private showHighscore(){
            //TODO
        }
        private attemptHighscore(){
            //TODO
        }
        imageSrc(){
            if (this.health == undefined){
                this.health = 0;
            }
            const src = require.context("../assets/hangmanPNGs/", false, /\.png$/);
            return (src('./' + this.health + 'hp.png'));
        }

    }









</script>

<style lang="css">
    .ProgressFields{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .ProgressField{
        margin-right: 5px;
        font-size: 40px;
    }
    .UsedLetters{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 50px;
    }
    .UsedLetter{
        margin-right: 2px;
        font-size: 20px;
        color: red;
    }

</style>