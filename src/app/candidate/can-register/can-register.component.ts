import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-register',
  templateUrl: './can-register.component.html',
  styleUrls: ['./can-register.component.css']
})
export class CanRegisterComponent implements OnInit {
  isSubmitted=false;
  Candidateform: any = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required),
    resume: new FormControl('', Validators.required),
    workStatus: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    long: new FormControl('', Validators.required),
    addressLoaction: new FormControl(''),
    location: new FormControl('', Validators.required),
  });
  candidateFile: any;
  constructor(private fb: FormBuilder, private canditateService: CanditateService, private router: Router) { }

  ngOnInit() {

  }
  // File upload
  file_name:any='';
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
        this.file_name=this.candidateFile.name
        console.log(this.candidateFile.name, "sdsdfsf")
      }
    }
  }
  // rgister api
  submit() {
    this.isSubmitted=true;
    console.log(this.Candidateform.value, 'sbdjshdbh')
    var jobForm = new FormData();
    jobForm.append('name', this.Candidateform.get('name')?.value);
    jobForm.append('email', this.Candidateform.get('email')?.value);
    jobForm.append('password', this.Candidateform.get('password')?.value);
    jobForm.append('confirmpassword', this.Candidateform.get('confirmpassword')?.value);
    jobForm.append('workStatus', this.Candidateform.get('workStatus')?.value);
    jobForm.append('mobileNumber', this.Candidateform.get('mobileNumber')?.value);
    jobForm.append('lat', this.Candidateform.get('lat')?.value);
    jobForm.append('long', this.Candidateform.get('long')?.value);
    jobForm.append('location', this.Candidateform.get('location')?.value)
    jobForm.append('resume', this.candidateFile);
    if (this.Candidateform.valid) {
      this.canditateService.submitcandicate(jobForm).subscribe((res: any) => {
        this.router.navigate(['/checkmailCan'])
      },
        error => {
          error.error.message;
          console.log(error.error.message, 'ppppp');
        });
        this.isSubmitted=false;
    }
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  latitude: any;
  longtitude: any;
  handleAddressChange(address: Address) {
    console.log(address);
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    this.latitude = address.geometry.location.lat();
    this.latitude = String(this.latitude)
    this.longtitude = address.geometry.location.lng();
    this.longtitude = String(this.longtitude)

    this.Candidateform.patchValue({
      lat: this.latitude,
      long: this.longtitude,
      location: address.formatted_address
    })
  }
}
