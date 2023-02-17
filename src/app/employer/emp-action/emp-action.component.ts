import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-action',
  templateUrl: './emp-action.component.html',
  styleUrls: ['./emp-action.component.css']
})
export class EmpActionComponent implements OnInit {
  id: any;
  candidate_data: any;
  jobid: any;
  getstatus: any;
  send_value: any;

  constructor(private empservice: EmpServiceService,private fb:FormBuilder, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.id=params['id'];
      this.jobid=params['job'];

    }
  );
  this.get_candidate_details(this.id,this.jobid)
  }
  get_candidate_details(id:any,jobid:any){
    this.empservice.get_candidate_details(id,jobid).subscribe((res:any)=>{
      this.candidate_data = res[0]
      this.getstatus = this.candidate_data.appliedStatus
      console.log(this.candidate_data.appliedStatus);
    })
  }
  status(status:any){
    var data={
      approvedStatus:status
    }
    this.empservice.change_status_candidates(this.candidate_data.postjobId,data).subscribe((res:any)=>{
      console.log(res);
      this.get_candidate_details(this.id,this.jobid)
    })
  }
  send(e:any){
    console.log(e.target.value)
     this.send_value = e.target.value;
     if(this.send_value == 'send mail'){
      var data: any ={
        candidates:Array(this.id)
      }
      var queryString = new URLSearchParams(data).toString();
      this.router.navigateByUrl('/sendMail?'+queryString);
     }
     if(this.send_value == 'send job'){
       var data: any ={
        candidates:Array(this.id)
      }
      var queryString = new URLSearchParams(data).toString();
      this.router.navigateByUrl('/sendJob?'+queryString);
     }
   
  }
}
