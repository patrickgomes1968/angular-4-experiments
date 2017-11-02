import { PostsService } from './../services/posts.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: any[];
  private url ='https://jsonplaceholder.typicode.com/posts';
  
  constructor(private postsService: PostsService) {
    
  }

  ngOnInit() {
    this.postsService.getPosts()
    .subscribe(response => {
      console.log(response.json())
      this.posts = response.json();
    });
  }
  

  addPost(inp: HTMLInputElement) {
    let post = {title: inp.value};
    inp.value='';
    this.postsService.createPost(post)
      .subscribe(response => {
        post['id'] = response.json().id; 
        this.posts.splice(0,0,post);
        console.log(response.json())
      });
  }

  updatePost(post) {
    this.postsService.updatePost(post.id,
      JSON.stringify({title: "Changed Post"})  // send only changes as object
    )
      .subscribe(response => {
        post['id'] = response.json().id;
        console.log(response.json());
      })
  }

  deletePost(post) {
    this.postsService.deletePost(post.id)
      .subscribe(response => {
        this.posts.splice(this.posts.indexOf(post),1);
      })
  }
}
