class Capital{
    private _Id: number;
    private _Country: string;
    private _Capital: string;

    constructor(id: number, country: string, capital: string){
        this._Id = id;
        this._Country = country;
        this._Capital = capital;
    }

    get Capital(): string {
        return this._Capital;
    }
    get Country(): string {
        return this._Country;
    }
    get Id(): number {
        return this._Id;
    }
}