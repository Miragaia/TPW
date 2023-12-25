// edit-my-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { EditprofileModule } from './editprofile.module';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  username: string | null = null;
  userInfo: any = null;
  userProfile: any = null;
  BackGroundImage: string = 'https://vascomfaria.pythonanywhere.com/media/bg_image/back_default.jpg';
  ProfileImage: string = 'https://vascomfaria.pythonanywhere.com/media/profiles/default_user.jpg';

  // Declare a FormGroup for user info and user profile
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, // Inject FormBuilder
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.userForm = this.formBuilder.group({
      username: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      image: [null],
      bg_image: [null],
      biography: ['']
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        this.username = userInfo.username;
        this.userInfo = userInfo;
      }
    }

    if (this.username) {
      this.authService.myprofile(this.username).subscribe(
        (userProfile) => {
          console.log('User Profile retrieval successful', userProfile);
          this.userProfile = userProfile;
          this.userForm.patchValue(this.userProfile);
        },
        (error) => {
          console.error('User Profile retrieval failed', error);
        }
      );
    }
    this.userForm.patchValue(this.userInfo);
  }

  updateMyProfile() {
    if (this.username) {
      // Create a new FormData object
      const formData = new FormData();

      console.log('image', this.userProfile.image);
      console.log('bg_image', this.userProfile.bg_image);

  
      // Append the necessary fields to the FormData
      formData.append('username', this.userForm.value.username);
      formData.append('first_name', this.userForm.value.first_name);
      formData.append('last_name', this.userForm.value.last_name);
      formData.append('email', this.userForm.value.email);
      formData.append('biography', this.userForm.value.biography);
  

      const ImageFile = this.userForm.value.image !== this.userProfile.image;
      if (ImageFile) {
        console.log('image data', this.userForm.value.image);
        formData.append('image', this.userForm.value.image);
      }
      
      const bgImageFile = this.userForm.value.bg_image !== this.userProfile.bg_image;
      if (bgImageFile) {
        console.log('bg_image data', this.userForm.value.bg_image);
        formData.append('bg_image', this.userForm.value.bg_image);
      }

      console.log('formdata', formData);

      console.log('image', this.userProfile.image);
      console.log('bg_image', this.userProfile.bg_image);


      // Update user info
      this.authService.updateUserInfo(this.username, formData).subscribe(
        (updatedUserInfo) => {
          console.log('User Info updated successfully', updatedUserInfo);
          localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        },
        (error) => {
          console.error('User Info update failed', error);
          // Display error details in your UI, for example:
          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Error:', error.error);
          }
        }
      );

      // Update user profile
      if (this.userProfile) {
        this.authService.updateUserProfile(this.userInfo.id, formData).subscribe(
          (updatedProfile) => {
            console.log('User Profile updated successfully', updatedProfile);
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
          },
          (error) => {
            console.error('User Profile update failed', error);
          }
        );
      }
      this.router.navigate(['/']);
    }
  }

  onFileSelected(field: string, event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;
    if (element.files && element.files.length) {
      file = element.files[0];
    }
    this.userForm.get(field)?.setValue(file);


    // Manually trigger change detection
    this.cdr.detectChanges();
  }
}