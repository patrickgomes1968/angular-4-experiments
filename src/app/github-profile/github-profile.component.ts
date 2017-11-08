import { PostsService } from './../services/posts.service';
import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {
post: any;
id: number;
index: number;
followers: any[];
follower: any;
  constructor(private activeRoute: ActivatedRoute, 
    private service: GithubFollowersService) { }

  ngOnInit() {
    this.service.getAll()
    .subscribe(followers => this.followers = followers);
    //create an observable to catch route param changes
    this.activeRoute.paramMap
      .subscribe(params => {
        this.id = +params.get("id");
        console.log(params["id"]);
        this.follower = this.followers[1];
        console.log(this.follower)
      })
  }

  Next() {
    let index = this.followers.indexOf(this.follower);
    if (index = -1) index = 0;
    if(index >= 0 && index < this.followers.length - 1)
       var nextUserId = this.followers[index + 1].id;
       else nextUserId = this.followers[0].id;
    console.log(nextUserId);
    return nextUserId;
  }
}
