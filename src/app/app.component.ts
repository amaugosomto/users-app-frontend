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
    const user: IUser = JSON.parse(localStorage.getItem('user') || '')
    this.authService.setCurrentUser(user)
  }

}
