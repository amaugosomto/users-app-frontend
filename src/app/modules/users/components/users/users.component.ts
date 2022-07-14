import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/config';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = []

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (!!user === false && localStorage.getItem('user') === null) this.router.navigate(['/auth/login'])
    })
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      error: (e) => {
        const errors = e.error.errors
        if (errors) {
          errors.map((error : {msg: string}) => {
            alert(error.msg)
          })
        }

        alert(e.error.msg || 'An error occured')
      },
      next: (res) => {
        this.users = res.payload
      }
    })
  }

  trackByFn(index: number, user: IUser) {
    return user ? user.id : undefined;
  }

}
