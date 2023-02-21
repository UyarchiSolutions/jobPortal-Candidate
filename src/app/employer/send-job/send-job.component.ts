import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-send-job',
  templateUrl: './send-job.component.html',
  styleUrls: ['./send-job.component.css']
})
export class SendJobComponent implements OnInit {
  id: any;
  postForm:any = this.formBuilder.group({
    jobTittle : new FormControl(null, Validators.required),
    email : new FormControl('', Validators.required),
    subject : new FormControl('', Validators.required),
    signature : new FormControl('', Validators.required),
  })
  jobId: any;
  job_list: any;
  jobdetails: any;
  skills: any;
  title: any;
  candidates: any;
  is_attached:boolean = false;
  canArray = [];
  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.candidates=params['candidates'];
      this.canArray = this.candidates.split(",")
      console.log(this.canArray);
    }
  );
  this.get_job_list()
  }
 
  get_job_list(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.job_list = res.user
      console.log(this.job_list)
    })
  }
  job_details(e:any) {
    this.jobId = e.target.value;
    this.empservice.get_job_detail(this.jobId).subscribe((res:any)=>{
      console.log(res)
      this.jobdetails = res.user[0]
      this.postForm.patchValue({
        subject:this.jobdetails.jobTittle
      })
    })
  }
  sendajob(){
    var data={
       candidates:this.canArray,
       mailId: this.jobId,
       subject:this.postForm.get('subject')?.value,
       signature:this.postForm.get('signature')?.value,
       email:'noreply-tj@uyarchi.com',
       mail:'job'
    }
    this.empservice.sendajob(data).subscribe((res:any)=>{
        console.log(res)
        this.postForm.reset()
    })
  }
  
}
