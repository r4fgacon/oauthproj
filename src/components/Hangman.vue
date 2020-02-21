<template>
    <div>
        <h1>
            Welcome to hangman!
        </h1>
        <p>
            {{ hint }}
        </p>
        <p>
            {{ capitalProgressFields }}
        </p>


        <!--<img src= {{ imageSrc }} >

        "../assets/hangmanPNGs/6hp.png"-->
        <p>
            {{ usedLetters }}
        </p>
        <button @click="newGame()">
            New Game
        </button>
    </div>

</template>

<script lang = "ts">
    import axios from "axios";
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Hangman extends Vue {

        @Prop() private usedLetters!: Array<string>;
        @Prop() private capitalProgressFields!: Array<string>;
        @Prop() private capital!: Capital;
        @Prop() private health!: number;
        @Prop() private time!: string;
        @Prop() private hint!: string;
        @Prop() private countriesData!: Array<Capital>;


        newGame() {
            this.hint = "Click letters to start guessing";
            this.health = 6;
            this.usedLetters = [];
            this.capitalProgressFields = [];
            console.log("New game");

            const randomId: number = this.randomiseCapitalId();
            this.getRandomCapital(randomId);

            this.fillAnswersWithBlanks();

            this.addKeypressListener();


            console.log(this.capital.Capital);


        }

        async created() {
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
            let index;
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
                    hit ? this.addLetter(letter) : console.log("-1hp");
                    this.usedLetters.push(letter);
                }
            }
        }

    }







</script>