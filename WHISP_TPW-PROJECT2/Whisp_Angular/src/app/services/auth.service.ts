// auth.service.ts

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, tap } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any = null;
  private isAuthenticated = false;
  private apiUrl = 'http://vascomfaria.pythonanywhere.com/';

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.checkAuthentication();
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}rest-auth/login/`;

    return this.http.post(url, { username, password }).pipe(
      map((response) => {
        let data_json = JSON.parse(JSON.stringify(response));
        const token = data_json.token;

        // Save the token to localStorage
        localStorage.setItem('key', token);

        // Get user info and save it to localStorage
        this.getUserInfo(username).subscribe(
          (userInfo) => {
            console.log('User Info:', userInfo);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            //Get user profile and save it to localStorage
            this.getUserProfile(userInfo.id).subscribe(
              (userProfile) => {
                console.log('User Profile:', userProfile);
                localStorage.setItem('userProfile', JSON.stringify(userProfile));
              },
              (error) => {
                console.error('Error getting user profile:', error);
              }
            );
          }
        );
        return response;
      })
    );
  }


  register(username: string, email: string, password1: string, password2: string): Observable<any> {
    const url = `${this.apiUrl}rest-auth/registration/`;
    return this.http.post(url, { username, email, password1, password2 });
  }

  logout() {
    localStorage.removeItem('key');
    localStorage.removeItem('userInfo');
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}user_info/${username}/`);
  }

  checkAuthentication() {
    if (this.document.defaultView && this.document.defaultView.localStorage) {
      const key = this.document.defaultView.localStorage.getItem('key');
      this.isAuthenticated = !!key;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}profile/user/${id}/`);
  }

  myprofile(username: string): Observable<any> {
    return this.getUserInfo(username).pipe(
      mergeMap((userInfo) => {
        console.log('User Info:', userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // Get user profile and save it to localStorage
        return this.getUserProfile(userInfo.id).pipe(
          tap((userProfile) => {
            console.log('User Profile:', userProfile);
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
          }),
          catchError((error) => {
            console.error('Error getting user profile:', error);
            throw error; // Rethrow the error
          })
        );
      }),
      catchError((error) => {
        console.error('Error getting user info:', error);
        throw error; // Rethrow the error
      })
    );
  }

  otherprofile(username: string): Observable<any> {
    return this.getUserInfo(username).pipe(
      mergeMap((otheruserInfo) => {
        console.log('Other User Info:', otheruserInfo);
        localStorage.setItem('otheruserInfo', JSON.stringify(otheruserInfo));

        // Get user profile and save it to localStorage
        return this.getUserProfile(otheruserInfo.id).pipe(
          tap((otheruserProfile) => {
            console.log('Other User Profile:', otheruserProfile);
            localStorage.setItem('otheruserProfile', JSON.stringify(otheruserProfile));
          }),
          catchError((error) => {
            console.error('Error getting other user profile:', error);
            throw error; // Rethrow the error
          })
        );
      }),
      catchError((error) => {
        console.error('Error getting other user info:', error);
        throw error; // Rethrow the error
      })
    );
  }

  updateUserInfo(username: string, updatedUserInfo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}user_info/${username}/`, updatedUserInfo);
  }

  updateUserProfile(id: number, updatedUserProfile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}profile/user/${id}/`, updatedUserProfile);
  }

  changePassword(passwordInfo: any): Observable<any> {    
    const options = {
    withCredentials: true,  // Include this option
    };

    return this.http.post(`${this.apiUrl}change-password/`, passwordInfo, options);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}post/${id}/delete/`);
  }

}
