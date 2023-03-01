import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-add-recruiter',
  templateUrl: './add-recruiter.component.html',
  styleUrls: ['./add-recruiter.component.css']
})
export class AddRecruiterComponent implements OnInit {
  addform:any = this.fb.group({
    recruiterName :new FormControl('',[Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    email :new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    mobileNumber :new FormControl('', Validators.required)
  })
  submitted: boolean = false;
  constructor(private empservice: EmpServiceService,private fb:FormBuilder, private router: Router,) { }

  ngOnInit(): void {
  }
  add(){
    this.submitted = true
    if(this.addform.valid){
      this.empservice.addrecruiter(this.addform.value).subscribe((data) =>{
        console.log(data)
        this.addform.reset();
        this.router.navigateByUrl('/manage-recruiter')
   })
    }
    
  }
}
