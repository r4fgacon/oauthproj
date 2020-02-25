import axios from "axios";
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Stopwatch} from "ts-stopwatch";
import Answer from "@/components/models/Answer";


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


    private apiUrl = process.env.VUE_APP_ANSWERS_PATH;




    async created() {
        try {
            await this.updateAnswers();

        } catch (e) {
            console.log("Error while receiving json data");
        }
    }
    async updateAnswers(){
        const res = await axios.get(this.apiUrl+'/answers');
        this.answers = res.data;
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
    async newGame() {
        await this.updateAnswers();
        this.clearProperties();

        console.log("New game");

        this.addKeypressListener();

        this.initRandomCapital(this.randomiseCapitalId());

        this.fillAnswersWithBlanks();

        console.log("developer hax: ", this.answer.capital);


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
        const letter: string = (e.key).toLowerCase();
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
            console.log('gameover');
            this.hint = `Correct answer was ${this.answer.capital}`;
            this.header = "Game Over";
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

        this.endGame();
    }
    private endGame(){
        this.hint = `Correct answer was ${this.answer.capital}`;
        this.header = "Game Over";
        this.$emit("passTimer", this.time.getTime());
        this.$emit("showHighscores");
        window.removeEventListener("keypress", this.handleKeyPress, true );
        this.usedLetters=[];
        this.capitalProgressFields=[];

    }

    imageSrc(){
        if (this.health == undefined){
            this.health = 0;
        }
        const src = require.context("../../assets/hangmanPNGs/", false, /\.png$/);
        return (src(`./${this.health}hp.png`));
    }

}








