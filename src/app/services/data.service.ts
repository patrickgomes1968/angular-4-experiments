import { NotFoundError } from './../common/not-found-error';
import { BadInputError } from './../common/bad-input-error';
import { AppError } from './../common/app-error';
import { Injectable, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  
  constructor (private url: string, private http: Http) { }
  
  getAll() {
    return this.http.get(this.url)
        .map(response => response.json())
        .catch(this.errorHandler);
  }
  get(id) {
    return this.http.get(this.url+'/'+ id)
        .map(response => response.json())
        .catch(this.errorHandler);
  }

  create(resource) {
    return this.http.post(this.url+'A', JSON.stringify(resource))
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  update(id: number, changes) {
    return this.http.patch(this.url + '/' + id, JSON.stringify(changes))
    .map(response => response.json())
    .catch(this.errorHandler);
  }

  delete(id) {
      return this.http.delete(this.url + '/' + id)
      .catch(this.errorHandler);
  }

  private errorHandler(error: Response) {
    if (error.status === 400) 
      return Observable.throw(new BadInputError(error));
    else if (error.status === 404) 
      return Observable.throw(new NotFoundError(error));
    return Observable.throw(new AppError(error));
  }

}
