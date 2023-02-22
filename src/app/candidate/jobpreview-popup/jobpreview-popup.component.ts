import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditService } from 'src/app/candit.service';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-jobpreview-popup',
  templateUrl: './jobpreview-popup.component.html',
  styleUrls: ['./jobpreview-popup.component.css']
})
export class JobpreviewPopupComponent implements OnInit {
  mailId:any;
  mailedJob:any=[];
  constructor(private activatedRoute:ActivatedRoute,private candidate:CanditateService,private router:Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res:any) =>{
     this.mailId=res;
     console.log(this.mailId,"ididi")
     this.getDetails(this.mailId.id);
    })
  }
  getDetails(id:any){
    console.log("enskkmf")
    this.candidate.applyJob_mail(id).subscribe((res:any) => {
      console.log(res,"response")
     this.mailedJob=res;
    })
  }
 // apply jops
 apply(jopId: any) {
  const job = {
    jobId: jopId
  }
  this.candidate.applyJobs(job).subscribe((res: any) => {
    this.getDetails(this.mailId.id);
  })
}
gotoBack(){
  this.router.navigate(['/canJobs'],{queryParams:{tab:5}})
}
diviedLac(value:any){
  return value/100000
}
}
