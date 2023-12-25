// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegistrationModule } from './registration.module';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required],
      remember: [false]
    });
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      const { email, username, password1, password2 } = this.registerForm.value;
      
      // Call the AuthService to register the user
      this.authService.register(username, email, password1, password2).subscribe(
        response => {
          // Handle successful registration
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          // Handle registration error
          console.error('Registration failed', error);
        }
      );
    }
  }

  gobacktoFeed() {
    this.router.navigate(['/']);
  }
  
}
