import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PracticeComponent } from './MyComponent/practice/practice.component';
import { LoginComponent } from './MyComponent/login/login.component';
import { ProfileComponent } from './MyComponent/profile/profile.component';
import { HomeComponent } from './MyComponent/home/home.component';
import { ContestComponent } from './MyComponent/contest/contest.component';
import { BlogComponent } from './MyComponent/blog/blog.component';
import { ManageComponent } from './Mycomponent/manage/manage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    PracticeComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    ContestComponent,
    BlogComponent,
    ManageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [CookieService],
})
export class AppModule { }
