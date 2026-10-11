import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _HttpClient = inject(HttpClient)

  GetAllPosts():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/posts` )
  }

  CreatePost(data:FormData):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/posts` , data  )
  }


}

// Interceptors
// POST || PUT -----> URL | Body .... optional {headers}
// GET || DELETE -----> URL .... optional {headers}
// بالمناسبة