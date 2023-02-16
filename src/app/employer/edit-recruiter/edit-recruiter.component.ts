import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-edit-recruiter',
  templateUrl: './edit-recruiter.component.html',
  styleUrls: ['./edit-recruiter.component.css']
})
export class EditRecruiterComponent implements OnInit {
  editform:any = this.fb.group({
    recruiterName :new FormControl('', Validators.required),
    email :new FormControl('', Validators.required),
    mobileNumber :new FormControl('', Validators.required)
  })
  id: any;
  constructor(private route: ActivatedRoute,private empservice: EmpServiceService,private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params); 
      this.id=params['id'];
    }
  );
    this.get_data()
  }
  get_data(){
    this.empservice.getdetails_recruiter(this.id).subscribe((data:any) =>{
      console.log(data)
      this.editform.patchValue({
        recruiterName:data.recruiterName,
        email:data.email,
        mobileNumber:data.mobileNumber
      })
    })
  }
  edit(){
    this.empservice.edit_recruiter(this.id,this.editform.value).subscribe((data) =>{
         console.log(data)
         this.editform.reset();
         this.router.navigateByUrl('/manage-recruiter')
    })
  }
}
