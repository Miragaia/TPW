// profile.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  declarations: [MyProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, SidebarModule],
  exports: [MyProfileComponent],
})
export class MyprofileModule {}