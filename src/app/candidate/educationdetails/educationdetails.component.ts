import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-educationdetails',
  templateUrl: './educationdetails.component.html',
  styleUrls: ['./educationdetails.component.css']
})
export class EducationdetailsComponent implements OnInit {
  qualification: any;
  educationForm: any = this.fb.group({

    phaseExecutions: this.fb.group({
      educationArray:this.fb.array([this.addPhase()]),
    }),
  })
  private _fb: any;
  constructor(private fb: FormBuilder, private candidate: CanditateService) { }

  ngOnInit(): void {
  }

  qualifiacation(val: any,index:any) {
    if (this.qualification == 'SSLC') {

      this.educationForm.patchValue({
        sslcQualification: this.qualification
      })
    } else if (this.qualification == 'HSC') {
      // (<FormGroup>this.Qualification.at(index))
      this.educationForm.patchValue({
        hsQualification: this.qualification
      })
    } else if (this.qualification == 'Graduation/Diploma') {
      // (<FormGroup>this.Qualification.at(index))
      this.educationForm.patchValue({
        ugQualification: this.qualification
      })
    } else if (this.qualification == 'Masters/Post-Graduation') {
      // (<FormGroup>this.Qualification.at(index))
      this.educationForm.patchValue({
        pgQualification: this.qualification
      })
    } else if (this.qualification == 'Doctoate/PhD') {
      (<FormGroup>this.Qualification.at(index)).addControl('drCourse',this.fb.control([]));
      this.educationForm.patchValue({
        drQualification: this.qualification
      })
    }
  }
  hasPhaseValue1At(index:any) {
    console.log((<FormGroup>this.Qualification.at(index)).get('drCourse') ? true : false,"dhsdhsdbh")
    return (<FormGroup>this.Qualification.at(index)).get('drCourse') ? true : false;
  }
 get Qualification() {
  // return this.educationForm.controls['educationArray'] as FormArray;
  const control = <FormArray>(
    (<FormGroup>this.educationForm.get('phaseExecutions')).get('educationArray')
  );
  return control;
  }
  addPhase() {
    return this.fb.group({
      // // doctorate
    drQualification: new FormControl('', [Validators.required]),
    drSpecialization: new FormControl('', [Validators.required]),
    drCourseType: new FormControl('', [Validators.required]),
    drCourse: new FormControl('', [Validators.required]),
    drCourseDurationFrom: new FormControl('', [Validators.required]),
    drCourseDurationTo: new FormControl('', [Validators.required]),
    drGradingSystem: new FormControl('', [Validators.required]),
    drMarks: new FormControl('', [Validators.required]),
    // Master
    pgQualification: new FormControl('', [Validators.required]),
    pgCourse: new FormControl('', [Validators.required]),
    pgSpecialization: new FormControl('', [Validators.required]),
    pgCourseType: new FormControl('', [Validators.required]),
    pgCourseDurationFrom: new FormControl('', [Validators.required]),
    pgCourseDurationTo: new FormControl('', [Validators.required]),
    pgGradingSystem: new FormControl('', [Validators.required]),
    pgMarks: new FormControl('', [Validators.required]),
    // UG Course
    ugQualification: new FormControl('', [Validators.required]),
    ugCourse: new FormControl('', [Validators.required]),
    ugSpecialization: new FormControl('', [Validators.required]),
    ugCourseType: new FormControl('', [Validators.required]),
    ugCourseDurationFrom: new FormControl('', [Validators.required]),
    ugCourseDurationTo: new FormControl('', [Validators.required]),
    ugGradingSystem: new FormControl('', [Validators.required]),
    ugMarks: new FormControl('', [Validators.required]),
    // HSC
    hsBoard: new FormControl('', [Validators.required]),
    hsQualification: new FormControl('', [Validators.required]),
    hsPassedYear: new FormControl('', [Validators.required]),
    hsMedium: new FormControl('', [Validators.required]),
    hstotalmarks: new FormControl('', [Validators.required]),
    // ssLc
    sslcQualification: new FormControl('', [Validators.required]),
    sslcBoard: new FormControl('', [Validators.required]),
    sslcPassedYear: new FormControl('', [Validators.required]),
    sslcMedium: new FormControl('', [Validators.required]),
    sslctotalmarks: new FormControl('', [Validators.required]),
    });
  }

  addQualification() {

   return (this.educationForm.get('educationArray') as FormArray).push(this.addPhase());
  }
  submit() {
    this.candidate.updateEduction(this.educationForm.value).subscribe((res: any) => {

    })
  }
}
