class Highscore {
    private _id: number;
    private _googleData: string;
    private _score: number;
    constructor(id: number, score: number, googleData: string){
        this._id = id;
        this._googleData = googleData;
        this._score = score;
    }
    get score(): number {
        return this._score;
    }

    set score(value: number) {
        this._score = value;
    }
    get googleData(): string {
        return this._googleData;
    }

    set googleData(value: string) {
        this._googleData = value;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}