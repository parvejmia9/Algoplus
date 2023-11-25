import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';
import { UserService } from 'src/app/Service/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  @Output() loginSuccess : EventEmitter<LoginInfo>= new EventEmitter();
  @Input() logout: null | undefined;

  constructor(private userService: UserService,private cookieService: CookieService){
    this.getAllLoginInfo();
  }
  page = 0;
  ngOnInit(){

  }
  createAccount(){
    this.page++;
    this.page%=2;
  }
  
  
  demoUser :LoginInfo = {
    user_name: '',
    user_email: '',
    user_password: '',
    user_full_name: '',
    user_institution: '',
    user_cf_handle: '',
    user_atcoder_handle: '',
    user_codechef_handle: '',
    user_contribution: 0,
    isAdmin: 0,
  }

  login_fn(){
    var flag = 0;
    for (var i = 0; i <this.userLoginInfoArray.length ; i++) {
      if (this.userLoginInfoArray[i].user_name == this.demoUser.user_name && this.userLoginInfoArray[i].user_password== this.demoUser.user_password){
        flag = 1;
        this.demoUser = this.userLoginInfoArray[i];
      }
    }
    if (flag){
      alert("Login successful");
      this.setCookie();
      this.loginSuccess.emit(this.demoUser);
      
    }
    else {
      alert("Login failed");
    }
  }
  register_fn(){
    var flag = 1;
    for (var i = 0; i <this.userLoginInfoArray.length ; i++) {
      if (this.userLoginInfoArray[i].user_name == this.demoUser.user_name){
        flag = 0;
      }
    }
    if (flag){
      this.userService.createNewUser(this.demoUser).subscribe(data =>{
      this.getAllLoginInfo();
      alert("Successfully Registered")
      console.log('hre');
      console.log(this.userLoginInfoArray);
      });
    }
    else {
      alert("User name already exists");
    }
  }
  userLoginInfoArray : LoginInfo[] = [];
  // this will get all the user 
  getAllLoginInfo(){
    this.userService.getAllLoginInfo().subscribe(data=>{
      this.userLoginInfoArray = data;
      //console.log(this.userLoginInfoArray);
    });
  }
  setCookie(){
    var oginInfo = this.demoUser;
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours()+2400);
    //dateNow.setMinutes(dateNow.getMinutes()+24);
    this.cookieService.set('user_name',oginInfo.user_name,dateNow);
    this.cookieService.set('user_password',oginInfo.user_password,dateNow);
    this.cookieService.set('user_email',oginInfo.user_email,dateNow);
    this.cookieService.set('user_full_name',oginInfo.user_full_name,dateNow);
    this.cookieService.set('user_institution',oginInfo.user_institution,dateNow);
    if(oginInfo.user_cf_handle==null){
      this.cookieService.set('user_cf_handle','',dateNow);
    }
    else{
      this.cookieService.set('user_cf_handle',oginInfo.user_cf_handle,dateNow);
    }
    if(oginInfo.user_atcoder_handle==null){
      this.cookieService.set('user_atcoder_handle','',dateNow);
    }
    else{
      this.cookieService.set('user_atcoder_handle',oginInfo.user_atcoder_handle,dateNow);
    }
    if(oginInfo.user_codechef_handle==null){
      this.cookieService.set('user_codechef_handle','',dateNow);
    }
    else{
      this.cookieService.set('user_codechef_handle',oginInfo.user_codechef_handle,dateNow);
    }
    var cont:number =oginInfo.user_contribution;
    if(oginInfo.user_contribution!=null) {
      this.cookieService.set('user_contribution',cont.toString(),dateNow);
    }
    else{
      this.cookieService.set('user_contribution',"0",dateNow)
    }
    if(oginInfo.isAdmin==null)this.cookieService.set('isAdmin','0',dateNow);
    else{
      this.cookieService.set('isAdmin',oginInfo.isAdmin.toString(),dateNow)
    }
  }
}
