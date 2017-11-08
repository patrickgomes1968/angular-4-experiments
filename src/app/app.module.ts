import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { MockBackend } from '@angular/http/testing';
import { fakeBackendProvider } from './helpers/fake-backend';
import { ErrorHandler, Component } from '@angular/core';
import { AppErrorhandler } from './common/app-error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NoAccessComponent } from './no-access/no-access.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
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

import { CoursesService } from './courses/courses.service';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { DataService } from './services/data.service';
import { PostsService } from './services/posts.service';
import { GithubFollowersService } from './services/github-followers.service';

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
    NotFoundComponent,
    AdminComponent,
    LoginComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'followers/:id', component: GithubProfileComponent },
      { path: 'followers', component: GithubFollowersComponent, canActivate: [AuthGuard] },
      { path: 'posts', component: PostsComponent },
      { path: 'admin', 
        component: AdminComponent, 
        canActivate: [AuthGuard, AdminAuthGuard]  },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [
    PostsService,
    DataService,
    CoursesService,
    GithubFollowersService,
    OrderService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    // { provide: ErrorHandler, useClass: AppErrorhandler },
    //For mock back-end.
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
