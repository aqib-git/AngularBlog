import { Injectable } from '@angular/core';
import { SignupModel } from '../models/signup-model'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import { MediaBindingModel } from '../models/media-model';

@Injectable()
export class MediaService {

  constructor(private http: HttpClient) {
  }

  upload (model: FormData): Observable<MediaBindingModel> {
    return this.http.post<MediaBindingModel>(environment.apiUrl + 'media', model)
  }
}
