// new_post.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [NewPostComponent],
  imports: [CommonModule, ReactiveFormsModule, SidebarModule],
  exports: [NewPostComponent],
})
export class New_PostModule {}
