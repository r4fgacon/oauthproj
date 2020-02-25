import axios from "axios";
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Stopwatch} from "ts-stopwatch";


@Component
export default class Hangman extends Vue {

    @Prop() private header!: string;
    @Prop() private usedLetters!: Array<string>;
    @Prop() private capitalProgressFields!: Array<string>;
    @Prop() private answer!: Answer;
    @Prop() private health!: number;
    @Prop() private time!: Stopwatch;
    @Prop() private hint!: string;
    @Prop() private answers!: Array<Answer>;


    @Prop() private apiUrl = 'http://localhost:3001';




    async created() {
        console.log(process.env.ANSWERS_PATH);
        try {
            const res = await axios.get(this.apiUrl+'/answers');
            this.answers = res.data;

        } catch (e) {
            console.log("Error while receiving json data");
        }
    }

    clearProperties(){
        this.header = "Whats the capital";
        this.hint = "Click letters to start guessing";
        this.health = 6;
        this.usedLetters = [];
        this.capitalProgressFields = [];
        this.time = new Stopwatch();
        this.time.start(true);
        this.$emit("hideHighscores");
    }
    newGame() {

        this.clearProperties();

        console.log("New game");


        this.initRandomCapital(this.randomiseCapitalId());

        this.fillAnswersWithBlanks();

        this.addKeypressListener();


        console.log(this.answer.capital);


    }

    private randomiseCapitalId() {
        const amountOfElements = this.answers.length;
        return Math.floor(Math.random() * (amountOfElements + 1));
    }

    private initRandomCapital(answerId: number) {
        /*for (let i = 0; i < this.answers.length; i++) {
            const element: Answer = this.answers[i];
            if (element.id == capitalId) {
                this.answer = element;
            }
        }*/

        this.answers.forEach((answer: Answer) => {
            if (answer.id === answerId) {
                this.answer = answer;
            }
        });
    }

    private fillAnswersWithBlanks() {
        const capitalName = this.answer.capital.toLowerCase().replace(/[a-z]/g, '_');
        for (let i = 0; i < capitalName.length; i++){
            this.capitalProgressFields.push(capitalName.charAt(i));
        }

    }

    private addCorrectLetter(letter: string){
        for(let i = 0; i < this.answer.capital.length; i++){
            if (this.answer.capital[i].toLowerCase()==letter){
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
        if(this.isWon()){
            this.handleVictory()
        }
        this.handleHealth();

    }

    private handleLetter(letter: string) {
        if (letter.match(/[a-z]/i)) {
            if (!this.usedLetters.includes(letter)) {
                this.isLetterMatch(letter) ? this.addCorrectLetter(letter): this.health -= 1;
                this.usedLetters.push(letter);
            }
        }
    }

    private isLetterMatch(letter: string){
        for (let i = 0; i < this.answer.capital.length; i++) {
            if (this.answer.capital[i].toLowerCase() === letter) {
                return true;
            }
        }
        return false;
    }

    private handleHealth(){
        if (this.health < 3){
            this.hint="Hint: Answer of " + this.answer.country + ".";
        }
        if (this.health == 0){
            this.header="Game Over";
            this.endGame()
        }

    }

    private isWon(){
        return !this.capitalProgressFields.includes("_");
    }

    private handleVictory(){
        console.log("victory");
        this.header="Victory";

        this.time.stop();
        this.$emit("passTimer", this.time.getTime());

        this.endGame();
    }
    private endGame(){
        this.$emit("showHighscores");
        window.removeEventListener("keypress", this.handleKeyPress, true );
        this.usedLetters=[];
        this.capitalProgressFields=[];
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
        const src = require.context("../../assets/hangmanPNGs/", false, /\.png$/);
        return (src(`./${this.health}hp.png`));
    }

}








