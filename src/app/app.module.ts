import { GithubFollowersService } from './services/github-followers.service';
import { DataService } from './services/data.service';
import { ErrorHandler, Component } from '@angular/core';
import { AppErrorhandler } from './common/app-error-handler';
import { PostsService } from './services/posts.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { CoursesService } from './courses/courses.service';
import { FavoriteComponent } from './favorite/favorite.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayFormComponent } from './array-form/array-form.component';
import { PostsComponent } from './posts/posts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    FavoriteComponent,
    ContactFormComponent,
    SignupFormComponent,
    ArrayFormComponent,
    PostsComponent,
    NavbarComponent,
    GithubFollowersComponent,
    GithubProfileComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'followers', component: GithubFollowersComponent },
      { path: 'followers/:id', component: GithubProfileComponent },
      { path: 'posts', component: PostsComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [
    PostsService,
    DataService,
    CoursesService,
    GithubFollowersService,
    { provide: ErrorHandler, useClass: AppErrorhandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
