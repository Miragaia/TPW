// login.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, SidebarModule],
  exports: [LoginComponent],
})
export class LoginModule {}
