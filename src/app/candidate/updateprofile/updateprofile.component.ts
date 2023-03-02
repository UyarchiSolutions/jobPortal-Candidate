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
  isSubmitted: any = false;
  profileForm: any = this.fb.group({
    image: new FormControl(''),
    keyskill: new FormControl(null, [Validators.required]),
    dob: new FormControl('', Validators.required),
    experienceYear: new FormControl('', Validators.required),
    experienceMonth: new FormControl(''),
    expectedctc: new FormControl('', Validators.required),
    currentctc: new FormControl('', Validators.required),   //display only experience
    locationCurrent: new FormControl('', Validators.required),
    locationNative: new FormControl('', Validators.required),
    noticeperiod: new FormControl('', Validators.required),
    currentSkill: new FormControl(null, Validators.required),
    currentbox: new FormControl(''),
    preferredSkill: new FormControl(null, Validators.required),
    prefredBox: new FormControl(''),
    gender: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', Validators.required),
    relocate: new FormControl('', Validators.required),
    languages: this.fb.array([]),
    searchbox: new FormControl(null),
    currentctc_th: new FormControl(''),
    update: new FormControl()
  })
  viewAll: any = [];
  keySkill: any;
  lang: any = [];
  userId: any;
  now: any;
  getLang: any = []
  constructor(private fb: FormBuilder, private candidateService: CanditateService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    this.candidateService.getKeyskill().subscribe((res: any) => {
    })
    this.candidateService.getLanguages().subscribe((res: any) => {
      this.lang = res;
    })
    this.activateRoute.queryParams.subscribe((res: any) => {
      this.userId = res;
      if (this.userId.tab == "0" || this.userId.id) {
        this.getAlldata()
      }

    })
    const datePipe = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN')
    const time = formatDate(new Date(), 'hh:mm', 'en-IN')
    this.now = datePipe
    console.log(this.profileForm.get('languages')?.valid, "validators")

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
        searchbox: this.viewAll[0].keyskill,
        update: new FormControl('advance details')

        // languages: this.viewAll[0].keyskill
      })
      this.getLang = this.viewAll[0].languages;
      if (this.viewAll[0].experienceYear) {
        this.profileForm.get('currentctc').setErrors({ 'incorrect': true })
      } else {
        this.profileForm.get('currentctc').setErrors(null)
      }
      this.viewAll[0].languages.forEach((element: any) => {
        const data = this.profileForm.get('languages').push(this.fb.group({
          lang: new FormControl(element.lang),
          know: this.fb.array(element.know)
        }));
      });
    })
  }
  selectImg1: any;
  selectedImg1(event: any) {
    this.selectImg1 = event.target.files[0];

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
        console.log("well working")
      } else {
        console.log("working")
        console.log(this.profileForm.get('keyskill')?.setErrors({ 'incorrect': true }), "bjdfjdbfjdfb")
      }
    }
    this.profileForm.get('keyskill')?.setValue(value)

  }
  isShow = false;
  displayPrefered(data: any) {
    let val = data.target.value.split(",");
    if (data.target.value) {
      this.isShow = true
      console.log(this.isShow,"isndj")
    } else {
      this.isShow = false
      console.log(this.isShow,"isndjsbjkbjbjkb")
    }
    if (val.length != 0) {
      if (val[val.length - 1] != null && val[val.length - 1] != '') {
        this.getAllpreferd(val[val.length - 1])
      } else {
        // console.log("working")
        // console.log(this.profileForm.get('prefredBox')?.setErrors({'incorrect':true}),"bjdfjdbfjdfb")
      }
    }
    this.profileForm.get('preferredSkill')?.setValue(val)
  }
  checkPrefered(data:any,preSkill:any){
    this.isShow = false;
    let index: any = this.profileForm.get('preferredSkill')?.value;
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(preSkill)
      this.profileForm.get('preferredSkill')?.setValue(index)
      let search: any = index.toString() + ","
      this.profileForm.get('prefredBox')?.setValue(search);
    }
  }
  prferedSkill:any=[];
  getAllpreferd(value:any){
    this.candidateService.get_prefered(value).subscribe((res: any) => {
    this.prferedSkill=res;
    console.log(this.prferedSkill,'dfjdngjdgn')
    })
  }
  displaycurent(val:any){
    console.log("working")
    let value = val.target.value.split(",");
    if (val.target.value) {
      this.iscurrent = true
    } else {
      this.iscurrent = false
    }
    if (value.length != 0) {
      if (value[value.length - 1] != null && value[value.length - 1] != '') {
        this.getAllpreferd(value[value.length - 1])
      } else {
        // console.log("working")
        // console.log(this.profileForm.get('prefredBox')?.setErrors({'incorrect':true}),"bjdfjdbfjdfb")
      }
    }
    this.profileForm.get('currentSkill')?.setValue(value)
  }
  iscurrent=false;
  checkcurrent(val:any,currentskill:any){
    this.iscurrent = false;
    let index: any = this.profileForm.get('currentSkill')?.value;
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(currentskill)
      this.profileForm.get('currentSkill')?.setValue(index)
      let search: any = index.toString() + ","
      this.profileForm.get('currentbox')?.setValue(search);
    }
  }
  // push skills

  checkSkill(event: any, skill: any) {
    this.isDisplay = false;
    let index: any = this.profileForm.get('keyskill')?.value;
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(skill)
      this.profileForm.get('keyskill')?.setValue(index)
      let search: any = index.toString() + ","
      this.profileForm.get('searchbox')?.setValue(search);
    }
  }
  languageskill: any = [];
  selectlanguages: any = [];
  insLang(val: any) {
    if (val.target.checked) {
      const data = this.profileForm.get('languages').push(this.fb.group({
        lang: new FormControl(val.target.value, Validators.required),
        know: this.fb.array([])
      }));
    } else {
      let index = this.languages.value.findIndex((i: any) => i.lang == val.target.value);
      if (index != -1) {
        this.languages?.removeAt(index)
      }
    }
    console.log(this.profileForm.get('languages')?.invalid, "vailss")
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
    this.isSubmitted = true
    const formData = new FormData();
    formData.append('image', this.selectImg1);
    console.log(this.profileForm.value, "values")
    console.log(this.profileForm.valid, "values")
    // if (this.profileForm.valid) {
    //   if (this.userId.tab == "0" || this.userId.id) {
    //     this.candidateService.educationDetail(this.profileForm.value).subscribe((res: any) => {
    //       if (this.userId.id) {
    //         this.router.navigate(['/viewprofile'])
    //       } else {
    //         this.router.navigate(['/getAllprofile'])
    //       }
    //       this.candidateService.imageUpload(res.user._id, formData).subscribe((res: any) => {
    //       })
    //     })
    //   } else {
    //     this.candidateService.updateProfile(this.profileForm.value).subscribe((res: any) => {
    //       this.candidateService.imageUpload(res.user._id, formData).subscribe((res: any) => {
    //       })
    //       this.router.navigate(['/can-edu'])
    //     })
    //   }
    // }

  }
  checkeLang(val: any) {
    if (this.getLang.find((a: any) => a.lang == val)) {
      return true;

    } else {
      return false
    }
  }
  chekedKnown(index: any, lang: any, value: any) {
    console.log(value.value.know, "sdfdfdfgfgh")
    let knowIndex = value.value.know.findIndex((a: any) => (a == lang))
    if (knowIndex != -1) {
      return true
    } else {
      return false
    }

  }
  expreience(val: any) {
    if (val.target.value == 0) {
      this.profileForm.get('currentctc').setErrors(null)
      console.log(this.profileForm.get('experienceYear')?.value, this.profileForm.get('currentctc').setErrors(null))
    } else {
      console.log(this.profileForm.get('experienceYear')?.value, this.profileForm.get('currentctc').setErrors({ 'incorrect': true }))
      this.profileForm.get('currentctc').setErrors({ 'incorrect': true })
    }
  }
}
