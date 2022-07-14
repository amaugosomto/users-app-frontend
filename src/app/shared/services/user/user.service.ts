import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, config } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<{ msg: string, payload: IUser[]}> {
    return this.http.get<{ msg: string, payload: IUser[]}>(`${config.rootUrl}/users`)
  }
}
