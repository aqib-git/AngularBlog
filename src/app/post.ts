export class Post {
    public userId: string
    public id: number
    public title: string
    public description: string
    public show: boolean = true;

    constructor() {}

    public excerpt (): string {
        return this.description.split(' ').slice(0, 10).join(' ');
    }
}
