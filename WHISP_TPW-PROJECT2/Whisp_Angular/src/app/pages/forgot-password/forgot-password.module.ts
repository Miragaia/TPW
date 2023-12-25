// editprofile.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, ReactiveFormsModule, SidebarModule],
  exports: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}