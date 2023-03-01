import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-manage-recruiter',
  templateUrl: './manage-recruiter.component.html',
  styleUrls: ['./manage-recruiter.component.css']
})
export class ManageRecruiterComponent implements OnInit {
  list:any=[];
  id: any;
  reqlist: any;

  constructor(private route: ActivatedRoute,private empservice: EmpServiceService,private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
   
    this.get()
  }
  get(){
    this.empservice.get_recruiter().subscribe((data) =>{
      console.log(data)
      this.list = data
    })
  }
  delete(data:any){
    console.log(data)
     this.reqlist = data
  }
  confirmdelete(){
    this.empservice.delete_recruiter(this.reqlist._id).subscribe((res:any)=>{
      console.log(res);
      this.get()
    })
  }
} 
