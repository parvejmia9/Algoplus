import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginInfo } from 'src/app/Models/login.model';
import { UserService } from 'src/app/Service/user.service';
import { BlogInfo } from 'src/app/Models/blog.model';
import { BlogService } from 'src/app/Service/blog.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() BlogSuccess : EventEmitter<BlogInfo>= new EventEmitter();
  @Output() logoutSuccess : EventEmitter<number>= new EventEmitter();

  @Input() loginInfoForProfile: LoginInfo | undefined;
  user_name: any;
  user_email:any;
  user_password:any;
  user_full_name:any;
  user_institution:any;
  user_cf_handle:any;
  user_atcoder_handle:any;
  user_codechef_handle:any;
  user_contribution:any;
  isAdmin: any;
  closeResult: string | undefined;
  ngOnInit(): void {
    //console.log(this.loginInfoForProfile);
  }

  button = 0;
  update = 0;
  checkPass : String = "";
  constructor(private modalService: NgbModal,private cookieService : CookieService, private blogService : BlogService, private userService : UserService){
    this.user_name = this.cookieService.get('user_name');
    this.user_email = this.cookieService.get('user_email');
    this.user_password = this.cookieService.get('user_password');
    this.user_full_name = this.cookieService.get('user_full_name');
    this.user_institution = this.cookieService.get('user_institution');
    this.user_cf_handle = this.cookieService.get('user_cf_handle');
    this.user_atcoder_handle = this.cookieService.get('user_atcoder_handle');
    this.user_codechef_handle = this.cookieService.get('user_codechef_handle');
    this.user_contribution = this.cookieService.get('user_contribution');
    this.isAdmin = this.cookieService.get('isAdmin');

    console.log(this.user_name);
    this.getAllBlogInfo();
    this.getAllLoginInfo();
  }

  BlogInfoArray : BlogInfo[] = [];
  demoBlog :BlogInfo = {
    blog_id : 0,
    user_name : '',
    blog_content : '',
    like_count : 0
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
  userLoginInfoArray : LoginInfo[] = [];
  getAllLoginInfo(){
    this.userService.getAllLoginInfo().subscribe(data=>{
      this.userLoginInfoArray = data;
      console.log(this.userLoginInfoArray);
      this.setDemoUser();
    });
  }
  
  setDemoUser()
  {
    for (var i = 0; i <this.userLoginInfoArray.length ; i++) {
      if (this.userLoginInfoArray[i].user_name == this.user_name){
        this.demoUser=this.userLoginInfoArray[i];
        break;
      }
    }
  }

  createBlog(){
    if(this.demoBlog.blog_content!='')
    {
      alert("Added successfully!");
      this.demoBlog.user_name=this.user_name;
      this.blogService.createNewBlog(this.demoBlog).subscribe(data =>{
    });
      this.getAllBlogInfo();
      this.BlogSuccess.emit(this.demoBlog);
    }
  }

  blogInfoArray : BlogInfo[] = [];
  // this will get all the user 
  getAllBlogInfo(){
    this.blogService.getAllBlogInfo().subscribe(data=>{
      this.blogInfoArray = data;
      //console.log(this.userLoginInfoArray);
    });
  }
 
  button_action()
  {
    this.button=(this.button+1)%2;
  }
  update_action()
  {
    this.update=(this.update+1)%2;
  }
  button_action2()
  {
    const dateNow = new Date();
    this.cookieService.deleteAll();
    this.logoutSuccess.emit(1);
  }


  async open(content: any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateInfo(){
    alert("Updated");
  }

  updateProfile()
  {
    if(this.checkPass!=this.demoUser.user_password)
    {
      alert("Please enter your password Correctly");
      this.getAllLoginInfo();
    }
    else{
      alert("Successfully updated");
      this.userService.updateUser(this.demoUser).subscribe(data =>{
      });

      this.setCookie();

      //this.getAllLoginInfo();
    }
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
        console.log("Chole Aisi")
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
