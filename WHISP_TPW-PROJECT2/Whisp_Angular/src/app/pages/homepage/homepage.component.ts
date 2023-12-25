import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  authService: AuthService;

  // Inject the AuthService in the constructor
  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
