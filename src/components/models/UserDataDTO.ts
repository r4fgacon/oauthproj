export default class UserDataDTO {

    private readonly name: string;
    private pictureUrl: string;

    constructor(name: string, pictureUrl: string){
        this.name = name;
        this.pictureUrl = pictureUrl;
    }

    get Name(): string {
        return this.name;
    }
}