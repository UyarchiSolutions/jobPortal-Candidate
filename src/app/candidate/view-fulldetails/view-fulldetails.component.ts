import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-view-fulldetails',
  templateUrl: './view-fulldetails.component.html',
  styleUrls: ['./view-fulldetails.component.css']
})
export class ViewFulldetailsComponent implements OnInit {
  getAlldetails:any=[]
  constructor(private canditateService:CanditateService,private router:Router) { }

  ngOnInit(){
    this.getallDetails()
  }
  getallDetails(){
    this.canditateService.viewDetails().subscribe((res:any) => {
     this.getAlldetails=res.user[0].candidateDetails;
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
}
