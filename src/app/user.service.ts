import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from './user';


@Injectable()
export class UserService {

  private origin: string

  constructor(private httpClient: HttpClient) {
    this.origin = 'https://jsonplaceholder.typicode.com';
  }

  getUsers () : Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.origin}/users`);
  }

  getUser (id: number) : Observable<User> {
    return this.httpClient.get<User>(`${this.origin}/users/${id}`);
  }
}
