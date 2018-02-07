export class Post {
    public userId: string
    public id: number
    public title: string
    public body: string

    constructor() {}

    public excerpt (): string {
        return this.body.split(' ').slice(0, 10).join(' ');
    }
}
