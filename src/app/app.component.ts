import { Component, OnInit } from '@angular/core';
import { IUser } from './config';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'users-app';
  loggedIn = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {
    let localUser = localStorage.getItem('user') 
    const user: IUser = localUser ? JSON.parse(localUser) : null
    this.authService.setCurrentUser(user)
  }

}
