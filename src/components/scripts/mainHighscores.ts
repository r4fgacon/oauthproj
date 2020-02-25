import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import axios from "axios";
import Highscore from "../../components/models/Highscore";
import UserData from "@/components/models/UserData";


@Component
export default class Highscores extends Vue {
    @Prop() private msg!: string;
    @Prop() private highscores!: Array<Highscore>;
    @Prop() private apiUrl = 'http://localhost:3002';
    @Prop() private userData!: UserData;
    @Prop() private time!: number;
    @Prop() private highScoresLimit = 10;

    @Watch('time')
    onPropertyChanged(){
        console.log("wwwww");
    }

    async created() {
        console.log(process.env);
 /*       console.log("Highscores component created");
        console.log(this.time);
        console.log(this.userData.name);
        console.log(this.userData.pictureUrl);
        console.log(this.userData + "DUPSKo");
*/
        const hs = new Highscore(this.time, this.userData);
        this.highscores=[];
        this.updateHighscores();
        this.sendNewHighscore(hs);
        //console.log(this.time);
        //this.updateHighscores();

    }
    async updateHighscores(){
        try {
            const res = await axios.get(this.apiUrl);
            this.highscores = res.data;
            this.sortHighscores();

        } catch (e) {
            console.log("Error while receiving json data");
        }
    }

    async sendNewHighscore(highscore: Highscore){
        console.log("1");
        if(this.isEligibleForHighscore(highscore)) {
            console.log("2");
            if (this.isHighscoresFull()) {
                console.log("3");
                await this.removeHighscoreById(this.getWorstHighScoreId());
            }
            await this.addHighscore(highscore);
        }

    }
    isEligibleForHighscore(newHighscore: Highscore) {
        let hit = false;
        console.log(this.highscores.length);
        if(this.highscores.length===0){return true}

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
        console.log("4");
        await axios.post(this.apiUrl+"/highscores", JSON.stringify(highscore));
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
