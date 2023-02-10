import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  qualification: any;
  profileForm: any = this.fb.group({
    image: new FormControl('', [Validators.required]),
    keyskill: this.fb.array([],[Validators.required]),
    dob: new FormControl('', Validators.required),
    experienceYear: new FormControl('', Validators.required),
    experienceMonth: new FormControl('', Validators.required),
    expectedctc: new FormControl('', Validators.required),
    currentctc: new FormControl('', Validators.required),   //display only experience
    locationCurrent: new FormControl('', Validators.required),
    locationNative: new FormControl('', Validators.required),
    noticeperiod: new FormControl('', Validators.required),
    currentSkill: new FormControl('', Validators.required),
    preferredSkill: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    relocate: new FormControl('', Validators.required),
    // languages:
  })
  keySkill: any;
  lang:any=[]
  constructor(private fb: FormBuilder, private candidateService: CanditateService, private router: Router) { }

  ngOnInit() {
    console.log(this.profileForm.get('education')?.value, "education");
    this.candidateService.getKeyskill().subscribe((res: any) => {

    })
    this.candidateService.getLanguages().subscribe((res:any) =>{
    this.lang=res;
    })
  }
  getKeyskills(value: any) {
    this.candidateService.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  selectImg1: any;
  selectedImg1(event: any) {
    this.selectImg1 = event.target.files[0];
    console.log(this.selectImg1, "this.selectImg1");
  }
  getQualified() {
    return (<FormArray>this.profileForm.get('qualify')).controls
  }
  addQualification() {
    (this.profileForm.get('qualify') as FormArray).push(this.fb.control(null));
  }
  isDisplay = false;
  dispalye(data: any) {

    if (data.target.value) {
      this.isDisplay = true;
      console.log(data.target.value, "valuesmdkjfjdhj")
    }
    else {
      this.isDisplay = false
      console.log(data.target.value, "not  valuesmdkjfjdhj")
    }
    this.getKeyskills(data.target.value)
  }
  // push skills
  checkSkill(event:any){
    const data: FormArray = this.profileForm.get('keyskill') as FormArray;
    if (event.target.checked) {
      data.push(new FormControl(event.target.value));
      console.log(data)
    } else {
      let i: number = 0;
      data.controls.forEach((item: any) => {
        if (item == event.target.value) {
          data.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  insLang(val:any){

  }
  updateprofile() {
    const formData = new FormData();
    formData.append('image', this.selectImg1);
    this.candidateService.updateProfile(this.profileForm.value).subscribe((res: any) => {
      this.candidateService.imageUpload(res.user._id, formData).subscribe((res: any) => {

      })
      this.router.navigate(['/can-edu'],{queryParams:{id:res.user._id}})
    })
  }
}
