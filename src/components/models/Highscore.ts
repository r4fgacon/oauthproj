import UserData from "@/components/models/UserData";

export default class Highscore {

    private _id: number;
    private _userData!: UserData;
    private _score: number;

    get score(): number {
        return this._score;
    }

    get userData(): UserData {
        return this._userData;
    }

    set userData(value: UserData) {
        this._userData = value;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    constructor(score?: number, userData?: UserData, id?: number){
        this._id = id || 0;
        this._userData = userData || new UserData();
        this._score = score || 0;
    }
}