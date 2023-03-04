import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-educationdetails',
  templateUrl: './educationdetails.component.html',
  styleUrls: ['./educationdetails.component.css']
})
export class EducationdetailsComponent implements OnInit {
  qualification: any = [];
  educationForm: any = this.fb.group({
    educationArray: this.fb.array([], [Validators.required]),
  })
  drCourse: any = [];
  drsep: any = [];
  pgCourse: any = [];
  pgSpe: any = [];
  ugcourse: any = [];
  ugSpe: any = [];
  hscCourse: any = [];
  sslcspe: any = [];
  userID: any;
  private _fb: any;
  isSubmitted = false;
  lang:any;
  constructor(private fb: FormBuilder, private candidate: CanditateService, private activate: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.candidate.getQualification().subscribe((res: any) => {
      this.qualification = res;
    })
    this.activate.queryParams.subscribe((res: any) => {
      this.userID = res.id;
      console.log(this.userID, "sdsdsd");
      if (this.userID == null) {
      this.addPhase();
      }
    })
    // this.Qualification.controls.forEach((res: any) => {
    this.getAlldata();
    // if (!this.data) {
    //   this.addPhase();
    // }
    // })
    console.log(this.educationForm.get('educationArray').controls[0].status);
    this.candidate.getLanguages().subscribe((res: any) => {
      this.lang = res;
    })
  }
  q: any;
  qualifiacation(val: any, index: any, phase: any) {
    let allcontrols = ['drQualification', 'drSpecialization', 'drCourseType', 'drCourse', 'drCourseDurationFrom', 'drCourseDurationTo', 'drGradingSystem', 'drMarks', 'drUniversity', 'pgQualification', 'pgCourse', 'pgSpecialization', 'pgCourseType', 'pgCourseDurationFrom', 'pgCourseDurationTo', 'pgGradingSystem', 'pgMarks', 'pgUniversity', 'ugQualification', 'ugSpecialization', 'ugCourse', 'ugCourseType', 'ugCourseDurationFrom', 'ugCourseDurationTo', 'ugGradingSystem', 'ugUniversity', 'ugMarks', 'hsBoard', 'hsQualification', 'hsPassedYear', 'hsMedium', 'hstotalmarks', 'sslcQualification', 'sslcBoard', 'sslcPassedYear', 'sslcMedium', 'sslctotalmarks']
    let ss: any = {
      'Doctorate/phD': ['drQualification', 'drSpecialization', 'drCourseType', 'drCourse', 'drCourseDurationFrom', 'drCourseDurationTo', 'drGradingSystem', 'drMarks', 'drUniversity'],
      'Masters/Post-Graduation': ['pgQualification', 'pgCourse', 'pgSpecialization', 'pgCourseType', 'pgCourseDurationFrom', 'pgCourseDurationTo', 'pgGradingSystem', 'pgMarks', 'pgUniversity'],
      'Graduation/Diploma': ['ugCourse', 'ugQualification', 'ugSpecialization', 'ugCourseType', 'ugCourseDurationFrom', 'ugCourseDurationTo', 'ugGradingSystem', 'ugMarks', 'ugUniversity'],
      HSC: ['hsBoard', 'hsQualification', 'hsPassedYear', 'hsMedium', 'hstotalmarks'],
      SSLC: ['sslcQualification', 'sslcBoard', 'sslcPassedYear', 'sslcMedium', 'sslctotalmarks']
    }
    let value = val.target.value;
    console.log(val.target.value, "target")
    allcontrols.forEach((a: any) => {
      <FormArray>phase.removeControl(a)
    })
    ss[value].forEach((a: any) => {
      <FormArray>phase.addControl(a, new FormControl('', Validators.required))
    })
    phase.get('Education')?.setValue(value);
    let q = this.qualification.find((data: any) => data.qualification == val.target.value)
    console.log(phase.get('Education')?.setValue(value), "ssss");
    // dr
    if (val.target.value == 'Doctorate/phD') {
      phase.get('drQualification')?.setValue(q._id);
      this.candidate.getdoctorate(q._id).subscribe((res: any) => {
        this.drCourse = res
      })

    }
    // pg
    if (val.target.value == 'Masters/Post-Graduation') {
      phase.get('pgQualification')?.setValue(q._id);
      this.candidate.getPgcourses(q._id).subscribe((res: any) => {
        this.pgCourse = res;
      })

    }
    // ug
    if (val.target.value == 'Graduation/Diploma') {
      phase.get('ugQualification')?.setValue(q._id);
      this.candidate.grtUgcou(q._id).subscribe((res: any) => {
        this.ugcourse = res;
      })

    }
    // hsc
    if (val.target.value == 'HSC') {
      phase.get('hsQualification')?.setValue(q._id)
      this.candidate.hsccourse(q._id).subscribe((res: any) => {
        this.hscCourse = res
      })
    }
    // sslc
    if (val.target.value == 'SSLC') {
      phase.get('sslcQualification')?.setValue(q._id);
      this.candidate.sslcSpecial(q._id).subscribe((res: any) => {
        this.sslcspe = res
      })
    }


  }
  specialization(val: any, qali: any) {
    console.log(qali.value)
    if (qali.get('Education')?.value == 'Masters/Post-Graduation') {
      this.candidate.getPgSpecial(val.target.value).subscribe((res: any) => {
        this.pgSpe = res;
        qali.get('pgCourse')?.setValue(val.target.value);
      })
    }
    if (qali.get('Education')?.value == 'Graduation/Diploma') {
      console.log('wokin')
      this.candidate.ugSepcial(val.target.value).subscribe((res: any) => {
        this.ugSpe = res;
        qali.get('ugCourse')?.setValue(val.target.value);
      })
    }

    if (qali.get('Education')?.value == 'Doctorate/phD') {
      this.candidate.getDrSped(val.target.value).subscribe((res: any) => {
        this.drsep = res
        qali.get('drCourse')?.setValue(val.target.value);
      })
    }
  }
  hasPhaseValue1At(index: any) {
    console.log((<FormGroup>this.Qualification.at(index)).get('drCourse') ? true : false, "dhsdhsdbh")
    return (<FormGroup>this.Qualification.at(index)).get('drCourse') ? true : false;
  }
  get Qualification() {
    return this.educationForm.controls['educationArray'] as FormArray;
  }

  addPhase() {
    let conrols = this.fb.group({
      Education: new FormControl('', [Validators.required]),
    });
    this.Qualification.push(conrols)
  }

  addQualification() {
    this.addPhase();
  }
  submit() {
    this.isSubmitted = true;
    let data: any = {}
    this.educationForm.get('educationArray').value.forEach((e: any) => {
      data = { ...data, ...e }
    })
    delete data.Education;
    console.log(this.educationForm.get('educationArray').valid, "validators")
    if (this.educationForm.get('educationArray').valid) {
      this.candidate.eduction(data).subscribe((res: any) => {
        this.router.navigate(['/can-proffesinal'], { queryParams: { id: this.userID } })
      })
    }
  }
  addAllcontrol: any = [];
  data: any = []
  getAlldata() {
    this.candidate.viewDetails().subscribe((res: any) => {
      if (res.user.length != 0) {
        let value = res.user[0];
        this.data = res
        if (value.drQualification == 'Doctorate/phD') {
          this.candidate.getdoctorate(value.candidateDetails.drQualification).subscribe((res: any) => {
            this.drCourse = res
          })
          this.candidate.getDrSped(value.candidateDetails.drCourse).subscribe((res: any) => {
            this.drsep = res
          })
          this.addAllcontrol = this.fb.group({
            Education: new FormControl(value.drQualification, [Validators.required]),
            drQualification: new FormControl(value.candidateDetails.drQualification, [Validators.required]),
            drCourseDurationFrom: new FormControl(value.candidateDetails.drCourseDurationFrom, [Validators.required]),
            drCourseDurationTo: new FormControl(value.candidateDetails.drCourseDurationTo, [Validators.required]),
            drCourseType: new FormControl(value.candidateDetails.drCourseType, [Validators.required]),
            drGradingSystem: new FormControl(value.candidateDetails.drGradingSystem, [Validators.required]),
            drMarks: new FormControl(value.candidateDetails.drMarks, [Validators.required]),
            drSpecialization: new FormControl(value.candidateDetails.drSpecialization, [Validators.required]),
            drUniversity: new FormControl(value.candidateDetails.drUniversity, [Validators.required]),
            drCourse: new FormControl(value.candidateDetails.drCourse, [Validators.required]),
          })
          this.Qualification.push(this.addAllcontrol)
        }
        if (value.pgQualification == 'Masters/Post-Graduation') {
          console.log("working")
          this.candidate.getPgcourses(value.candidateDetails.pgQualification).subscribe((res: any) => {
            this.pgCourse = res;
          })
          this.candidate.getPgSpecial(value.candidateDetails.pgCourse).subscribe((res: any) => {
            this.pgSpe = res;
          })

          this.addAllcontrol = this.fb.group({
            Education: new FormControl(value.pgQualification, [Validators.required]),
            pgQualification: new FormControl(value.candidateDetails.pgQualification, [Validators.required]),
            pgCourseDurationFrom: new FormControl(value.candidateDetails.pgCourseDurationFrom, [Validators.required]),
            pgCourseDurationTo: new FormControl(value.candidateDetails.pgCourseDurationTo, [Validators.required]),
            pgCourseType: new FormControl(value.candidateDetails.pgCourseType, [Validators.required]),
            pgGradingSystem: new FormControl(value.candidateDetails.pgGradingSystem, [Validators.required]),
            pgMarks: new FormControl(value.candidateDetails.pgMarks, [Validators.required]),
            pgSpecialization: new FormControl(value.candidateDetails.pgSpecialization, [Validators.required]),
            pgUniversity: new FormControl(value.candidateDetails.pgUniversity, [Validators.required]),
            pgCourse: new FormControl(value.candidateDetails.pgCourse, [Validators.required]),
          })
          this.Qualification.push(this.addAllcontrol)
        }
        if (value.ugQualification == 'Graduation/Diploma') {
          console.log("working")
          this.candidate.grtUgcou(value.candidateDetails.ugQualification).subscribe((res: any) => {
            this.ugcourse = res;
          })
          this.candidate.ugSepcial(value.candidateDetails.ugCourse).subscribe((res: any) => {
            this.ugSpe = res
          })

          this.addAllcontrol = this.fb.group({
            Education: new FormControl(value.ugQualification, [Validators.required]),
            ugQualification: new FormControl(value.candidateDetails.ugQualification, [Validators.required]),
            ugCourseDurationFrom: new FormControl(value.candidateDetails.ugCourseDurationFrom, [Validators.required]),
            ugCourseDurationTo: new FormControl(value.candidateDetails.ugCourseDurationTo, [Validators.required]),
            ugCourseType: new FormControl(value.candidateDetails.ugCourseType, [Validators.required]),
            ugGradingSystem: new FormControl(value.candidateDetails.ugGradingSystem, [Validators.required]),
            ugMarks: new FormControl(value.candidateDetails.ugMarks, [Validators.required]),
            ugSpecialization: new FormControl(value.candidateDetails.ugSpecialization, [Validators.required]),
            ugUniversity: new FormControl(value.candidateDetails.ugUniversity, [Validators.required]),
            ugCourse: new FormControl(value.candidateDetails.ugCourse, [Validators.required]),
          })
          this.Qualification.push(this.addAllcontrol)
        }
        if (value.hsQualification == 'HSC') {
          console.log("working")
          this.candidate.hsccourse(value.candidateDetails.hsQualification).subscribe((res: any) => {
            this.hscCourse = res
          })
          this.addAllcontrol = this.fb.group({
            Education: new FormControl(value.hsQualification, [Validators.required]),
            hsQualification: new FormControl(value.candidateDetails.hsQualification, [Validators.required]),
            hsBoard: new FormControl(value.candidateDetails.hsBoard, [Validators.required]),
            hsMedium: new FormControl(value.candidateDetails.hsMedium, [Validators.required]),
            hstotalmarks: new FormControl(value.candidateDetails.hstotalmarks, [Validators.required]),
            hsPassedYear: new FormControl(value.candidateDetails.hsPassedYear, [Validators.required]),
          })
          this.Qualification.push(this.addAllcontrol)
        }
        if (value.sslcQualification == 'SSLC') {
          console.log("working")
          this.candidate.hsccourse(value.candidateDetails.sslcQualification).subscribe((res: any) => {
            this.hscCourse = res
          })
          this.addAllcontrol = this.fb.group({
            Education: new FormControl(value.sslcQualification, [Validators.required]),
            sslcQualification: new FormControl(value.candidateDetails.sslcQualification, [Validators.required]),
            sslcBoard: new FormControl(value.candidateDetails.sslcBoard, [Validators.required]),
            sslcMedium: new FormControl(value.candidateDetails.sslcMedium, [Validators.required]),
            sslctotalmarks: new FormControl(value.candidateDetails.sslctotalmarks, [Validators.required]),
            sslcPassedYear: new FormControl(value.candidateDetails.sslcPassedYear, [Validators.required]),
          })
          this.Qualification.push(this.addAllcontrol)
        }
      }
      console.log(res, "working")

    });
  }

  dropdown_disable(val:any){
     if(this.qualification.find((res:any) => res.qualification ==val.get('Education')?.value)){
      console.log("working")
      return false;
     }else{
      console.log("working")
      return false;
     }
  }

}
