import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-getallcandidate-profile',
  templateUrl: './getallcandidate-profile.component.html',
  styleUrls: ['./getallcandidate-profile.component.css']
})
export class GetallcandidateProfileComponent implements OnInit {
  getAlldetails:any=[]
  tab=0;
  recentData:any=[];
  constructor(private candidateservice:CanditateService,private router:Router) { }

  ngOnInit() {
    this.getallDetails();
    this.recentSearch();
  }
  getallDetails(){
    this.candidateservice.viewDetails().subscribe((res:any) => {
     this.getAlldetails=res.user;
    })
  }
  getBasic(){
    this.tab=0
  }
  getAdvance(){
    console.log("workinf")
    this.tab=2
  }
  geteducation(){
    this.tab=3;
  }
  Professional(){
    this.tab=4
  }
  editAdvance_det(){
   this.router.navigate(['/updateProfile'])
  }
  editedu(){
    this.router.navigate(['/can-edu'])
  }
  editProffi(){
    this.router.navigate(['/can-proffesinal'])
  }
   // recent Search
   recentSearch() {
    this.candidateservice.getRecentsearch().subscribe((res: any) => {
      this.recentData = res;
    })
  }

  recentdata(event:any){
    console.log(event,"event")
    let data={
      search:event.search,
      location:event.location,
      experience:event.experience
    }
   const queryString =new URLSearchParams(data).toString()
    this.router.navigateByUrl('/canJobs?'+queryString)
  }
}
