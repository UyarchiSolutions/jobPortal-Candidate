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
  searchForm:any = this.fb.group({
    search: new FormControl([]),
    experience: new FormControl(null),
    experienceAnotherfrom: new FormControl(null),
    experienceAnotherto: new FormControl(null),
    Location: new FormControl([]),
    workmode: new FormControl([]),
    department: new FormControl([]),
    education: new FormControl([]),
    role: new FormControl([]),
    freshness: new FormControl([]),
    companytype: new FormControl([]),
    postedby: new FormControl([]),
    preferredIndustry: new FormControl([]),
    Salary: new FormControl([]),
    searchbox: new FormControl(null),
    page: new FormControl(0),
    range: new FormControl(10)
  })
  displaycount = 0;
  page = 0;
  pagetotal = 0;
  totalcount = 0;
  range=5;
  constructor(private canditSarvice: CanditService, private fb: FormBuilder, private candidateService: CanditateService) { }

  ngOnInit() {
    this.getjobS();
    this.role(this.range);
    this.getDeparment(this.range);
    this.getEducation(this.range);
    this.getIndustry(this.range);
    this.location()
  }

  getjobS() {
    this.canditSarvice.jobs(this.searchForm.value).subscribe((res: any) => {
      this.displaycount = this.page;
      this.totalcount = res.count;
      this.pagetotal = Math.ceil(res.count / this.searchForm.get('range')?.value);
      this.jobs = res.user.data;
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
    console.log(this.searchForm.get('search')?.value, "values")

  }
  // get all skill
  keySkill: any = [];
  getKeyskills(value: any) {
    this.candidateService.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  checkSkill(event: any, skill: any) {
    this.isDisplay = false
    let index: any = this.searchForm.get('search')?.value;
    console.log(index, "gfg")
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(skill)
      this.searchForm.get('search')?.setValue(index)
      let search: any = index.toString() + ","
      this.searchForm.get('searchbox')?.setValue(search);
    }
  }
  // search
  search() {
    console.log("sdsldlsdmla")
    this.getjobS();
  }
  // get department
  currentDepartment: any = [];
  getDeparment(range: any) {
    this.candidateService.getlimitDepartment(range).subscribe((res: any) => {
      this.currentDepartment = res
    })
  }
  // get Role
  roles: any = [];
  role(range: any) {
    this.candidateService.getlimitRole(range).subscribe((res: any) => {
      this.roles = res;
    })
  }
  // get eduction
  course: any = [];
  getEducation(range: any) {
    this.candidateService.getlimitEducation(range).subscribe((res: any) => {
      this.course = res;
    })
  }
  industry: any = [];
  getIndustry(range: any) {
    this.candidateService.getlimitIndustry(range).subscribe((res: any) => {
      this.industry = res
    })
  }
  // get all location
  getLocation: any = [];
  location() {
    this.candidateService.getLocation().subscribe((res: any) => {
      this.getLocation = res;
    })
  }
  // check company type
  companyType(event: any) {
    const data: any = this.searchForm.get('companytype')?.value;
    if (event.target.checked) {
      data.push((event.target.value))
      this.searchForm.get('companytype')?.setValue(data)
      console.log(this.searchForm.get('companytype')?.value, "values")
    } else {
      console.log("items")
      let i: number = 0;
      data.forEach((item: any) => {
        console.log(item, "items")
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  // salaryrange
  salaryrange(event: any) {
    const data: any = this.searchForm.get('Salary')?.value;
    console.log(data)
    if (event.target.checked) {
      data.push((event.target.value))
      console.log(data, "dat")
    } else {
      let i: number = 0;
      data.forEach((item: any) => {
        console.log(item, "items")
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  // company type
  postedBy(event: any) {

  }
  EductionDetails(event: any) {
    const data: any = this.searchForm.get('education')?.value;
    if (event.target.checked) {
      data.push((event.target.value))
    } else {
      let i: number = 0;
      data.forEach((item: any) => {
        console.log(item, "items")
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  changeWorkmode(event: any) {
    const data: any = this.searchForm.get('workmode')?.value;
    if (event.target.checked) {
      data.push((event.target.value))
      this.searchForm.get('workmode')?.setValue(data)
      console.log(this.searchForm.get('workmode')?.value, "values")
    } else {
      console.log("items")
      let i: number = 0;
      data.forEach((item: any) => {
        console.log(item, "items")
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  experienceTo(experience: any) {
    this.searchForm.get('experienceAnotherto')?.setValue(experience.target.value);
    this.getjobS();
  }
  experienceFrom(exp: any) {
    this.searchForm.get('experienceAnotherfrom')?.setValue(exp.target.value);
    this.getjobS();
  }
  depatmentFilter(event: any) {
    const data: any = this.searchForm.get('department')?.value;
    if (event.target.checked) {
      data.push((event.target.value))
    } else {
      console.log("items")
      let i: number = 0;
      data.forEach((item: any) => {
        console.log(item, "items")
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  roleChange(event: any) {
    const data: any = this.searchForm.get('role')?.value;
    if (event.target.checked) {
      data.push((event.target.value))
    } else {
      console.log("items")
      let i: number = 0;
      data.forEach((item: any) => {
        console.log(item, "items")
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  industryBy(event: any) {
    const data: any = this.searchForm.get('preferredIndustry')?.value;
    if (event.target.checked) {
      data.push((event.target.value))
    } else {
      console.log("items")
      let i: number = 0;
      data.forEach((item: any) => {
        console.log(item, "items")
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  freshness(event: any) {
    const data: any = this.searchForm.get('freshness')?.value;
    if (event.target.checked) {
      data.push((event.target.value))
    } else {
      let i: number = 0;
      data.forEach((item: any) => {
        if (item == event.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  addLocation(e: any) {
    const data: any = this.searchForm.get('Location')?.value;
    if (e.target.checked) {
      data.push((e.target.value))
      console.log(data, "values")
    } else {
      let i: number = 0;
      data.forEach((item: any) => {
        if (item == e.target.value) {
          data.splice(i, 1);
          return;
        }
        i++;
      });
    }
    this.getjobS();
  }
  changeRange(range: any) {
    this.searchForm.patchValue({
      range: range
    })
    this.getjobS();
  }
  pagination(val: any) {
    console.log("sdbsjhdj")
    if (val == 1) {
      console.log("sdbsjhdj")
      this.page = this.page + 1;
      this.getjobS();

    }
    if (val == 0) {
      if (this.page != 0) {
        this.page = this.page - 1;
        this.getjobS();
      }
    }
  }
  viewmore(val:any){
    this.range=val;
    this.getDeparment(this.range);
  }
}
