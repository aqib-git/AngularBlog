export class Comment {
    public excerpt: string

    constructor(
        public postId: number,
        public id: number,
        public name: string,
        public email: string,
        public body: string
    ) {
    }
}
