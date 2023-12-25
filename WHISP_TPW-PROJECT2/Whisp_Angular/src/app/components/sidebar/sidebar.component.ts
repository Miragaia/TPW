import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Fix the typo in 'styleUrl' to 'styleUrls'
})
export class SidebarComponent {
  // Remove the duplicate declaration of authService
  authService: AuthService;
  userName: string | null = null;
  userId: string | null = null;

  // Inject the AuthService in the constructor
  constructor(authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any) {
    this.authService = authService;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        this.userId = userInfo.id;
      }
    }
  }


  logout() {
    this.authService.logout();
  }

}
