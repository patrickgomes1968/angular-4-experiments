import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[];
  private url ='https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
    http.get(this.url)
      .subscribe(response => {
        console.log(response.json())
        this.posts = response.json();
      })
  }

  addPost(inp: HTMLInputElement) {
    let post = {title: inp.value};
    inp.value='';
    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post['id'] = response.json().id; 
        this.posts.splice(0,0,post);
        console.log(response.json())
      });
  }

  updatePost(post) {
    this.http.patch(this.url + '/' + post.id,JSON.stringify({title: "Changed Post"}))
      .subscribe(response => {
        post['id'] = response.json().id;
        console.log(response.json())
      })
  }

  deletePost(post) {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        this.posts.splice(this.posts.indexOf(post),1);
      })
  }
}
