import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { MyprofileModule } from './my-profile.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  username: string | null = null;
  userInfo: any = null;
  userProfile: any = null;
  BackGroundImage: string = 'http://vascomfaria.pythonanywhere.com/media/bg_image/back_default.jpg';
  ProfileImage: string = 'http://vascomfaria.pythonanywhere.com/media/profiles/default_user.jpg';
  userposts: any[] = [];
  showDeleteConfirmation = false;
  currentPostId: number = 0;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        this.username = userInfo.username;
        this.userInfo = userInfo;
      }
      this.getUserPosts(this.username ?? '').subscribe(data => {
        this.userposts = data;
      });
    }

    if (this.username) {
      this.authService.myprofile(this.username).subscribe(
        (userProfile) => {
          console.log('User Profile retrieval successful', userProfile);
          this.userProfile = userProfile;
        },
        (error) => {
          console.error('User Profile retrieval failed', error);
        }
      );
    }
  }


getUserPosts(username: string): Observable<any> {
  return this.http.get(`http://localhost:8000/posts/${username}/`);
}


 profile(username: string) {
  this.authService.otherprofile(username).subscribe(
    (response) => {
      console.log('Profile retrieval successful', response);

     
      const profileInfo = {
        user: response.user,
        image: response.image,
        bg_image: response.bg_image,
        biography: response.biography,
        followers_count: response.followers_count
      };

     
      localStorage.setItem('otheruserProfile', JSON.stringify(profileInfo));

      this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Profile retrieval failed', error);
      }
    );
  }

  deleteThisPost(postId: number) {
    this.authService.deletePost(postId).subscribe(
      (response) => {
        console.log('Post deleted successfully', response);
        
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      },
      (error) => {
        console.error('Failed to delete post', error);
      }
    );
  }


  openDeleteConfirmation(postId: number): void {
    this.showDeleteConfirmation = true;
    this.currentPostId = postId;
  }

  closeDeleteConfirmation(): void {
    this.currentPostId = 0;
    this.showDeleteConfirmation = false;
  }



}
