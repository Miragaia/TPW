// editprofile.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditprofileComponent } from './editprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditprofileComponent],
  imports: [CommonModule, ReactiveFormsModule, SidebarModule, FormsModule],
  exports: [EditprofileComponent],
})
export class EditprofileModule {}