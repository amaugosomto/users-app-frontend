import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/config';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = []
  constructor(private userService: UserService) { }

  ngOnInit(): void {
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
