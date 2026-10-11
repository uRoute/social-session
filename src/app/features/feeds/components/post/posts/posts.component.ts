import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../core/services/Posts/posts.service';
import { IPost } from '../../../../../core/models/Post/ipost.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [ReactiveFormsModule , DatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private _PostsService = inject(PostsService);
  imgURL = signal<string | ArrayBuffer | null | undefined>('');
  imgFile!: File;
  posts: WritableSignal<IPost[]> = signal([]);
  postBody: FormControl = new FormControl();
  postPrivacy: FormControl = new FormControl('public');

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this._PostsService.GetAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.posts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // FileReader
  holdImage(e: Event) {
    let imageFile = e.target as HTMLInputElement;
    if (imageFile.files && imageFile.files.length > 0) {
      this.imgFile = imageFile.files[0];
      this.readFile();
    }
  }
  readFile() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.imgFile);
    fileReader.onload = (e) => {
      this.imgURL.set(e.target?.result);
    };
  }

  createPost(e: SubmitEvent , form:HTMLFormElement) {
    e.preventDefault();
    let formData = new FormData();
    if (this.imgFile) {
      formData.append('image', this.imgFile);
    }
    if (this.postBody) {
      formData.append('body', this.postBody.value);
    }
    if (this.postPrivacy) {
      formData.append('privacy', this.postPrivacy.value);
    }
    this._PostsService.CreatePost(formData).subscribe({
      next: (res) => {
        console.log(res);
        form.reset()
        this.imgURL.set(null)
        this.getAllPosts()
      },
      error: (err) => {
        // Logic
        console.log(err);
      },
    });
  }
}
