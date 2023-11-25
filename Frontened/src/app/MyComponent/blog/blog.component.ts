import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BlogInfo } from 'src/app/Models/blog.model';
import { BlogService } from 'src/app/Service/blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  @Input() BlogInfoForBlog: BlogInfo | undefined;
  blog_id : any;
  user_name : any;
  blog_content : any;
  like_count : any;
  ngOnInit(): void {
    // console.log(this.BlogInfoForBlog);
  }
  constructor(private BlogService : BlogService,public cookieService : CookieService ){
    this.getAllBlogInfo();
  }

  cl=0;
  icl=0;
  unsorteduserBlogInfoArray : BlogInfo[] = [];
  
  getAllBlogInfo(){
    this.BlogService.getAllBlogInfo().subscribe(data=>{
      this.unsorteduserBlogInfoArray = data;
      this.unsorteduserBlogInfoArray.reverse();
    });
  }
  likefunction(BlogInfo: BlogInfo) {
    if(this.cookieService.get('user_name')==null || this.cookieService.get('user_name')==''){
      return ;
    }
    if(this.cookieService.get('user_name')==BlogInfo.user_name){
      return;
    }
    BlogInfo.like_count++;
    this.icl++;
    this.icl%=2;
    this.BlogService.updateBlog(BlogInfo).subscribe(data =>{
    });
  }
  deleteblog(BlogInfo: BlogInfo){
    this.BlogService.deleteBlog(BlogInfo,BlogInfo.blog_id.toString()).subscribe(data =>{
      this.getAllBlogInfo();
    });
  }
  manageSorting(){
    this.cl++;
    console.log(this.cl);
    console.log("unsorted");
    console.log(this.unsorteduserBlogInfoArray);
    if(this.cl%2==0){
      this.getAllBlogInfo();
    }
    else{
      this.sortinfo(this.unsorteduserBlogInfoArray);
    }
  }
  sortinfo( ara : BlogInfo[] ) : BlogInfo[] {
    for(var i = 0; i < ara.length; i++){
      for(var j = i+1; j < ara.length; j++){
        if(ara[i].like_count<ara[j].like_count)
        {
          [ara[i], ara[j]]=[ara[j], ara[i]];
        }
      }
    }
    return ara;
  }
  
}
