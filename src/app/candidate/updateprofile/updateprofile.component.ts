import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    keyskill: new FormControl(null, [Validators.required]),
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
    languages: this.fb.array([]),
    searchbox: new FormControl(null),
  })
  viewAll: any = [];
  keySkill: any;
  lang: any = [];
  userId: any;
  now:any;
  constructor(private fb: FormBuilder, private candidateService: CanditateService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.candidateService.getKeyskill().subscribe((res: any) => {
    })
    this.candidateService.getLanguages().subscribe((res: any) => {
      this.lang = res;
    })
    this.activateRoute.queryParams.subscribe((res: any) => {
      this.userId = res.id;
      if (this.userId) {
        this.getAlldata()
      }
    })
    const datePipe = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN')
    const time = formatDate(new Date(), 'hh:mm', 'en-IN')
    this.now = datePipe


  }
  getKeyskills(value: any) {
    this.candidateService.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  getAlldata() {
    this.candidateService.viewDetails().subscribe((res: any) => {
      this.viewAll = res.user;
      console.log(this.viewAll[0].keyskill, "key skill")
      this.profileForm.patchValue({
        image: this.viewAll.image,
        keyskill: this.viewAll[0].keyskill,
        dob: this.viewAll[0].dob,
        experienceYear: this.viewAll[0].experienceYear,
        experienceMonth: this.viewAll[0].experienceMonth,
        expectedctc: this.viewAll[0].expectedctc,
        currentctc: this.viewAll[0].currentctc,   //display only experience
        locationCurrent: this.viewAll[0].locationCurrent,
        locationNative: this.viewAll[0].locationNative,
        noticeperiod: this.viewAll[0].noticeperiod,
        currentSkill: this.viewAll[0].currentSkill,
        preferredSkill: this.viewAll[0].preferredSkill,
        gender: this.viewAll[0].gender,
        maritalStatus: this.viewAll[0].maritalStatus,
        relocate: this.viewAll[0].relocate,
        // languages: this.fb.array([]),
      })
      console.log(this.viewAll, "dfsdfgfgf")
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
    let value = data.target.value.split(",");

    if (data.target.value) {
      this.isDisplay = true;
    } else {
      this.isDisplay = false
    }
    if (value.length != 0) {
      if (value[value.length - 1] != null && value[value.length - 1] != '') {
        this.getKeyskills(value[value.length - 1])
      }
    }
    this.profileForm.get('keyskill')?.setValue(value)
    console.log(this.profileForm.value)

  }
  // push skills

  checkSkill(event: any, skill: any) {
    this.isDisplay=false;
    let index: any = this.profileForm.get('keyskill')?.value;
    console.log(index.length,"wORKINGDKSDK")
    if (index.length != 0) {
      console.log("workinf")
      let value = index.splice([index.length - 1], 1);
      index.push(skill)

      this.profileForm.get('search')?.setValue(index)
      let search: any = index.toString() + ","
      this.profileForm.get('searchbox')?.setValue(search);
    }
  }
  languageskill: any = [];
  insLang(val: any) {
    if (val.target.checked) {
      const data = this.profileForm.get('languages').push(this.fb.group({
        lang: new FormControl(val.target.value),
        know: this.fb.array([])
      }));
    } else {
      let index = this.languages.value.findIndex((i: any) => i.lang == val.target.value);
      if (index != -1) {
        this.languages?.removeAt(index)
      }
      console.log(this.languages.value)
    }
  }
  get languages() {
    return this.profileForm.get('languages') as FormArray;
  }
  kownaction(val: any, i: any, language: any) {
    console.log(i, "index");
    let Known = language.get('know')?.value;
    let value = val.target.value;
    let index = Known.findIndex((item: any) => item == value)
    if (val.target.checked) {
      Known.push(value)
    } else {
      Known.splice(index, 1);
    }
    language.get('kown')?.setValue(Known)
  }
  updateprofile() {
    const formData = new FormData();
    if (!this.userId) {
      this.candidateService.updateProfile(this.profileForm.value).subscribe((res: any) => {
        this.candidateService.imageUpload(res.user._id, formData).subscribe((res: any) => {
        })
        this.router.navigate(['/can-edu'], { queryParams: { id: res.user._id } })
      })
    } else {
      this.candidateService.educationDetail(this.profileForm.value).subscribe((res: any) => {
        this.router.navigate(['/viewprofile'])

        this.candidateService.imageUpload(res.user._id, formData).subscribe((res: any) => {

        })
      })
    }

  }
  addcontrol() {
    return
  }
}
