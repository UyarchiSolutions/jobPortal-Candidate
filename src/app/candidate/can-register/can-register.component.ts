import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-register',
  templateUrl: './can-register.component.html',
  styleUrls: ['./can-register.component.css']
})
export class CanRegisterComponent implements OnInit {
  Candidateform:any =this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    resume: new FormControl('', Validators.required),
    workStatus: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    long: new FormControl('', Validators.required),
    addressLoaction : new FormControl('')
  });
  candidateFile:any;
  constructor(private fb:FormBuilder,private canditateService:CanditateService,private router:Router) { }

  ngOnInit(){

  }
  // File upload
  addresume(file: any) {
    console.log("sbdhsbdhj")
    this.candidateFile = null;
    const res = file.target.files[0] as File;
    if (res != null) {
      if (
        res.type == 'application/pdf' ||
        res.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        this.candidateFile = res;
      }
    }
  }
  // rgister api
  submit() {
    console.log(this.Candidateform.value,'sbdjshdbh')
    var jobForm = new FormData();
    jobForm.append('name', this.Candidateform.get('name')?.value);
    jobForm.append('email', this.Candidateform.get('email')?.value);
    jobForm.append('password', this.Candidateform.get('password')?.value);
    jobForm.append('confirmpassword', this.Candidateform.get('confirmpassword')?.value);
    jobForm.append('workStatus', this.Candidateform.get('workStatus')?.value);
    jobForm.append('mobileNumber', this.Candidateform.get('mobileNumber')?.value);
    jobForm.append('lat', this.Candidateform.get('lat')?.value);
    jobForm.append('long', this.Candidateform.get('long')?.value);
    jobForm.append('resume', this.candidateFile);
     this.canditateService.submitcandicate(jobForm).subscribe( (res: any) => {
        },
        error => {
          error.error.message;
          console.log(error.error.message, 'ppppp');
        }
      );
      this.router.navigate(['/checkmailCan'])
  }
}
