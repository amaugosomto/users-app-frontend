import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, config } from 'src/app/config';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<{ msg: string, payload: IUser[]}> {
    let headers= new HttpHeaders()
    headers = headers.append('authorization', this.authService.getToken)

    return this.http.get<{ msg: string, payload: IUser[]}>(`${config.rootUrl}/users`, {
      headers
    })
  }
}
