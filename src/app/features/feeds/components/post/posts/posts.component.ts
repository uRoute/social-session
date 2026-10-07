import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../core/services/Posts/posts.service';
import { IPost } from '../../../../../core/models/Post/ipost.interface';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit{
  private _PostsService = inject(PostsService)

  posts:WritableSignal<IPost[]> = signal([])

  ngOnInit(): void {
    this.getAllPosts()
  }

  getAllPosts(){
    this._PostsService.GetAllPosts().subscribe({
      next:(res)=>{
        console.log(res);
        this.posts.set(res.data.posts)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
