import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrls: ['./job-preview.component.css']
})
export class JobPreviewComponent implements OnInit {
  jobId: any;
  jobdetails: any;
  postdate: any;

  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.jobId=params['id'];
    }
  );
  this.job_preview_details()
  this.calculateDiff()
  }
  job_preview_details() {
    this.empservice.job_preview(this.jobId).subscribe((res:any)=>{
      this.jobdetails = res[0]
      this.postdate = Date.parse(this.jobdetails.date);
      console.log(this.postdate)

    })
  }
  calculateDiff(){
    // let date = new Date(this.jobdetails.date);
    // let currentDate = new Date();
    // console.log(date,currentDate);
    // let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    // return days;

    var date1:any = new Date(this.postdate);
    var date2:any = new Date();
    console.log(date1,date2);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

}
