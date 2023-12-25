// Create_Post.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [CommonModule, ReactiveFormsModule, SidebarModule],
  exports: [CreatePostComponent],
})
export class Create_PostModule {}
