// sidebar.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
