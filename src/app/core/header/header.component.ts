import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe(user => {
      this.loggedIn = !!user
    })
  }

  logout () {
    localStorage.removeItem('user')
    this.authService.setCurrentUser(null)
    this.router.navigate(['auth/login'])
  }
}
