import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser, config } from '../../../config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootURL = config.rootUrl

  constructor(private http: HttpClient) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Origin', '*')
    headers.append('content-type','application/x-www-form-urlencoded')
  }

  register(user: IUser): Observable<IUser> {
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers)

    return this.http.post<IUser>(`${this.rootURL}/auth/register`, user, {
      headers: headers,
      
    })
  } 
}
