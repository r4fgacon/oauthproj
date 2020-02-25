export default class Answer{
    private _id: number;
    private _country: string;
    private _capital: string;

    constructor(id: number, country: string, capital: string){
        this._id = id;
        this._country = country;
        this._capital = capital;
    }

    get capital(): string {
        return this._capital;
    }
    get country(): string {
        return this._country;
    }
    get id(): number {
        return this._id;
    }
}