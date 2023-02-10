import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-educationdetails',
  templateUrl: './educationdetails.component.html',
  styleUrls: ['./educationdetails.component.css']
})
export class EducationdetailsComponent implements OnInit {
  qualification: any = [];
  educationForm: any = this.fb.group({
    educationArray: this.fb.array([]),
  })
  drCourse:any=[];
  drsep:any=[];
  pgCourse:any=[];
  pgSpe:any=[];
  ugcourse:any=[];
  ugSpe:any=[];
  hscCourse:any=[];
  sslcspe:any=[];
  userID:any;
  private _fb: any;
  constructor(private fb: FormBuilder, private candidate: CanditateService,private activate:ActivatedRoute) { }

  ngOnInit(): void {
    this.addPhase();
    this.candidate.getQualification().subscribe((res: any) => {
      this.qualification = res;
    })
    this.activate.queryParams.subscribe((res:any) => {
   this.userID=res.id
    })
  }

  qualifiacation(val: any, index: any, phase: any) {
    let allcontrols = ['drQualification', 'drSpecialization', 'drCourseType', 'drCourse', 'drCourseDurationFrom', 'drCourseDurationTo', 'drGradingSystem', 'drMarks', 'pgQualification', 'pgCourse', 'pgSpecialization', 'pgCourseType', 'pgCourseDurationFrom', 'pgCourseDurationTo', 'pgGradingSystem', 'pgMarks', 'ugQualification', 'ugSpecialization', 'ugCourse', 'ugCourseType', 'ugCourseDurationFrom', 'ugCourseDurationTo', 'ugGradingSystem', 'ugMarks', 'hsBoard', 'hsQualification', 'hsPassedYear', 'hsMedium', 'hstotalmarks', 'sslcQualification', 'sslcBoard', 'sslcPassedYear', 'sslcMedium', 'sslctotalmarks']
    let ss: any = {
      'Doctorate/phD': ['drQualification', 'drSpecialization', 'drCourseType', 'drCourse', 'drCourseDurationFrom', 'drCourseDurationTo', 'drGradingSystem', 'drMarks'],
      'Masters/Post-Graduation': ['pgQualification', 'pgCourse', 'pgSpecialization', 'pgCourseType', 'pgCourseDurationFrom', 'pgCourseDurationTo', 'pgGradingSystem', 'pgMarks'],
      'Graduation/Diploma': ['ugCourse', 'ugQualification', 'ugSpecialization', 'ugCourseType', 'ugCourseDurationFrom', 'ugCourseDurationTo', 'ugGradingSystem', 'ugMarks'],
      HSC: ['hsBoard', 'hsQualification', 'hsPassedYear', 'hsMedium', 'hstotalmarks'],
      SSLC: ['sslcQualification', 'sslcBoard', 'sslcPassedYear', 'sslcMedium', 'sslctotalmarks']
    }
    let value = val.target.value;

    allcontrols.forEach((a: any) => {
      <FormArray>phase.removeControl(a)
    })
    ss[value].forEach((a: any) => {
      <FormArray>phase.addControl(a, new FormControl())
    })
    phase.get('Education')?.setValue(value);
    let q = this.qualification.find((data: any) => data.qualification == val.target.value)
    console.log(q._id, "ssss");
    // dr
    if( val.target.value =='Doctorate/phD'){
      phase.get('drQualification')?.setValue(q._id);
      this.candidate.getDrSped().subscribe((res:any) =>{
        this.drCourse=res;
      })
      this.candidate.getdoctorate(q._id).subscribe((res:any) => {
        this.drsep=res
      })
    }
    // pg
    if( val.target.value =='Masters/Post-Graduation'){
      phase.get('pgQualification')?.setValue(q._id);
      this.candidate.getPgcourses(q._id).subscribe((res:any) =>{
        this.pgCourse=res;
      })
      this.candidate.getPgSpecial().subscribe((res:any) =>{
        this.pgSpe=res;
      })
    }
    // ug
    if( val.target.value =='Graduation/Diploma'){
      phase.get('ugQualification')?.setValue(q._id);
      this.candidate.grtUgcou(q._id).subscribe((res:any) => {
        this.ugcourse=res;
      })
      this.candidate.ugSepcial().subscribe((res:any) => {
        this.ugSpe=res
      })
    }
    // hsc
    if( val.target.value =='HSC'){
      phase.get('hsQualification')?.setValue(q._id)
      this.candidate.hsccourse(q._id).subscribe((res:any) => {
        this.hscCourse=res
      })
    }
    // sslc
    if( val.target.value =='SSLC'){
      phase.get('sslcQualification')?.setValue(q._id);
      this.candidate.sslcSpecial(q._id).subscribe((res:any) =>{
        this.sslcspe=res
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
    let data: any = {}
    this.educationForm.get('educationArray').value.forEach((e: any) => {
      data = { ...data, ...e }
    })
    delete data.Education;
    console.log(data)
    this.candidate.educationDetail(data).subscribe((res: any) => {
    })
  }
}
