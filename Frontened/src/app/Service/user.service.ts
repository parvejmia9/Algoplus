import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInfo } from '../Models/login.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://127.0.0.1:8000/user/';
  
  constructor(private http: HttpClient) { }

  getAllLoginInfo() : Observable<LoginInfo[]>{
    return this.http.get<LoginInfo[]>(this.baseUrl);
  }

  createNewUser(loginInfo: LoginInfo) : Observable<LoginInfo>{
    return this.http.post<LoginInfo>(this.baseUrl, loginInfo);
  }

  updateUser(loginInfo: LoginInfo) : Observable<LoginInfo>{
    return this.http.put<LoginInfo>(this.baseUrl, loginInfo);
  }

  deleteUser(loginInfo: LoginInfo,id="") : Observable<LoginInfo>{
    return this.http.delete<LoginInfo>(this.baseUrl+id);
  }
}
