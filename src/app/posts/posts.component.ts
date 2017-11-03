import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
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
    .subscribe(
      response => {
        console.log(response.json())
        this.posts = response.json();
      });
      //No error handling here because we allow the error to propagate to the global scope
      //where it will be handled by our custome handler. See providers in app.Module
    }
  

  addPost(inp: HTMLInputElement) {
    let post = {title: inp.value};
    inp.value='';
    this.postsService.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.json().id; 
          this.posts.splice(0,0,post);
          console.log(response.json())
        },
        (error: AppError) => {
          if (error instanceof BadInputError) {
            alert('Input was not valid');
            console.log(error)
          } else if  (error instanceof AppError) {
              alert('That post does not exist');
              console.log(error)
          } else 
              throw error;
        });
  }

  updatePost(post) {
    this.postsService.updatePost(post.id,
      JSON.stringify({title: "Changed Post"})  // send only changes as object
    )
      .subscribe(
        response => {
          post['id'] = response.json().id;
          console.log(response.json());
        },
        (error: AppError) => {
          if (error instanceof BadInputError) {
            alert('Input was not valid');
            console.log(error)
          } else if  (error instanceof AppError) {
              alert('That post does not exist');
              console.log(error)
          } else 
              throw error;
        });
  }

  deletePost(post) {
    this.postsService.deletePost(post.id)
      .subscribe(
        (response) => {
          this.posts.splice(this.posts.indexOf(post),1);
        },
        (error: AppError) => {
          if (error instanceof BadInputError) {
            alert('That data sent is not in the right format');
            console.log(error)
          } else if (error instanceof NotFoundError) {
              alert('That post does not exist');
              console.log(error)
          } else 
              throw error;
        });
  }

  private errorHandler() {
    
  }

}
