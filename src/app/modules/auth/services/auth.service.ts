import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { IUser, config } from '../../../config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource = new ReplaySubject<IUser | null>(1)
  currentUser$ = this.currentUserSource.asObservable();
  private rootURL = config.rootUrl
  private user: IUser | null = null 

  constructor(private http: HttpClient) { }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.rootURL}/auth/register`, user)
  }

  login(user: IUser): Observable<{msg: string, payload: IUser}> {
    return this.http.post<{msg: string, payload: IUser}>(`${this.rootURL}/auth/login`, user)
  }

  get getToken() {
    return this.user?.token || ''
  }

  setCurrentUser(user: IUser | null) {
    this.currentUserSource.next(user);
    this.user = user
  }
}
