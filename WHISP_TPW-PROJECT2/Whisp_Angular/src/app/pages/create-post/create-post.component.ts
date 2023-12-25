import { HttpClient } from '@angular/common/http';import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Create_PostModule } from './create_post.module';
import { userInfo } from 'os';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup = new FormGroup({});
  userId: string | null = null;

  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any, private router: Router) { }
 
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userInfo = localStorage.getItem('userInfo');
      console.log(userInfo);
      if (userInfo) {
        this.userId = JSON.parse(userInfo).id;
      }
    }

    this.postForm = this.formBuilder.group({
      text: ['', Validators.required],
      image: [null],
      video: [null]
    });
  }
 
  onSubmit() {
    const formData = new FormData();

    console.log(this.userId);
    if (this.userId) {
      formData.append('userId', this.userId);
    }

    formData.append('text', this.postForm.value.text);
    if (this.postForm.value.image) {
      formData.append('image', this.postForm.value.image);
    }
    if (this.postForm.value.video) {
      formData.append('video', this.postForm.value.video);
    }

    this.http.post('https://vascomfaria.pythonanywhere.com/post/create/', formData).subscribe(
      response => {
        console.log('Post criado com sucesso', response);

        this.router.navigate(["/"]);

      },
      error => {
        console.error('Erro ao criar post', error);
      }
    );
  }

  onFileChange(event: Event, field: string) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;
    if (element.files && element.files.length) {
      file = element.files[0];
    }
    this.postForm.get(field)?.setValue(file);
  }


}
