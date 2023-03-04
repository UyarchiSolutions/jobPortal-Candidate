import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-view-fulldetails',
  templateUrl: './view-fulldetails.component.html',
  styleUrls: ['./view-fulldetails.component.css']
})
export class ViewFulldetailsComponent implements OnInit {
  getAlldetails:any=[];
  check:any=false;
  constructor(private canditateService:CanditateService,private router:Router) { }

  ngOnInit(){
    this.getallDetails()
  }
  getallDetails(){
    this.canditateService.viewDetails().subscribe((res:any) => {
     this.getAlldetails=res.user;
     console.log(this.getAlldetails,"details")
    })
  }
  // goto update profile
  updateProfile(id:any){
   this.router.navigate(['/updateProfile'],{queryParams:{id:id}})
  }
  // got to proffesnal
  gotoProffistional(id:any){
    this.router.navigate(['/can-proffesinal'],{queryParams:{id:id}})
  }
  //
  gotoEdu(id:any){
    this.router.navigate(['/can-edu'],{queryParams:{id:id}})
  }
  go(){
    this.router.navigate(['/canJobs'])
  }
  index: any;
  isDisplayIcon(value: any, know: any) {
    this.index = value.find((res: any) => res == know)
    if (this.index) {
      this.check = true;
      return this.check
    }
    else {
      this.check = false;
      return this.check;
    }
  }
  isCheck = false;
  isDisplayIcon2(value: any, know: any) {
    this.index = value.find((res: any) => res == know);
    if (this.index) {
      this.isCheck = true;
      return this.isCheck;
    }
    else {
      this.isCheck = false;

      return this.isCheck;
    }
  }
  ischeck3 = false;
  isDisplayIcon3(value: any, know: any) {
    this.index = value.find((res: any) => res == know)
    if (this.index) {
      this.ischeck3 = true;
      return this.ischeck3;
    }
    else {
      this.ischeck3 = false;
      console.log(this.ischeck3, "fngjgnhjfghj")
      return this.ischeck3;
    }
  }
}
