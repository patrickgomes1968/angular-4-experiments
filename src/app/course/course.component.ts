import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'course',
  template: `<h4>
              {{courseTitle}}
            </h4>
            `
})
export class CourseComponent implements OnInit {
  @Input("course-title") courseTitle: string;
  @Input ("is-favorite") IsFavorite: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
