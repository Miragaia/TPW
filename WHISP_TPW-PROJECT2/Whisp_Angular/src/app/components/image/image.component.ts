// image.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  imageUrl: string = '';  // Initialize with an empty string

  // Method to set the image URL dynamically
  setImageUrl(newUrl: string): void {
    this.imageUrl = newUrl;
  }
}