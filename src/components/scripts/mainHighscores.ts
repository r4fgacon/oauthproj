import {Component, Vue, Prop} from 'vue-property-decorator';
import axios from "axios";
import Highscore from "../../components/models/Highscore";
import UserDataDTO from "@/components/models/UserDataDTO";
import HighscoreDTO from "@/components/models/HighscoreDTO";


@Component
export default class Highscores extends Vue {
    private msg!: string;
    @Prop({default: []})
    private highscores!: Array<Highscore>;
    @Prop({default: process.env.VUE_APP_HIGHSCORES_PATH})
    private apiUrl!: string;
    @Prop({default: new UserDataDTO('', '')})
    private userDataDTO!: UserDataDTO;
    @Prop({default: 0})
    private time!: number;
    @Prop({default: 10})
    private highScoresLimit!: number;

    async created() {
        const hs = new HighscoreDTO(this.time, this.userDataDTO);
        this.highscores=[];
        if(this.userDataDTO.Name.length > 0) {
            await this.sendNewHighscore(hs);
        }
        await this.updateHighscores();
    }

    async updateHighscores(){
        try {
            const res = await axios.get(this.apiUrl+"/highscores");
            this.highscores = res.data;
            this.sortHighscores();
        } catch (e) {
            //console.log("Error while receiving json data");
        }
    }

    async sendNewHighscore(highscore: HighscoreDTO) {
        if (highscore.Score > 0) {
        if (this.isEligibleForHighscore(highscore)) {
            if (this.isHighscoresFull()) {
                await this.removeHighscoreById(this.getWorstHighScoreId());
            }
            await this.addHighscore(highscore);
        }
    }

    }
    isEligibleForHighscore(newHighscore: HighscoreDTO) {
        let hit = false;
        if(this.highscores.length<11){ return true }

        this.highscores.forEach((highscore: Highscore)=>{
            if(newHighscore.Score < highscore.score){ hit = true }
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
     async addHighscore(highscore: HighscoreDTO){
        await axios.post(this.apiUrl+"/highscores", highscore);
    }
    async removeHighscoreById(id: number | undefined){
        if (!typeof(id)===undefined) {
            await axios.delete(this.apiUrl + "/highscores/" + (id));
        }

    }
    sortHighscores(){
        this.highscores.sort(function (a, b) {
            return a.score - b.score;
        });
    }
    isHighscoresFull(){
        return this.highscores.length >= this.highScoresLimit;
    }

}
