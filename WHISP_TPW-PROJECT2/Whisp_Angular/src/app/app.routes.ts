import {Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HomepageModule } from './pages/homepage/homepage.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'create_post', component: CreatePostComponent },
    { path: '', component: HomepageComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'my_profile', component: MyProfileComponent},
    { path: 'edit_profile', component: EditprofileComponent},
    { path: 'forgot_password', component: ForgotPasswordComponent },
];