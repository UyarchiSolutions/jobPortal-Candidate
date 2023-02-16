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

  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.jobId=params['id'];
    }
  );
  this.job_preview_details()
  }
  job_preview_details() {
    this.empservice.job_preview(this.jobId).subscribe((res:any)=>{
      console.log(res)
      this.jobdetails = res.user[0]
    })
  }
 
}
