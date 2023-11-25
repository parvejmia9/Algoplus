import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';
import { LoginInfo } from './Models/login.model';
import { BlogInfo } from './Models/blog.model';
import { UserService } from './Service/user.service';
import { BlogService } from './Service/blog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @Input() logout: null | undefined;
  constructor(private userService: UserService,public cookieService : CookieService, private BlogService : BlogService ){
    this.getAllLoginInfo();
    this.getAllBlogInfo();
    if(this.cookieService.get('isAdmin')=='1')this.isAdmin = true;
  }
  
  ngOnInit(): void {
    //this.getAllBlogInfo();
    const obs = interval(3500);
    obs.subscribe((d=>{
      this.caroselNumber = (this.caroselNumber+1)%3;
    }));
  }
  title = 'demo';

  isPageOne:Number = 0;
  pageChange(id:Number){
    if(id==4 && this.cookieService.get("user_name")!='') id=5;
    this.isPageOne=id;
  }

  LogOutUser(num : number){
   
    this.isPageOne = 4;
    if(this.cookieService.get('isAdmin')=='1')this.isAdmin = true;
    else this.isAdmin = false;
  }

  sgIn="Sign In";
  isAdmin=false;
  caroselNumber = 1;
  userLoginInfoArray : LoginInfo[] = [];

  getAllLoginInfo(){
    this.userService.getAllLoginInfo().subscribe(data=>{
      this.userLoginInfoArray = data;
      //console.log(this.userLoginInfoArray);
    });
  }

  userBlogInfoArray : BlogInfo[] = [];
  getAllBlogInfo(){
    this.BlogService.getAllBlogInfo().subscribe(data=>{
      this.userBlogInfoArray = data;
      console.log(this.userBlogInfoArray);
    });
  }

  loginInfo : LoginInfo = {
    user_name: '',
    user_email: '',
    user_password: '',
    user_full_name: '',
    user_institution: '',
    user_cf_handle: '',
    user_atcoder_handle: '',
    user_codechef_handle: '',
    user_contribution: 0,
    isAdmin: 0
  };
  blogInfo : BlogInfo = {
    blog_id : 0,
    user_name : '',
    blog_content : '',
    like_count : 0
  };

  // for login user
  LoginUser(oginInfo:LoginInfo){
    this.loginInfo = oginInfo;
    this.isPageOne = 5;
    console.log("Cookie "+this.cookieService.get('isAdmin'))
    if(this.cookieService.get('isAdmin')=='1')this.isAdmin = true;
    console.log("admin status: " + this.isAdmin);
  }
  Blog(blogs:BlogInfo){
    this.blogInfo = blogs;
    this.isPageOne = 1;
  }
}
