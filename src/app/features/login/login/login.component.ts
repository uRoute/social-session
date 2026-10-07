import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  
  constructor(private _AuthService: AuthService) {}
  private _Router = inject(Router)
  resMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
    ]),
  });
  
  // Cookies
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._AuthService.SignIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this._Router.navigate(['/feeds'])
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userInfo',JSON.stringify(res.data.user));
        },
        error: (err) => {
          console.log(err);
          this.resMessage = err.error.message;
        },
      });
    }
  }
}
