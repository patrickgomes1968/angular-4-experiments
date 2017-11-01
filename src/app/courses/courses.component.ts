//import { CourseComponent } from './../course/course.component';
import { Component, Output } from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styles: [`
              .my-btn { font-size:1.7em; }
              .odd-class { background: black; color: white; }
              .even-class { background: white; color: black;  }
              `]
})

export class CoursesComponent {
    isActive;
    count: number = 2;
    title: string = "List of Courses"
    courses;
    
    constructor(service: CoursesService) {
        this.courses = service.getCourses();    
        this.isActive = false;
    }
    onFavClicked(timesChanged: number) {
        alert("favorite was clicked " + timesChanged + " times");
    }

    onSave($event) {
        this.isActive = !this.isActive;
        console.log("Save was Clicked. ScreenX: " + $event.screenX + ", ScreenY: " + $event.screenY)
        $event.stopPropagation();
    }

    onDivClicked($event) {
        alert("Div was clicked. ScreenX: "); // +  $event.screenX + ", ScreenY: " + $event.screenY)
    }
}