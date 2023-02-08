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

    // doctorate
    // drQualification: new FormControl('', [Validators.required]),
    // drSpecialization: new FormControl('', [Validators.required]),
    // drCourseType: new FormControl('', [Validators.required]),
    // drCourse: new FormControl('', [Validators.required]),
    // drCourseDurationFrom: new FormControl('', [Validators.required]),
    // drCourseDurationTo: new FormControl('', [Validators.required]),
    // drGradingSystem: new FormControl('', [Validators.required]),
    // drMarks: new FormControl('', [Validators.required]),
    // Master
    // pgQualification: new FormControl('', [Validators.required]),
    // pgCourse: new FormControl('', [Validators.required]),
    // pgSpecialization: new FormControl('', [Validators.required]),
    // pgCourseType: new FormControl('', [Validators.required]),
    // pgCourseDurationFrom: new FormControl('', [Validators.required]),
    // pgCourseDurationTo: new FormControl('', [Validators.required]),
    // pgGradingSystem: new FormControl('', [Validators.required]),
    // pgMarks: new FormControl('', [Validators.required]),
    // UG Course
    // ugQualification: new FormControl('', [Validators.required]),
    // ugCourse: new FormControl('', [Validators.required]),
    // ugSpecialization: new FormControl('', [Validators.required]),
    // ugCourseType: new FormControl('', [Validators.required]),
    // ugCourseDurationFrom: new FormControl('', [Validators.required]),
    // ugCourseDurationTo: new FormControl('', [Validators.required]),
    // ugGradingSystem: new FormControl('', [Validators.required]),
    // ugMarks: new FormControl('', [Validators.required]),
    // HSC
    // hsBoard: new FormControl('', [Validators.required]),
    // hsQualification: new FormControl('', [Validators.required]),
    // hsPassedYear: new FormControl('', [Validators.required]),
    // hsMedium: new FormControl('', [Validators.required]),
    // hstotalmarks: new FormControl('', [Validators.required]),
    // ssLc
    // sslcQualification: new FormControl('', [Validators.required]),
    // sslcBoard: new FormControl('', [Validators.required]),
    // sslcPassedYear: new FormControl('', [Validators.required]),
    // sslcMedium: new FormControl('', [Validators.required]),
    // sslctotalmarks: new FormControl('', [Validators.required]),
    //  dummy
    // qualify: this.fb.array([this.fb.control(null)])
  })
  keySkill: any;
  constructor(private fb: FormBuilder, private candidateService: CanditateService, private router: Router) { }

  ngOnInit() {
    console.log(this.profileForm.get('education')?.value, "education");
    this.candidateService.getKeyskill().subscribe((res: any) => {

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
  qualifiacation(val: any) {
    console.log(val.target.value, "valjsdj")
    this.qualification = val.target.value;
    if (this.qualification == 'SSLC') {
      this.profileForm.get('sslcQualification').setValue(this.qualification)
    } else if (this.qualification == 'HSC') {
      this.profileForm.get('hsQualification').setValue(this.qualification)
    } else if (this.qualification == 'Graduation/Diploma') {
      this.profileForm.get('ugQualification').setValue(this.qualification)
    } else if (this.qualification == 'Masters/Post-Graduation') {
      this.profileForm.get('pgQualification').setValue(this.qualification)
    } else if (this.qualification == 'Doctoate/PhD') {
      this.profileForm.get('drQualification').setValue(this.qualification)
    }
  }
  isDisplay = false;
  dispalye(data: any) {

    if (data.target.value) {
      this.isDisplay = true;
      console.log(data.target.value, "valuesmdkjfjdhj")
    } else {
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
  updateprofile() {
    const formData = new FormData();
    formData.append('image', this.selectImg1);
    this.candidateService.updateProfile(this.profileForm.value).subscribe((res: any) => {
      this.candidateService.imageUpload(res.user._id, formData).subscribe((res: any) => {

      })
      this.router.navigate(['/canJobs'])
    })
  }
}
