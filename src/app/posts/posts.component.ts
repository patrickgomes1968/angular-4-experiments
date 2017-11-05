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
export class PostsComponent implements OnInit {
  posts: any[]; 
  sentFrom: string; 

  constructor(private postsService: PostsService) { }
  ngOnInit() {
    this.postsService.getAll()
    .subscribe(posts => this.posts = posts);
      //No error handling here because we allow the error to propagate to the global scope
      //where it will be handled by our custom handler. See providers in app.Module
      //but in the other methods, we tackle handling of the Expected Errors 
      //before throwing the error (and let it propagate to the global scope)
    }
  
  addPost(inp: HTMLInputElement) {
    let post = {title: inp.value};
    this.posts.splice(0,0,post); //Optimistically adding
    inp.value=''; this.sentFrom = "addPost";
    this.postsService.create(post)
      .subscribe(
        newPost => {
          // post['id'] = newPost.id; 
          // this.posts.splice(0,0,post);
          console.log(newPost)
        },
        this.errorHandler
      );
  }

  updatePost(post) {
    this.postsService.update(post.id,
      JSON.stringify({title: "Changed Post"})  // send only changes as object
    )
      .subscribe(
        postResp => {
          post['id'] = postResp.id;
          console.log(postResp);
        },
        this.errorHandler
      );
  }

  deletePost(post) {
    this.posts.splice(this.posts.indexOf(post),1) // Optimisitic
    this.postsService.delete(post.id)
      .subscribe(
        () => {
          //this.posts.splice(this.posts.indexOf(post),1);
        },
        this.errorHandler
      )
  }

  errorHandler(error: AppError) {
    //Rollback optimistic adding
    console.log(this.posts);
    if (this.sentFrom="addPost") {
      this.posts.splice(0,1); 
      this.sentFrom='';
    }
    if (error instanceof BadInputError) {
      alert('That data sent is not in the right format');
      console.log(error)
    } else if (error instanceof NotFoundError) {
        alert('That post does not exist');
        console.log(error)
    } else throw error;
  }

}
