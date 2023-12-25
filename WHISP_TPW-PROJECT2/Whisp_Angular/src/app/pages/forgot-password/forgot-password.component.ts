import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Replace with the actual path to your authentication service
import { ForgotPasswordModule } from './forgot-password.module';
import { Router } from '@angular/router'; // Replace with the actual path to your router

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.changePasswordForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      const passwordInfo = this.changePasswordForm.value;
      if (passwordInfo.new_password !== passwordInfo.confirm_password) {
        console.error('New password and confirm password do not match');
        return;
      }

      this.authService.changePassword(passwordInfo).subscribe(
        (response) => {
          console.log('Password change successful', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Password change error', error);
          this.router.navigate(['/forgot-password']);
        }
      );
    }
  }
}
