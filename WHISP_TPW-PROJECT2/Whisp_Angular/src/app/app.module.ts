// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './pages/login/login.module';
import { FormsModule, NgModel} from '@angular/forms';
import { RegistrationModule } from './pages/registration/registration.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsModule } from './components/posts/posts.module';
import { HomepageModule } from './pages/homepage/homepage.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { Create_PostModule } from './pages/create-post/create_post.module';
import { EditprofileModule } from './pages/editprofile/editprofile.module';
import { ProfileModule } from './pages/profile/profile.module';
import { MyprofileModule } from './pages/my-profile/my-profile.module';
import { ForgotPasswordModule } from './pages/forgot-password/forgot-password.module';
import {DetailPostsModule} from './pages/detail-posts/detail-posts.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, FormsModule, LoginModule, RegistrationModule, PostsModule, HomepageModule, SidebarModule, Create_PostModule, EditprofileModule, ProfileModule, MyprofileModule, ForgotPasswordModule,DetailPostsModule],
  providers: [NgModel], 
  bootstrap: [AppComponent],
})
export class AppModule {}
