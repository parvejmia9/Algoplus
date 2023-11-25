import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContestInfo } from '../Models/contest.model';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  baseUrl = 'http://127.0.0.1:8000/contest/';
  
  constructor(private http: HttpClient) { }

  getAllContestInfo() : Observable<ContestInfo[]>{
    return this.http.get<ContestInfo[]>(this.baseUrl);
  }

  createContest(contestInfo: ContestInfo) : Observable<ContestInfo>{
    return this.http.post<ContestInfo>(this.baseUrl, contestInfo);
  }
  updateContest(contestInfo: ContestInfo) : Observable<ContestInfo>{
    return this.http.put<ContestInfo>(this.baseUrl, contestInfo);
  }
}
