import { Component, OnInit } from '@angular/core';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-view-fulldetails',
  templateUrl: './view-fulldetails.component.html',
  styleUrls: ['./view-fulldetails.component.css']
})
export class ViewFulldetailsComponent implements OnInit {
  getAlldetails:any=[]
  constructor(private canditateService:CanditateService) { }

  ngOnInit(){
    this.getallDetails()
  }
  getallDetails(){
    this.canditateService.viewDetails().subscribe((res:any) => {
     this.getAlldetails=res.user[0].candidateDetails;
     console.log(this.getAlldetails,"details")
    })
  }
}
