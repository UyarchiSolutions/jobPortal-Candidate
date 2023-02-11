import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-can-details',
  templateUrl: './can-details.component.html',
  styleUrls: ['./can-details.component.css']
})
export class CanDetailsComponent implements OnInit {
  id: any;
  candidate_data: any;
  send_value: any;
  is_open: boolean = false;
  data: any;

  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params['id']); 
      this.id=params['id'];
      this.get_candidate_details(this.id)
    }
  );
  this.getJobpostDetails()
  }
  get_candidate_details(id:any){
    this.empservice.get_candidate_details(id).subscribe((res:any)=>{
      this.candidate_data = res[0]
      console.log(res);
    })
  }
  send(e:any,popup:any){
     this.send_value = e.target.value;
     if(this.send_value == 'send mail'){
      this.router.navigateByUrl('sendMail');
     }
     if(this.send_value == 'send job'){
       this.is_open = true;
      // this.router.navigateByUrl('sendJob');
          popup.click();
       
     }
   
  }
  getJobpostDetails(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.data = res.user
      console.log(res.user);
    })
  }
}
