// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModule } from './login.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  token = ""
  

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  submitForm() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Login successful', response);

        let data_json = JSON.parse(JSON.stringify(response))
        this.token = data_json.token;
        localStorage.setItem('key', this.token);
        
        this.authService.checkAuthentication();

        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  gobacktoFeed() {
    this.router.navigate(['/']);
  }

  gotoForgotPassword() {
    this.router.navigate(['/forgot_password']);
  }
  
}
