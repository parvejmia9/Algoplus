import { Component } from '@angular/core';
import { LoginInfo } from 'src/app/Models/login.model';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  constructor(private userService: UserService){
    this.getAllLoginInfo();
  }

  userLoginInfoArray : LoginInfo[] = [];
  // this will get all the user 
  getAllLoginInfo(){
    this.userService.getAllLoginInfo().subscribe(data=>{
      this.userLoginInfoArray = data;
    });
  }

  deleteUser(LoginInfo: LoginInfo){
    if(LoginInfo.isAdmin ==1){
      alert("You Cannot Ban an Admin");
    }
    else{
      this.userService.deleteUser(LoginInfo,LoginInfo.user_name.toString()).subscribe(data =>{
        this.getAllLoginInfo();
      });
    }
    
  }
}
