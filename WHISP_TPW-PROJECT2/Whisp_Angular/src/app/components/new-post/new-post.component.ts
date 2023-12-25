import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { New_PostModule } from './new_post.module';
import { userInfo } from 'os';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  postForm: FormGroup = new FormGroup({});
  userId: string | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
 
  ngOnInit() {

    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo);
    if (userInfo) {
      this.userId = JSON.parse(userInfo).id;
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


    console.log(formData);
    this.http.post('https://vascomfaria.pythonanywhere.com/post/create/', formData).subscribe(
      response => {
        console.log('Post criado com sucesso', response);

        // Recarrega a página atual
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);

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