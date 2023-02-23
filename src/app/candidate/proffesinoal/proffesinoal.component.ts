import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-proffesinoal',
  templateUrl: './proffesinoal.component.html',
  styleUrls: ['./proffesinoal.component.css']
})
export class ProffesinoalComponent implements OnInit {
  proffesonalForm: any = this.fb.group({
    industry: new FormControl(null, Validators.required),
    department: new FormControl(null, Validators.required),
    roleCategory: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required)
  })
  industry: any = [];
  currentDepartment: any = [];
  getroles: any = []
  userId: any;
  viewAll: any = [];
  isSubmit=false;
  constructor(private fb: FormBuilder, private candidateservice: CanditateService, private router: Router, private activaterouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.candidateservice.currentIndustry().subscribe((res: any) => {
      this.industry = res;
    })
    this.candidateservice.currentDepartment().subscribe((res: any) => {
      this.currentDepartment = res;
    })
    this.activaterouter.queryParams.subscribe((res: any) => {
      this.userId = res.id;
      // if (this.userId) {
      this.getAlldata()
      // }
    })
  }
  getAlldata() {
    this.candidateservice.viewDetails().subscribe((res: any) => {
      this.viewAll = res.user[0].candidateDetails;
      console.log(this.viewAll.keyskill, "key skill")
      this.proffesonalForm.patchValue({
        industry: this.viewAll.industry,
        department: this.viewAll.department,
        roleCategory: this.viewAll.roleCategory,
        role: this.viewAll.role,
        // languages: this.fb.array([]),
      })
      this.candidateservice.getCategory(this.viewAll.department).subscribe((res: any) => {
        this.currentCategory = res;
        console.log(this.currentCategory)
      })
      this.candidateservice.getRole(this.viewAll.roleCategory).subscribe((res: any) => {
        this.getroles = res
      })
    })
  }
  currentCategory: any = []
  deparmentId: any;
  changeDeparment(id: any) {
    this.deparmentId = id.target.value
    this.candidateservice.getCategory(this.deparmentId).subscribe((res: any) => {
      this.currentCategory = res;
    })
  }
  getRole(id: any) {
    this.candidateservice.getRole(id.target.value).subscribe((res: any) => {
      this.getroles = res
    })
  }
  updateProfile() {
    this.isSubmit=true;
    const formdata = new FormData();

    formdata.append('industry', this.proffesonalForm.get('industry')?.value)
    formdata.append('department', this.proffesonalForm.get('department')?.value)
    formdata.append('roleCategory', this.proffesonalForm.get('roleCategory')?.value)
    formdata.append('role', this.proffesonalForm.get('role')?.value)
    if (this.proffesonalForm.valid) {
      this.candidateservice.updateEduction(formdata).subscribe((res: any) => {
        this.router.navigate(['/viewprofile'])
        this.isSubmit=false;
      })
    }
  }
}
