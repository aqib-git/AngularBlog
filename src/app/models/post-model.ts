import { User } from "./user-model";
import { MediaBindingModel } from "./media-model";

export class Post {
    public userId: string
    public id: number
    public title: string
    public description: string
    public show: boolean = true;
    public mediaId: string;

    constructor() {}

    public excerpt (): string {
        return this.description.split(' ').slice(0, 10).join(' ');
    }
}

export class PostViewModel {
  public id: number
  public title: string
  public description: string
  public show: boolean = true;
  public media: MediaBindingModel;
  public user: User;

  constructor() {}

  public excerpt (): string {
    if(this.description) {
      return this.description.split(' ').slice(0, 10).join(' ');
    }
    return '';
  }
}
