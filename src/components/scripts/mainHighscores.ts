import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from "axios";


@Component
export default class Highscores extends Vue {
    @Prop() private msg!: string;
    @Prop() private highscores!: Array<Highscore>;
    @Prop() private timer!: number;
    @Prop() private apiUrl = 'http://localhost:3002';
    @Prop() private userData!: UserData;
    @Prop() private highScoresLimit = 10;


    async created() {
        console.log("Highscores component created");
        try {
            const res = await axios.get(this.apiUrl);
            this.highscores = res.data;

        } catch (e) {
            console.log("Error while receiving json data");
        }
    }

    async sendNewHighscore(highscore: Highscore){
        if(this.isEligibleForHighscore(highscore)) {
            if (this.isHighscoresFull()) {
                await this.removeHighscoreById(this.getWorstHighScoreId());
            }
            await this.addHighscore(highscore);
        }

    }
    isEligibleForHighscore(newHighscore: Highscore) {
        let hit = false;
        this.highscores.forEach((highscore: Highscore)=>{
            if(newHighscore.score < highscore.score){ hit = true;}
        });

        return hit;
    }

    getWorstHighScoreId(){
        let worstHighscoreScore = 0;
        let worstHighscore: Highscore = new Highscore();

        this.highscores.forEach(highscore => {
            if (worstHighscoreScore < highscore.score){
                worstHighscoreScore = highscore.score;
                worstHighscore = highscore;
            }
        });
        return worstHighscore.id;
    }
     async addHighscore(highscore: Highscore){
        await axios.post(this.apiUrl + JSON.stringify(highscore));
    }
    async removeHighscoreById(id: number){
        await axios.delete(this.apiUrl + "/highscores/" + (id));

    }
    sortHighscores(){
        this.highscores.sort(function (a, b) {
            return b.score - a.score;
        });
    }
    isHighscoresFull(){
        return this.highscores.length >= this.highScoresLimit;
    }

}
