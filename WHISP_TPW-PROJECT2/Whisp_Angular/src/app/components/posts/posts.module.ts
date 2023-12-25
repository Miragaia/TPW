// posts.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PostsComponent],
})
export class PostsModule {}
