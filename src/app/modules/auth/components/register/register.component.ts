import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullName: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', [
        Validators.required,
        this.validatePassword
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    }, {
      validator: this.ConfirmPasswordValidator('password', 'confirmPassword')
    })
  }

  get email() {
    return this.registerForm.get('email')
  }

  get fullName() {
    return this.registerForm.get('fullName')
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  validatePassword(control: AbstractControl) {
    const pattern = /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/
    if (!pattern.test(control.value)) {
      return { 'pattern': true };
    }
    return null;
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
