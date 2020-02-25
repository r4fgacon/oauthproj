import UserDataDTO from "@/components/models/UserDataDTO";

export default class HighscoreDTO {

    private userData: UserDataDTO;
    private readonly score: number;

    get Score(): number {
        return this.score;
    }

    constructor(score: number, userData: UserDataDTO){
        this.userData = userData;
        this.score = score;
    }
}