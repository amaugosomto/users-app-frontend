import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { IUser } from 'src/app/config';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  submit() {
    const loginForm = this.loginForm.value
    const user: IUser = {
      email: loginForm.email,
      password: loginForm.password
    }

    this.authService.login(user).subscribe({
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
        alert('Successfully logged in')
        const payload = res.payload;
        console.log(typeof JSON.stringify(payload))
        localStorage.setItem('user', JSON.stringify(payload))
        this.loginForm.reset()
        this.authService.setCurrentUser(payload)
        this.router.navigate(['users'])
      }
    })
  }
}
