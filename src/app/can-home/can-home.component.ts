import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CanditateService } from '../candidate/canditate.service';
import { CanditService } from '../candit.service';

@Component({
  selector: 'app-can-home',
  templateUrl: './can-home.component.html',
  styleUrls: ['./can-home.component.css']
})
export class CanHomeComponent implements OnInit {
  jobs: any = [];
  searchForm = this.fb.group({
    search:new FormControl([],[Validators.required]),
    experience: new FormControl(null),
    experienceAnotherfrom: new FormControl(null),
    experienceAnotherto: new FormControl(null),
    location: new FormControl(null),
    preferredindustry: new FormControl(null),
    salary: new FormControl(null),
    workmode: new FormControl(null),
    education: new FormControl(null),
    salaryfilter: new FormControl(null),
    role: new FormControl(null),
    freshness: new FormControl(null),
    locationfilter: new FormControl(null),
    companytype: new FormControl(null),
    postedby: new FormControl(null),
    searchbox: new FormControl(null),
  })
  constructor(private canditSarvice: CanditService, private fb: FormBuilder,private candidateService:CanditateService) { }

  ngOnInit() {
    this.getjobS();

  }

  getjobS() {
    this.canditSarvice.jobs(this.searchForm.value).subscribe((res: any) => {
      this.jobs = res.user;
    })
  }
    // get skills
    isDisplay = false;
    dispalye(data: any) {
      console.log("lusu")
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
      this.searchForm.get('search')?.setValue(value)
      console.log(this.searchForm.get('search')?.value,"values")

    }
    // get all skill
    keySkill:any=[];
    getKeyskills(value: any) {
      this.candidateService.getSkill(value).subscribe((res: any) => {
        this.keySkill = res;
      })
    }
    checkSkill(event: any, skill: any) {
      this.isDisplay=false
      let index: any = this.searchForm.get('search')?.value;
      console.log(index,"gfg")
      if (index.length != 0) {
        let value = index.splice([index.length - 1], 1);
        index.push(skill)
        this.searchForm.get('search')?.setValue(index)
        let search: any = index.toString() + ","
        this.searchForm.get('searchbox')?.setValue(search);
      }
    }
    // search
    search(){
      console.log("sdsldlsdmla")
      this.getjobS();
    }
}
