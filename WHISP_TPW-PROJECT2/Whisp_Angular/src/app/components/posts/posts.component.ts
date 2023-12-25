import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostsModule } from './posts.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
 selector: 'app-posts',
 templateUrl: './posts.component.html',
 styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  username: string | null = null;
  userInfo: any = null;
  showDeleteConfirmation = false;
  currentPostId: number = 0;


 constructor(private http: HttpClient, private authService: AuthService, private router: Router, 
  @Inject(PLATFORM_ID) private platformId: any) { }

 ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.username = userInfo.username;
      this.userInfo = userInfo;
    }
  }
   this.getPosts().subscribe(data => {
     this.posts = data;
   });
 }

 getPosts(): Observable<any> {
   return this.http.get('http://vascomfaria.pythonanywhere.com/posts/');
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
