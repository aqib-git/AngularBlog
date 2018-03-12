import { Injectable } from '@angular/core';
import { SignupModel } from '../models/signup-model'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import { MediaModel } from '../models/media-model';

@Injectable()
export class MediaService {

  constructor(private http: HttpClient) {
  }

  upload (model: FormData): Observable<MediaModel> {
    return this.http.post<MediaModel>(environment.apiUrl + 'media', model)
  }
}
