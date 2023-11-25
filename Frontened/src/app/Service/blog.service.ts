import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogInfo } from '../Models/blog.model';
import { ContestInfo } from '../Models/contest.model';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://127.0.0.1:8000/blog/';
  
  constructor(private http: HttpClient) { }

  getAllBlogInfo() : Observable<BlogInfo[]>{
    return this.http.get<BlogInfo[]>(this.baseUrl);
  }

  createNewBlog(BlogInfo: BlogInfo) : Observable<BlogInfo>{
    return this.http.post<BlogInfo>(this.baseUrl, BlogInfo);
  }

  updateBlog(BlogInfo: BlogInfo) : Observable<BlogInfo>{
    return this.http.put<BlogInfo>(this.baseUrl, BlogInfo);
  }

  deleteBlog(BlogInfo: BlogInfo,id="") : Observable<BlogInfo>{
    return this.http.delete<BlogInfo>(this.baseUrl+id);
  }
}

