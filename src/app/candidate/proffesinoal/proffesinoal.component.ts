import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private fb: FormBuilder, private candidateservice: CanditateService,private router:Router) { }

  ngOnInit(): void {
    this.candidateservice.currentIndustry().subscribe((res: any) => {
      this.industry = res;
    })
    this.candidateservice.currentDepartment().subscribe((res: any) => {
      this.currentDepartment = res;
    })
  }
  currentCategory: any = []
  changeDeparment(id: any) {
    this.candidateservice.getCategory(id.target.value).subscribe((res: any) => {
      this.currentCategory = res;
    })
  }
  getRole(id: any) {
    this.candidateservice.getRole(id.target.value).subscribe((res: any) => {
      this.getroles = res
    })
  }
  updateProfile() {
    const formdata=new FormData();

    formdata.append('industry',this.proffesonalForm.get('industry')?.value)
    formdata.append('department',this.proffesonalForm.get('department')?.value)
    formdata.append('roleCategory',this.proffesonalForm.get('roleCategory')?.value)
    formdata.append('role',this.proffesonalForm.get('role')?.value)
    this.candidateservice.updateEduction(formdata).subscribe((res: any) => {

    })
  }
}
