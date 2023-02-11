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
    jobTittle : new FormControl('', Validators.required),
    salaryRangeFrom : new FormControl('', Validators.required),
    salaryRangeTo : new FormControl('', Validators.required),
    experienceFrom : new FormControl('', Validators.required),
    experienceTo : new FormControl('', Validators.required),
    jobLocation : new FormControl('', Validators.required),
    keySkill : this.formBuilder.array([], Validators.required),
    jobDescription : new FormControl('', Validators.required),

  })
  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params['id']); 
      this.id=params['id'];
      this.job_detail(this.id)
    }
  );
  }
  job_detail(id: any) {
    this.empservice.get_job_detail(id).subscribe((res:any)=>{
      this.job_detail = res.user[0]
      this.postForm.patchValue({

      })
    })
  }

}
