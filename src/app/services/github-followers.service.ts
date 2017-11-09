import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubFollowersService extends DataService {
  constructor(http: Http) {
    super(http);
    this.url = 'http://jsonplaceholder.typicode.com/posts';
  }
}
