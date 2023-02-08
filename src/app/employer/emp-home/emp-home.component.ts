import { Component, OnInit } from '@angular/core';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent implements OnInit {
  data: any;

  constructor(private empservice: EmpServiceService) { }

  ngOnInit(): void {
    this.getJobpostDetails()

  }
  getJobpostDetails(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.data = res.user
      console.log(res);
    })
  }
}
