import { HttpClient} from '@angular/common/http';
import { Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';
import { ContestInfo } from 'src/app/Models/contest.model';
import { LoginInfo } from 'src/app/Models/login.model';
import { ContestService } from 'src/app/Service/contest.service';
import { UserService } from 'src/app/Service/user.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html', 
  styleUrls: ['./contest.component.css']
  
})
export class ContestComponent implements OnInit {
[x: string]: any;
  closeResult: string | undefined;

  
  constructor(private modalService: NgbModal,private userService: UserService,private http:HttpClient, private contestService:ContestService,public cookieService : CookieService){
    this.getAllContestInfo();
    this.getAllLoginInfo();
   
  }
  ngOnInit(){
    this.fetchProblems();
    this.labelproblem[0]="Enter code for problem 1";
    this.labelproblem[1]="Enter code for problem 2";
    this.labelproblem[2]="Enter code for problem 3";
    this.labelproblem[3]="Enter code for problem 4";
    console.log(new Date());
  }
  
  async setObj(ID:number){
    this.getAllContestInfo();
    await delay(200);
    console.log("ID "+ID);
    console.log(this.contestInfoArray);
    for(let i = 0; i < this.contestInfoArray.length;i++){
      if(this.contestInfoArray[i].contestId==ID){
        this.index=i;
        break;
      }
    }
    console.log(this.index);
    console.log(this.contestInfoArray[this.index].contestFile);
    var x:string=this.contestInfoArray[this.index].contestFile;
    this.obj=JSON.parse(x);
    var tm:string=this.obj[0].c0.prob1.ID;
      var tmm:string="";
      for(var i=0;i<tm.length;i++){
        if(tm[i]>='A' && tm[i]<='Z'){
            tmm+='/';
        }
        tmm+=tm[i];
      }
      this.problemLink[0]=this.cfProb+tmm;
      tmm="";
      tm=this.obj[0].c0.prob2.ID;
      for(var i=0;i<tm.length;i++){
        if(tm[i]>='A' && tm[i]<='Z'){
            tmm+='/';
        }
        tmm+=tm[i];
      }
      this.problemLink[1]=this.cfProb+tmm;
      tmm="";
      tm=this.obj[0].c0.prob3.ID;
      for(var i=0;i<tm.length;i++){
        if(tm[i]>='A' && tm[i]<='Z'){
            tmm+='/';
        }
        tmm+=tm[i];
      }
      this.problemLink[2]=this.cfProb+tmm;
      tmm="";
      tm=this.obj[0].c0.prob4.ID;
      for(var i=0;i<tm.length;i++){
        if(tm[i]>='A' && tm[i]<='Z'){
            tmm+='/';
        }
        tmm+=tm[i];
      }
      this.problemLink[3]=this.cfProb+tmm;
  }

  async open(content: any,ID:number) {
    this.setObj(ID);
    await delay(200);
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
  
// variables declarations
  // for previous contest
  hidePrevContest = false;
  openPrevContest = false;
  // for join contest
  hideJoinContest = false;
  openJoinContest = false;
  joinInputinfo = false;
  joinContestId="";
  joinContestPassword="";
  index = -1;

  // for create contest
  hideCreateContest = false;
  openCreateContest = false;
  contestStartYear="";
  contestStartDay="";
  contestStartMonth="";
  contestStartHour="";
  contestStartMinute="";
  contestEndYear="";
  contestEndDay="";
  contestEndMonth="";
  contestEndHour="";
  contestEndMinute="";
  contestDuration="";

  demoContest :ContestInfo = {
    contestId : 0,
    contestPassword : '',
    contestName : '',
    contestStartDate : '',
    contestEndDate : '',
    contestFile : '',
    contestSetter: '',
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
  demojoinContest :ContestInfo = {
    contestId : 0,
    contestPassword : '',
    contestName : '',
    contestStartDate : '',
    contestEndDate : '',
    contestFile : '',
    contestSetter: '',
  }
  contestInfoArray : ContestInfo[] = [];
  endedContestInfoArray : ContestInfo[] = [];
  getAllContestInfo(){
    this.contestService.getAllContestInfo().subscribe(data=>{
      this.contestInfoArray = data;
      //console.log(this.userLoginInfoArray);
    });
  }
  userLoginInfoArray : LoginInfo[] = [];
  // this will get all the user 
  getAllLoginInfo(){
    this.userService.getAllLoginInfo().subscribe(data=>{
      this.userLoginInfoArray = data;
      //console.log(this.userLoginInfoArray);
    });
  }
  //back button
  hideBackButton = true;

  // Problems
  problem:string[]=["","","",""];
  labelproblem:string[]=["","","",""]
  daysInMonth:string[]=["31","28","31","30","31","30","31","31","30","31","30","31"];
  problemLink:string[]=["123A","123B","123C","123C"];
  cfProb="https://codeforces.com/problemset/problem/";

  str = '2024-07-21';
  date:Date = new Date(this.str);
  str2="";
  date2 :Date = new Date();

 /// count Down
 remDays=0;
 remHours=0;
 remMinutes=0;
 remSeconds=0;
 startDate=new Date();
 endDate=new Date();
 contestDate=new Date();
 obj:any;
 clockHeader="Start Countdown";
  hasStarted=false;
  firstDiv=0;
  joinContestBtn=0;
  createCotestBtn=0;
  joinContestField = 0;
  newContestId="";
  joinContestKey="";
  newContestKey="";
  showPrevContest = false;
  penalty:number[]=[0,0,0,0];
  noOfAt:number[]=[0,0,0,0];
  score:number[]=[0,0,0,0];
  isAC:number[]=[0,0,0,0];
  isShowContest:number[]=[]
  isproblemOk:number[] =[0,0,0,0];
  x : any;
  prob : any;
  newContestID=0;
  fetchProblems( ){
    var cfapiprob="https://codeforces.com/api/problemset.problems?";
    this.http.get(cfapiprob).subscribe(Response =>{
      this.x=Response;
      this.prob=this.x.result.problems;
      console.log(this.prob[0]);
      
    })
  }
  
// function Declarations
  
  //for previous contest
    clickPrevContest(){
      this.clickBackBtn();
      this.openPrevContest=true;
      this.getAllContestInfo();
      for(var i=0;i<this.contestInfoArray.length;i++){
         var date1=new Date(this.contestInfoArray[i].contestEndDate);
         if(date1<=new Date()){
          this.endedContestInfoArray.push(this.contestInfoArray[i]);
          this.isShowContest.push(0);
         }
      }

    }


  // for join contest
     clickJoinContest(){
      this.getAllContestInfo();
      if(this.cookieService.get('user_name')=="" || this.cookieService.get('user_name')==null){
        alert("Please Login to join a contest");
      }
      else if(this.cookieService.get('user_cf_handle')=="" || this.cookieService.get('user_cf_handle')==null){
        alert("Please Provide Codeforces handle on the profile page")
      }
      else{
        this.clickBackBtn();
        this.openJoinContest=true;
        this.joinInputinfo=true;
      }
     }
    // IMPORTANT
    async joinAcontest(){
    this.getAllContestInfo();
    await delay(200);
    var flag=false;
    for(var i=0;i<this.contestInfoArray.length;i++){
      if(this.contestInfoArray[i].contestId.toString()==this.joinContestId && this.contestInfoArray[i].contestPassword==this.joinContestPassword)
      {
        flag = true;
        this.index = i;
      }
    }

    if(flag==false)
    {
      alert("Contest Id or Password did not match!");
    }
    else {
      
      this.date=new Date();
      this.startDate= new Date(this.contestInfoArray[this.index].contestStartDate);
      this.endDate =new Date(this.contestInfoArray[this.index].contestEndDate);
      console.log(this.contestInfoArray[this.index].contestEndDate);
      console.log(this.endDate)
      if(this.date>this.endDate){
          alert("Contest has already ended");
      }
      else{
        var x:string=this.contestInfoArray[this.index].contestFile;
        this.obj=JSON.parse(x);
        var fl=true;
        for(var i=1; i<this.obj.length; i++) {
          if(this.obj[i].c0.UserId==this.cookieService.get('user_name')){
            fl=false;
            break;
          }
        }
        if(fl){
          var tmp={c0:{UserId:this.cookieService.get('user_name'),solvecount:'0',totalPenalty:'0',perPenalty:'10',
                
            prob1:{ID:this.obj[0].c0.prob1.ID,status:'',actime:'',numberOfattempt:'0'},
            prob2:{ID:this.obj[0].c0.prob2.ID,status:'',actime:'',numberOfattempt:'0'},
            prob3:{ID:this.obj[0].c0.prob3.ID,status:'',actime:'',numberOfattempt:'0'},
            prob4:{ID:this.obj[0].c0.prob4.ID,status:'',actime:'',numberOfattempt:'0'},

          }};
          this.obj.push(tmp)
          x=JSON.stringify(this.obj);
          this.contestInfoArray[this.index].contestFile=x;
          this.contestService.updateContest(this.contestInfoArray[this.index]).subscribe(data =>{
          });
          await delay(200);
        }
        {
          //storing problem links
          var tm:string=this.obj[0].c0.prob1.ID;
          var tmm:string="";
          for(var i=0;i<tm.length;i++){
            if(tm[i]>='A' && tm[i]<='Z'){
               tmm+='/';
            }
            tmm+=tm[i];
          }
          this.problemLink[0]=this.cfProb+tmm;
          tmm="";
          tm=this.obj[0].c0.prob2.ID;
          for(var i=0;i<tm.length;i++){
            if(tm[i]>='A' && tm[i]<='Z'){
               tmm+='/';
            }
            tmm+=tm[i];
          }
          this.problemLink[1]=this.cfProb+tmm;
          tmm="";
          tm=this.obj[0].c0.prob3.ID;
          for(var i=0;i<tm.length;i++){
            if(tm[i]>='A' && tm[i]<='Z'){
               tmm+='/';
            }
            tmm+=tm[i];
          }
          this.problemLink[2]=this.cfProb+tmm;
          tmm="";
          tm=this.obj[0].c0.prob4.ID;
          for(var i=0;i<tm.length;i++){
            if(tm[i]>='A' && tm[i]<='Z'){
               tmm+='/';
            }
            tmm+=tm[i];
          }
          this.problemLink[3]=this.cfProb+tmm;

        }
        console.log(this.problemLink[0]);
        console.log(this.problemLink[1]);
        console.log(this.problemLink[2]);
        console.log(this.problemLink[3]);
       
        this.contestDate=this.startDate;
        this.joinInputinfo=false; 
        this.sortarray();
        this.setTime();
        
      }
      
    }

    }




  // for create contest
     async clickCreateContest(){
      if(this.cookieService.get('user_name')=="" || this.cookieService.get('user_name')==null){
        alert("Please Login to Create a contest");
      }
      else if(this.cookieService.get('user_cf_handle')=="" || this.cookieService.get('user_cf_handle')==null){
        alert("Please Provide Codeforces handle on the profile page")
      }
      else {
        this.clickBackBtn();
        this.getAllContestInfo();
        await delay(200);
        var len=this.contestInfoArray.length;
        this.newContestID=this.contestInfoArray[len-1].contestId+1;
        this.openCreateContest=true;
      }
     }

// problem
  values = '';

  onKey(event: any,id:number) { // without type info
    this.values = event.target.value;
    var problemnumber=id+1;
    var check=0;
    var probName="";
    var ppp="prob"+id.toString()
    for(var i=0;i<this.prob.length;i++) {
      if((this.prob[i].contestId+this.prob[i].index)==this.values){
        check=1;
        probName=this.prob[i].name;
        break;
      }
    }
    if(this.values==""){
      this.labelproblem[id]="Enter code for problem "+problemnumber.toString();;
      this.isproblemOk[id]=0;
    }
    else if(check==1){
      this.labelproblem[id]=probName;
      this.isproblemOk[id]=1;
    }
    else{
      this.labelproblem[id]="No Such Problem";
      this.isproblemOk[id]=0;
    }
    // if(id==0){
    //   this.prob0.nativeElement.value=this.labelproblem[0];
    //   console.log(this.prob0.nativeElement.value);
    // }
    // else if(id==1){
    //   this.prob1.nativeElement.value=this.labelproblem[1];
    // }
    // else if(id==2){
    //   this.prob2.nativeElement.value=this.labelproblem[2];
    // }
    // else{
    //   this.prob3.nativeElement.value=this.labelproblem[3];
    // }
    
  }

  joinContest(){
    this.joinContestField=1;
    this.joinContestBtn=1;

  }
  enterContest(){
    this.joinContestField=2;
    this.firstDiv=1;
  }
  createContest(){
    this.createCotestBtn=1;
  }
  getContestID(){
    console.log(this.date);
    this.str2=this.date.toISOString();
    console.log(this.str2);
    this.date2=new Date(this.str2);
    console.log(this.date2);
    
  }
  clickBackBtn(){
    this.hideBackButton=!this.hideBackButton;
    this.hidePrevContest = !this.hideBackButton;
    this.hideJoinContest = !this.hideBackButton;
    this.hideCreateContest = !this.hideBackButton;
    if(this.hideBackButton==true){
      this.openCreateContest=false;
      this.openPrevContest=false;
      this.openJoinContest=false;
      this.showPrevContest=false;
    }
  }

  async CreateNewContest(){
    this.date = new Date();
    var presentyear=this.date.getFullYear();
    var monthId=(+this.contestStartMonth)-1;
    var yearId= +this.contestStartYear;
    if( !(isNaN(+this.contestStartYear)||+this.contestStartYear<presentyear || +this.contestStartYear>+"9999")){
       if(this.check_leap_year(yearId)==true){
        this.daysInMonth[1]="29";
       }
    }
    if(this.demoContest.contestName==""){
      alert("Contest Name cannot be empty!");
    }
    else if(this.demoContest.contestPassword.length<4){
       alert("Password lenght cannnot be less than 4");
    }
    else if(isNaN(+this.contestStartYear)||+this.contestStartYear<presentyear || +this.contestStartYear>+"9999"){
        alert("Contest year should be between "+presentyear+" and 9999");
    }
    else if(isNaN(+this.contestStartMonth)||+this.contestStartMonth<+"1" || +this.contestStartMonth>+"12"){
      
      alert("Contest month should be between 1 and 12");
    }
    else if(isNaN(+this.contestStartDay)||+this.contestStartDay<+"1" || +this.contestStartDay>+this.daysInMonth[monthId]){
       alert("Contest day should be between 1 and " +this.daysInMonth[monthId]);
    }
    else if(isNaN(+this.contestStartHour)||this.contestStartHour=="" || +this.contestStartHour<+"0" || +this.contestStartHour>+"23"){
      alert("Contest Start Hour must be between 0 and 23");
    }
    else if(isNaN(+this.contestStartMinute)||this.contestStartMinute=="" ||+this.contestStartMinute<+"0" || +this.contestStartMinute>+"59"){
      alert("Contest Start Minute must be between 0 and 59");
    }
    else if(this.contestDuration.indexOf(".")!=-1){
      alert("Contest Duration must be an Integer Value");
    }
    else if(isNaN(+this.contestDuration)||+this.contestDuration<+"1" || +this.contestDuration>+"100"){
      alert("Contest Duration must be between 1 and 100 hours");
    }
    else{
      //str = 2022-12-14T10:45:11
      // '07/21/2024 04:24:37'
                                       //2022-12-23T15:20:01+0000
      this.contestStartMonth=this.format_date(this.contestStartMonth);
      this.contestStartDay=this.format_date(this.contestStartDay);
      this.contestStartHour=this.format_date(this.contestStartHour);
      this.contestStartMinute=this.format_date(this.contestStartMinute);
      var contestdate= this.contestStartYear+"-"+this.contestStartMonth+"-"+this.contestStartDay+"T"+this.contestStartHour+":"+this.contestStartMinute+":00+0600";
      var startDate = new Date(contestdate);
      var milsec= (+this.contestDuration*1000*60*60);
      var endDate= new Date(startDate.getTime()+milsec);
      console.log(startDate);
      console.log(endDate);
      var ok=1;
      if(startDate<new Date()){
        alert("Contes Start Date must be after Todays Date");
      }
      else{
        for(var i=0;i<4;i++){
          if(this.isproblemOk[i]==0){
            ok=0;
            break;
          }
        }
        if(ok==0){
          alert("Please Select Valid Problems");
        }
        else{
          // adding contest to the database; 
          this.demoContest.contestStartDate=startDate.toISOString();
          this.demoContest.contestEndDate=endDate.toISOString();
          var obj=[{c0:{UserId:'header',solvecount:'0',totalPenalty:'0',perPenalty:'10',
               
               prob1:{ID:'',status:'',actime:'',numberOfattempt:'0'},
               prob2:{ID:'',status:'',actime:'',numberOfattempt:'0'},
               prob3:{ID:'',status:'',actime:'',numberOfattempt:'0'},
               prob4:{ID:'',status:'',actime:'',numberOfattempt:'0'},
        
            }}]
          
          obj[0].c0.prob1.ID=this.problem[0];
          obj[0].c0.prob2.ID=this.problem[1];
          obj[0].c0.prob3.ID=this.problem[2];
          obj[0].c0.prob4.ID=this.problem[3];
          var myJSON = JSON.stringify(obj);
          this.demoContest.contestFile =myJSON;
          this.demoContest.contestSetter= this.cookieService.get('user_name');
          console.log("Setter: " +this.cookieService.get('user_name'))
          this.contestService.createContest(this.demoContest).subscribe(data =>{
            alert("Contest created");
          });
          await delay(200)
          // creating the json file 
          this.clickBackBtn();
          
          console.log(myJSON);
           


        }
      }
    }

    
  }

  /// leap year check
  check_leap_year(year:number):Boolean{
    if (year % 400 == 0) {
       return true;
    }
    else if (year % 100 == 0) {
      return false;
    }
    else if (year % 4 == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  format_date(str :string) :any {
     if(str.length==1){
      str = '0' + str;
     }
     return str;
     
  }

  // Count Down

  updateTime(){
    var t = this.contestDate.getTime() - new Date().getTime();
    if(t<0){
      if(this.clockHeader=="Remaining Time") return ;
      this.clockHeader="Remaining Time";
      this.contestDate=this.endDate;
      if(this.hasStarted==false){
        this.hasStarted=true;
        this.standingRefresh();
      }
      t = this.contestDate.getTime() - new Date().getTime();
    }
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    this.remDays=days;
    this.remHours = hours;
    this.remMinutes = minutes;
    this.remSeconds = seconds;
  }
  setTime(){
    const obs = interval(1000);
    obs.subscribe((d=>{
      this.updateTime();
    }));
  }
  
  //getting Contest data
  async getAndSetData(){
    this.getAllContestInfo();
    await delay(500);
    for(let i = 0; i < this.contestInfoArray.length;i++){
      if(this.contestInfoArray[i].contestId.toString()==this.joinContestId){
        this.index=i;
      }
    }
    var x:string=this.contestInfoArray[this.index].contestFile;
    this.obj=JSON.parse(x);
    console.log("up");
    console.log(this.index);
    console.log(this.obj);
    var statusAPI="https://codeforces.com/api/user.status?handle=";
    var len=this.obj.length;
    this.startDate=new Date(this.contestInfoArray[this.index].contestStartDate)
    this.endDate=new Date(this.contestInfoArray[this.index].contestEndDate)
    for(var i=1;i<len;i++){
      if(this.obj[i].c0.prob1.status!="AC"){
        this.obj[i].c0.prob1.numberOfattempt="0";
      }
      if(this.obj[i].c0.prob2.status!="AC"){
        this.obj[i].c0.prob2.numberOfattempt="0";
      }
      if(this.obj[i].c0.prob3.status!="AC"){
        this.obj[i].c0.prob3.numberOfattempt="0";
      }
      if(this.obj[i].c0.prob4.status!="AC"){
        this.obj[i].c0.prob4.numberOfattempt="0";
      }
    }
    for(var usr=1;usr<this.obj.length;usr++){
      var handle=this.getHandle(this.obj[usr].c0.UserId);
      console.log("handle "+ handle);
      console.log(this.obj);
      var xx:any;
      var tmpp:any;
      this.http.get(statusAPI+handle+"&from=1&count=100").subscribe(Response =>{
        tmpp=Response;
        xx=tmpp.result;
      })
      await delay(10000);
        var len:any=xx.length-1;
        for(var i:number=len;i>=0;i--){
            var tm=+tmpp.result[i].creationTimeSeconds;
            var dt =new Date(tm*1000);
            if(dt>=this.startDate && dt<=this.endDate){
              
              var proID=tmpp.result[i].problem.contestId+tmpp.result[i].problem.index;
              
              // console.log("AT");
              // console.log(+this.obj[usr].c0.prob1.numberOfattempt);
              // console.log(this.obj[usr].c0.prob1.ID);
              if(proID==this.obj[0].c0.prob1.ID && this.obj[usr].c0.prob1.status!="AC"){
                
                
                this.obj[usr].c0.prob1.numberOfattempt=((+this.obj[usr].c0.prob1.numberOfattempt)+1).toString();
                if(tmpp.result[i].verdict=="OK"){
                  this.obj[usr].c0.prob1.status="AC";
                  var no=+this.obj[usr].c0.prob1.numberOfattempt;
                  console.log(no);
                  var tp=+this.obj[usr].c0.totalPenalty;
                  var dif:number =(-this.startDate.getTime()+dt.getTime())
                  dif/=60000
                  dif=Math.floor(dif);
                  this.obj[usr].c0.totalPenalty=(dif+tp+(no-1)*10).toString();
                  
                  // console.log("vitor "+usr);
                  // console.log(this.obj[usr].c0.solvecount)
                  this.obj[usr].c0.solvecount=((+this.obj[usr].c0.solvecount)+1).toString();
                  console.log(this.obj[usr].c0.solvecount)
                  this.obj[usr].c0.prob1.actime=dt.toISOString();
                  
                  console.log("time " +dif);
                }
                else{
                  this.obj[usr].c0.prob1.status="WA";
                  
                }
              }
              
              if(proID==this.obj[0].c0.prob2.ID && this.obj[usr].c0.prob2.status!="AC"){
                this.obj[usr].c0.prob2.numberOfattempt=((+this.obj[usr].c0.prob2.numberOfattempt)+1).toString();
                if(tmpp.result[i].verdict=="OK"){
                  this.obj[usr].c0.prob2.status="AC";
                  var no=+this.obj[usr].c0.prob2.numberOfattempt;
                  console.log(no);
                  var tp=+this.obj[usr].c0.totalPenalty;
                  var dif:number =(-this.startDate.getTime()+dt.getTime())
                  dif/=60000
                  dif=Math.floor(dif);
                  this.obj[usr].c0.totalPenalty=(dif+tp+(no-1)*10).toString();
                  this.obj[usr].c0.solvecount=((+this.obj[usr].c0.solvecount)+1).toString();
                  console.log(this.obj[usr].c0.solvecount)
                  this.obj[usr].c0.prob2.actime=dt.toISOString();
                  
                  console.log("time " +dif);
                }
                else{
                  this.obj[usr].c0.prob2.status="WA";
                  
                }
              }

              if(proID==this.obj[0].c0.prob3.ID && this.obj[usr].c0.prob3.status!="AC"){
                this.obj[usr].c0.prob3.numberOfattempt=((+this.obj[usr].c0.prob3.numberOfattempt)+1).toString();
                if(tmpp.result[i].verdict=="OK"){
                  this.obj[usr].c0.prob3.status="AC";
                  var no=+this.obj[usr].c0.prob3.numberOfattempt;
                  console.log(no);
                  var tp=+this.obj[usr].c0.totalPenalty;
                  var dif:number =(-this.startDate.getTime()+dt.getTime())
                  dif/=60000
                  dif=Math.floor(dif);
                  this.obj[usr].c0.totalPenalty=(dif+tp+(no-1)*10).toString();
                  this.obj[usr].c0.solvecount=((+this.obj[usr].c0.solvecount)+1).toString();
                  console.log(this.obj[usr].c0.solvecount)
                  this.obj[usr].c0.prob3.actime=dt.toISOString();
                  
                  console.log("time " +dif);
                }
                else{
                  this.obj[usr].c0.prob3.status="WA";
                  
                }
              }
              if(proID==this.obj[0].c0.prob4.ID && this.obj[usr].c0.prob4.status!="AC"){
                this.obj[usr].c0.prob4.numberOfattempt=((+this.obj[usr].c0.prob4.numberOfattempt)+1).toString();
                if(tmpp.result[i].verdict=="OK"){
                  this.obj[usr].c0.prob4.status="AC";
                  var no=+this.obj[usr].c0.prob4.numberOfattempt;
                  console.log(no);
                  var tp=+this.obj[usr].c0.totalPenalty;
                  var dif:number =(-this.startDate.getTime()+dt.getTime())
                  dif/=60000
                  dif=Math.floor(dif);
                  this.obj[usr].c0.totalPenalty=(dif+tp+(no-1)*10).toString();
                  this.obj[usr].c0.solvecount=((+this.obj[usr].c0.solvecount)+1).toString();
                  console.log(this.obj[usr].c0.solvecount)
                  this.obj[usr].c0.prob4.actime=dt.toISOString();
                  
                  console.log("time " +dif);
                }
                else{
                  this.obj[usr].c0.prob4.status="WA";
                  
                }
              }

              
            }
        }
        console.log("user");
      console.log(this.obj[usr]);      
    }
    this.getAllContestInfo();
    await delay(200);
    for(let i = 0; i < this.getAllContestInfo.length;i++){
      if(this.contestInfoArray[i].contestId.toString()==this.joinContestId && this.contestInfoArray[i].contestPassword==this.joinContestPassword){
        this.index=i;
      }
    }
    this.demoContest=this.contestInfoArray[this.index];
    var myJSON = JSON.stringify(this.obj);
      this.demoContest.contestFile =myJSON;
      this.contestService.updateContest(this.demoContest).subscribe(data =>{
            
      });
      await delay(200);
    this.sortarray();
  }

  async sortarray() {
    this.getAllContestInfo();
    await delay(200);
    for(let i = 0; i < this.getAllContestInfo.length;i++){
      if(this.contestInfoArray[i].contestId.toString()==this.joinContestId && this.contestInfoArray[i].contestPassword==this.joinContestPassword){
        this.index=i;
      }
    }
    this.demoContest=this.contestInfoArray[this.index];
    this.obj=JSON.parse(this.contestInfoArray[this.index].contestFile);
    for(var i=1;i<this.obj.length;i++) {
      for(var j=i+1;j<this.obj.length;j++) {
        if(this.obj[j].c0.solvecount>this.obj[i].c0.solvecount)
        {
          [this.obj[j], this.obj[i]]=[this.obj[i], this.obj[j]];
        }
        else if(this.obj[j].c0.solvecount==this.obj[i].c0.solvecount && this.obj[j].c0.totalPenalty<this.obj[i].c0.totalPenalty)
        {
          [this.obj[j], this.obj[i]]=[this.obj[i], this.obj[j]];
        }
      }
    }
    this.demoContest.contestFile=JSON.stringify(this.obj);
    console.log(this.demoContest);
    this.contestService.updateContest(this.demoContest).subscribe(data =>{
            
    });
    await delay(200);
  }
  standingRefresh(){
    const obs=interval(40000);
    obs.subscribe((d=>{
      this.getAndSetData();
    }));
  }
  
  getHandle(userName:string):string {
    this.getAllLoginInfo();
    for(var i=0;i<this.userLoginInfoArray.length;i++){
      if(this.userLoginInfoArray[i].user_name==userName){
        return this.userLoginInfoArray[i].user_cf_handle;
      }
    }
    return "";
  }



}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
function sleep(arg0: number) {
  throw new Error('Function not implemented.');
}

