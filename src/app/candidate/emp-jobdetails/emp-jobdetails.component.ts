import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-emp-jobdetails',
  templateUrl: './emp-jobdetails.component.html',
  styleUrls: ['./emp-jobdetails.component.css']
})
export class EmpJobdetailsComponent implements OnInit {
  jobDetals: any = [];
  source:any;
  jobid: any;
  reportForm:any=this.fb.group({
    report: new FormControl(''),
    reportothers : new FormControl('')
  })
  isdisplay = false
  constructor(private fb: FormBuilder,private candidateService: CanditateService, private activate: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activate.queryParams.subscribe((res: Params) => {
      console.log(res['mail'] == 'true')
      this.jobid=res['id']
      if(res['tab']==4){
        this.source='alret'
      }else if(res['tab']==5){
        this.source='notification'
      }else{
        this.source='job'
      }
        this.get_jobDetails(res['id'])
    })
  }

  homePage() {
    this.router.navigate(['/canJobs'])
  }
  // apply jops
  apply(jopId: any) {
    const job = {
      jobId: jopId,
      applied_side:this.source
    }
    this.candidateService.applyJobs(job).subscribe((res: any) => {
      this.get_jobDetails(jopId)
    })
  }
  // save job
  saveJob(id: any) {
    const save = {
      savejobId: id
    }
    this.candidateService.saveJob(save).subscribe((res: any) => {
      this.get_jobDetails(id)
    })
  }
  get_jobDetails(id: any) {
    this.candidateService.getJobs(id).subscribe((res: any) => {
      this.jobDetals = res;
      console.log((this.jobDetals), "titlenfjdnfjk")
    })
  }
  // apply_mail(id: any) {
  //   this.candidateService.applyJob_mail(id).subscribe((res: any) => {
  //     this.jobDetals = res[0].jobDetails;
  //   })
  // }
  report(e:any){
   console.log(e.target.value)
  //  if(e.target.value == 'Others'){
  //   this.isdisplay = true
  //  }
  //  else{
  //   this.isdisplay = false

  //  }
  
  }
  submit_report(){
    if(this.reportForm.get('report')?.value == 'Others'){
      let msg = this.reportForm.get('reportothers')?.value
      this.reportForm.get('report').setValue(msg)
      console.log(msg)
    }

    var data ={
      report:this.reportForm.get('report')?.value,
      jobId:this.jobid
     }
     this.candidateService.can_report(data).subscribe((res: any) => {
     console.log(res)
     this.reportForm.reset()
        })
  }
}
