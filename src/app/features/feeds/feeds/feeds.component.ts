import { Component } from '@angular/core';
import { LeftSideComponent } from '../components/left-side/left-side/left-side.component';
import { RightSideComponent } from '../components/right-side/right-side/right-side.component';
import { PostsComponent } from '../components/post/posts/posts.component';

@Component({
  selector: 'app-feeds',
  imports: [LeftSideComponent , RightSideComponent , PostsComponent],
  templateUrl: './feeds.component.html',
  styleUrl: './feeds.component.css',
})
export class FeedsComponent {}
