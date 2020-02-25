export default class UserData {
    private _name: string;
    private _pictureUrl: string;

    get pictureUrl(): string {
        return this._pictureUrl;
    }

    set pictureUrl(value: string) {
        this._pictureUrl = value;
    }
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    constructor(name?: string, pictureUrl?: string){
        this._name = name || '';
        this._pictureUrl = pictureUrl || '';
    }

}