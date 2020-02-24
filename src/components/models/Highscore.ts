class Highscore {
    private _id: number;
    private _userData: UserData;
    private _score: number;
    constructor(id: number, score: number, userData: UserData){
        this._id = id;
        this._userData = userData;
        this._score = score;
    }
    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
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
}