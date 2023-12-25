// homepage.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage.component';
import { PostsModule } from '../../components/posts/posts.module';
import { New_PostModule } from '../../components/new-post/new_post.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, ReactiveFormsModule, PostsModule, New_PostModule, SidebarModule],
  exports: [HomepageComponent],
})
export class HomepageModule {}
