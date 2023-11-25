import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})

export class PracticeComponent  {
     constructor(private http:HttpClient){

     }
     x : any;
     isOk = 0;
     handle : any;
     status:any;
     li:any;
     lis :any;
     prob : any;
     clor ="gray";
     mx_rating : any;
     problems: string[][] = []; 
     solvedProblems=[""];
     submit(){
      this.problems=[];
      this.isOk=0;
      var cfapi="https://codeforces.com/api/user.info?handles=";
      var cfapiprob="https://codeforces.com/api/problemset.problems?";
      var url = cfapi+this.handle;
      this.http.get(url).subscribe(async Response => {
        this.li=Response;
        this.status=this.li.status;
        if(this.status=="OK"){
           this.lis=this.li.result;
        }
        this.mx_rating=this.lis[0].maxRating;
        var rat:number;
        rat=this.lis[0].rating;
       //rating wise color change
       if(rat<1200){
        this.clor="gray";
       }
       if(rat<1400){
          this.clor="green";
       }
       else if(rat<1600){
        this.clor="#03a89e";
       }
       else if(rat< 1900){
        this.clor="blue";
       }
       else if(rat<2100){
        this.clor="#a0a";
       }
       else if(rat<2300){
        this.clor="#ff8c00";
       }
       else if(rat<2400){
        this.clor="#ff8c00";
       }
       else if(rat<2600){
         this.clor="red";
       }
       else if(rat<3000){
          this.clor="red";
       }
       else{
         this.clor="#9c0b1c";
       }
       this.http.get("https://codeforces.com/api/user.status?handle="+this.handle).subscribe(Response => {
           
           var tmp:any;
           var xx:any;
           tmp=Response;
           xx=tmp.result;
           var len=xx.length;
           console.log(xx);
           console.log(len);
           for(var i=0; i<len; i++) {
            
             var proID=tmp.result[i].problem.contestId+tmp.result[i].problem.index;
             if(i<5){
              console.log("ID "+proID);
             }
             if(tmp.result[i].verdict=="OK"){
              this.solvedProblems.push(proID);
             }
           }
           
       });
       await delay(500);
       console.log("solved ");
       console.log(this.solvedProblems);
       console.log(this.solvedProblems.indexOf("1758D"))
       console.log(this.mx_rating);
        console.log(this.lis);
        this.http.get(cfapiprob).subscribe(Response =>{
          this.x=Response;
          this.prob=this.x.result.problems;
          console.log(this.prob[0]);

          for(var i=0;i<this.prob.length;i++){
            
            if(this.prob[i].rating>= Math.min(3500,this.mx_rating) && this.prob[i].rating<=Math.min(3500,this.mx_rating+200)){
                var link:string ="https://codeforces.com/problemset/problem/"+this.prob[i].contestId+"/"+this.prob[i].index;
                
                var pro=this.prob[i].contestId+this.prob[i].index;
                var tmp:string[]= [link,this.prob[i].name,pro];
                if(this.solvedProblems.indexOf(pro)==-1 && this.problems.length<10)this.problems.push(tmp);
            }
          }
          console.log(this.problems);
          this.isOk=1;
        })
      });
      function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
      }
      
      
     }
}
