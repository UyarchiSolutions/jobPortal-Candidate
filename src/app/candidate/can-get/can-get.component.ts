import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-get',
  templateUrl: './can-get.component.html',
  styleUrls: ['./can-get.component.css']
})
export class CanGetComponent implements OnInit {
  [x: string]: any;
  tab = 0;
  appliedJobs: any = [];
  saveJobs: any = [];
  keySkill: any = [];
  afterSearch: any;
  getAllalerts: any = [];
  getAllNotification: any = [];
  displaycount = 0;
  page = 0;
  pagetotal = 0;
  totalcount = 0;
  searchForm: any = this.fb.group({
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
  setAlertForm: any = this.fb.group({
    currentIndustry: new FormControl(null, [Validators.required]),
    currentDepartment: new FormControl(null, [Validators.required]),
    role_Category: new FormControl(null, [Validators.required]),
    designationSet: new FormControl(null, [Validators.required]),
    keyskillSet: new FormControl(null, [Validators.required]),
    experienceYearSet: new FormControl(null, [Validators.required]),
    experienceMonthSet: new FormControl(null, [Validators.required]),
    salaryFrom: new FormControl(null, [Validators.required]),
    SalaryTo: new FormControl(null, [Validators.required]),
    locationSet: new FormControl(null, [Validators.required]),
    searchalert: new FormControl(null),
    update: new FormControl("advance details")
  })
  datavalues: any;
  jobs: any = [];
  recentData: any = [];
  industry: any = [];
  currentDepartment: any = [];
  course: any = [];
  range: any = 5;
  roles: any = [];
  getLocation: any = [];
  status: any = 'null';
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Industry',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false,
  };
  constructor(private canditSarvice: CanditateService, private fb: FormBuilder, private router: Router, private activateroute: ActivatedRoute) { }


  ngOnInit() {
    this.recentSearch();
    this.activateroute.queryParams.subscribe((res: any) => {
      if (res.tab) {
        this.tab = res.tab;
        this.notification();
      }
      this.searchForm.patchValue({
        searchbox: res.search,
        location: res.location,
        experience: res.experience
      })
    })
    this.get_allJobs();
    this.role(this.range);
    this.getDeparment(this.range);
    this.getEducation(this.range);
    this.getIndustry(this.range);
    this.location();
    this.getAll_industry()
  }
  get_allJobs() {
    this.searchForm.patchValue({
      page: this.page
    })
    this.canditSarvice.getAlldetails(this.searchForm.value).subscribe((res: any) => {
      this.jobs = res.data;
      this.displaycount = this.page;
      this.totalcount = res.count;
      this.pagetotal = Math.ceil(res.count / this.searchForm.get('range')?.value);
      console.log(this.displaycount)
      console.log(this.pagetotal - 1 == this.displaycount, "page")
      this.recentSearch();
    })
  }
  // get department
  getDeparment(range: any) {
    this.canditSarvice.getlimitDepartment(range).subscribe((res: any) => {
      this.currentDepartment = res
    })
  }
  // get Role
  role(range: any) {
    this.canditSarvice.getlimitRole(range).subscribe((res: any) => {
      this.roles = res;
    })
  }
  // get eduction
  getEducation(range: any) {
    this.canditSarvice.getlimitEducation(range).subscribe((res: any) => {
      this.course = res;
    })
  }
  getIndustry(range: any) {
    this.canditSarvice.getlimitIndustry(range).subscribe((res: any) => {
      this.industry = res
    })
  }
  allIndustry: any = [];
  getAll_industry() {
    this.canditSarvice.currentIndustry().subscribe((res: any) => {
      this.allIndustry = res;
    })
  }
  pushCourse(e: any) {
    const data = this.searchForm.get('preferredIndustry')?.value;
    console.log(e);
    data.push(e._id);
  }
  onDeSelect(id: any) {
    const data = this.searchForm.get('preferredIndustry')?.value;
    let i: number = 0;
    data.forEach((item: any) => {
      if (item == id._id) {
        data.splice(i, 1);
        console.log(data, "data------------>")
        return;
      }
      i++;
    })
  }
  // get all location
  location() {
    this.canditSarvice.getLocation().subscribe((res: any) => {
      this.getLocation = res;
    })
  }
  // redirect to employer details
  apply(id: any, tab: any) {
    console.log('workinf')
    this.router.navigate(['/can-employ'], { queryParams: { id: id, tab: tab } })
  }
  // get all jobs
  onClickJop() {
    this.tab = 0
    this.get_allJobs();
  }
  // get all applied
  onClickApplied() {
    console.log("bfhdfhdfb")
    this.tab = 2
    this.canditSarvice.getAppliedJobs(this.status).subscribe((res: any) => {
      this.appliedJobs = res;
    })
  }
  savedJobs() {
    this.tab = 3
    this.canditSarvice.getSavedJob().subscribe((res: any) => {
      this.saveJobs = res;
    })
  }
  // creatr alte
  alert = false;

  jobAlert() {
    this.tab = 4;
    this.canditSarvice.getAlerts().subscribe((res: any) => {
      this.getAllalerts = res;
    }, error => {
      if (error.error.message == 'job alert data not found') {
        this.alert = true;
      } else {
        this.alert = false;
      }
    })
  }
  // notification
  notification() {
    this.tab = 5
    this.canditSarvice.getAllNotification().subscribe((res: any) => {
      this.getAllNotification = res;
      console.log(this.getAllNotification)
    })
  }
  // search
  search() {
    console.log(this.searchForm.get('search')?.value)
    console.log(this.searchForm.get('location')?.valid)
    console.log(this.searchForm.get('experience')?.value)
    console.log(this.searchForm.get('searchbox')?.value, "value")
    // this.searchForm.get('search')?.setValue(this.searchForm.get('searchbox')?.value)
    // if (this.searchForm.get('search')?.valid && this.searchForm.get('location')?.valid && this.searchForm.get('experience')?.valid) {
    this.get_allJobs();
    // }
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

  }
  getKeyskills(value: any) {
    this.canditSarvice.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  checkSkill(event: any, skill: any) {
    this.isDisplay = false;
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
  // location
  // displayPlace($event:any){

  // }
  // recent Search
  recentSearch() {
    this.canditSarvice.getRecentsearch().subscribe((res: any) => {
      this.recentData = res;
    })
  }
  searchdata(value: any) {
    console.log(value, "values")
    // this.searchForm.get('search')?.valid && this.searchForm.get('location')?.valid&& this.searchForm.get('experience')?.valid
    this.canditSarvice.getReacent_data(value).subscribe((res: any) => {
      this.searchForm.patchValue({
        location: res.location,
        experience: res.experience,
        searchbox: res.search,
        search: res.search,
      })
      console.log(res.experience,"search")
      // this.datavalues = res.search
    })
  }
  savesearch() {
    if (this.searchForm.get('search')?.valid && this.searchForm.get('location')?.valid && this.searchForm.get('experience')?.valid) {
      this.canditSarvice.saveSearch(this.searchForm.value).subscribe((res: any) => {
      })
    }
  }
  // get
  save: any = []
  getSaveData() {
    this.canditSarvice.getSave().subscribe((res: any) => {
      console.log(res, "working fine")
      this.save = res
    })
  }
  // saved search data
  savedSearchData(id: any) {
    this.canditSarvice.saveddata(id).subscribe((res: any) => {
      this.searchForm.patchValue({
        location: res.location,
        experience: res.experience
      })
      this.datavalues = res.search

    })
  }
  isshow: any = false
  dispalyedData(data: any) {

    let value = data.target.value.split(",");
    if (data.target.value) {
      this.isshow = true;
    } else {
      this.isshow = false
    }
    if (value.length != 0) {
      if (value[value.length - 1] != null && value[value.length - 1] != '') {
        this.getKeyskills(value[value.length - 1])
      }
    }
    this.setAlertForm.get('keyskillSet')?.setValue(value)
  }
  alretcheckSkill(event: any, skill: any) {
    this.isshow = false;
    let index: any = this.setAlertForm.get('keyskillSet')?.value;
    console.log(skill, "skill")
    if (index.length != 0) {
      console.log(index, "index")
      let value = index.splice([index.length - 1], 1);
      index.push(skill)
      this.setAlertForm.get('keyskillSet')?.setValue(index)
      let search: any = index.toString() + ","
      this.setAlertForm.get('searchalert')?.setValue(search);
    }
  }
  setalert() {
    console.log(this.setAlertForm.value, "gggggg")
    this.canditSarvice.eduction(this.setAlertForm.value).subscribe((res: any) => {
      this.alert = false;
    })
  }
  // advance search
  advanceSearch() {
    this.get_allJobs();
  }

  applynotification(id: any) {
    this.router.navigate(['/mail-details'], { queryParams: { id: id } })
  }

  currentCategory: any = []
  deparmentId: any;
  getroles: any = [];
  changeDeparment(id: any) {
    this.deparmentId = id.target.value
    this.canditSarvice.getCategory(this.deparmentId).subscribe((res: any) => {
      this.currentCategory = res;
    })
  }
  getRole(id: any) {
    this.canditSarvice.getRole(id.target.value).subscribe((res: any) => {
      this.getroles = res
    })
  }
  // reFine the search
  refine = false
  exp() {
    this.refine = true;
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  latitude: any;
  longtitude: any;
  handleAddressChange(address: Address) {
    this.setAlertForm.patchValue({
      locationSet: address.formatted_address
    })
  }
  edit() {
    this.alert = true;
    this.canditSarvice.viewDetails().subscribe((res: any) => {
      this.canditSarvice.getCategory(res.user[0].currentDepartment).subscribe((res: any) => {
        this.currentCategory = res;
      })
      this.canditSarvice.getRole(res.user[0].role_Category).subscribe((res: any) => {
        this.getroles = res
      })
      this.setAlertForm.patchValue({
        searchalert: res.user[0].keyskillSet,
        keyskillSet: res.user[0].keyskillSet,
        currentIndustry: res.user[0].currentIndustry,
        currentDepartment: res.user[0].currentDepartment,
        designationSet: res.user[0].designationSet,
        role_Category: res.user[0].role_Category,
        experienceYearSet: res.user[0].experienceYearSet,
        salaryFrom: res.user[0].salaryFrom,
        locationSet: res.user[0].locationSet
      })
      console.log(this.setAlertForm.get('designationSet').value, "values");

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
    this.get_allJobs();
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
    this.get_allJobs();
  }
  // company type
  postedBy(event: any) {
    const data: any = this.searchForm.get('postedby')?.value
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
    this.get_allJobs();
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
    this.get_allJobs();
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
    this.get_allJobs();
  }
  experienceTo(experience: any) {
    this.searchForm.get('experienceAnotherto')?.setValue(experience.target.value);
    this.get_allJobs();
  }
  experienceFrom(exp: any) {
    this.searchForm.get('experienceAnotherfrom')?.setValue(exp.target.value);
    this.get_allJobs();
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
    this.get_allJobs();
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
    this.get_allJobs();
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
    this.get_allJobs();
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
    this.get_allJobs();
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
    this.get_allJobs();
  }

  filter(value: any) {
    this.status = value;
    this.onClickApplied();
  }
  changeRange(range: any) {
    this.searchForm.patchValue({
      range: range
    })
    this.get_allJobs();
  }
  search_data: any;
  find_value(value: any, type: any) {
    if (type == 'keyskill') {
      let index = this.keySkill.findIndex((a: any) => a.Skill_Title == value);
      let keyskil = '';
      if (index != -1) {
        keyskil = value;
      }
      return value;
    } else if (type == 'workMode') {
      let workmode = value;

      return workmode
    } else if (type == 'department') {
      let index = this.currentDepartment.findIndex((a: any) => a._id == value);
      let department = '';
      if (index != -1) {

        department = this.currentDepartment[index].Department;
      }
      return department;
    } else if (type == 'Salary') {

      let Salary = value;
      return Salary;
    } else if (type == 'companytype') {
      let companytype = value;
      return companytype;
    } else if (type == 'role') {
      let index = this.roles.findIndex((a: any) => a._id == value);
      let role = '';
      if (index != -1) {
        role = this.roles[index].Job_role;
      }
      return role;
    } else if (type == 'education') {
      let index = this.course.findIndex((a: any) => a._id == value);

      let education = '';
      if (index != -1) {
        education = this.course[index].Course;
      }
      return education;
    } else if (type == 'postedby') {
      let posted = value;
      return posted;
    } else if (type == 'preferredIndustry') {
      let index = this.industry.findIndex((a: any) => a._id == value);
      let instries = '';
      if (index != -1) {
        instries = this.industry[index].Industry;
      }
      return instries;
    } else if (type == 'freshness') {
      let fresh = value;
      return fresh;
    } else {
      return '';
    }
  }
  remove_filter(value: any, type: any) {
    if (type == 'keyskill') {
      let skill: any = this.searchForm.get('search')?.value;
      console.log(skill, 'woking lusu')
      let index = skill.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('search')?.value.splice(index, 1);
        let search: any = skill.toString()
        this.searchForm.get('searchbox')?.setValue(search);
      }
    } else if (type == 'workMode') {
      let noticeperiod: any = this.searchForm.get('workmode')?.value;
      let index = noticeperiod.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('workmode')?.value.splice(index, 1);
      }
    } else if (type == 'department') {
      let deparment: any = this.searchForm.get('department')?.value;
      let index = deparment.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('department')?.value.splice(index, 1);
      }
    } else if (type == 'Salary') {
      let salary: any = this.searchForm.get('Salary')?.value;
      let index = salary.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('Salary')?.value.splice(index, 1);
      }
    } else if (type == 'companytype') {
      let salary: any = this.searchForm.get('companytype')?.value;
      let index = salary.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('companytype')?.value.splice(index, 1);
      }
    } else if (type == 'role') {
      let salary: any = this.searchForm.get('role')?.value;
      let index = salary.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('role')?.value.splice(index, 1);
      }
    } else if (type == 'education') {
      let salary: any = this.searchForm.get('education')?.value;
      let index = salary.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('education')?.value.splice(index, 1);
      }
    } else if (type == 'postedby') {
      let salary: any = this.searchForm.get('postedby')?.value;
      let index = salary.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('postedby')?.value.splice(index, 1);
      }
    } else if (type == 'preferredIndustry') {
      let salary: any = this.searchForm.get('preferredIndustry')?.value;
      let index = salary.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('preferredIndustry')?.value.splice(index, 1);
      }
    } else if (type == 'freshness') {
      let salary: any = this.searchForm.get('freshness')?.value;
      let index = salary.findIndex((a: any) => a == value);
      if (index != -1) {
        this.searchForm.get('freshness')?.value.splice(index, 1);
      }
    }
  }
  find_value_exp(expfrom: any) {
    if (expfrom) {
      return expfrom + 'year'
    }
    else {
      return '';
    }
  }
  remove_filter_exp(expfrom: any) {
    this.searchForm.get('experience')?.setValue('')

  }
  find_expfromTo(expfrom: any,expto: any){
    if(expfrom && expto){
      return expfrom+'to'+expto
    }
    else {
      return '';
    }
  }
  remove_filterexpFromto(expfrom:any,expTo:any){
    this.searchForm.get('experienceAnotherfrom')?.setValue(null)
    this.searchForm.get('experienceAnotherto')?.setValue(null)
  }
  pagination(val: any) {
    console.log("sdbsjhdj")
    if (val == 1) {
      console.log("sdbsjhdj")
      this.page = this.page + 1;
      console.log(this.page)
      if (this.tab == 0) {
        this.get_allJobs();
      } else if (this.tab == 1) {
        this.onClickApplied();
      } else if (this.tab == 3) {
        this.savedJobs()
      } else if (this.tab == 4) {
        this.jobAlert()
      } else if (this.tab == 5) {
        this.notification()
      }
    }
    if (val == 0) {
      if (this.page != 0) {
        this.page = this.page - 1;
        console.log(this.page)
        if (this.tab == 0) {
          this.get_allJobs();
        } else if (this.tab == 1) {
          this.onClickApplied();
        } else if (this.tab == 3) {
          this.savedJobs()
        } else if (this.tab == 4) {
          this.jobAlert()
        } else if (this.tab == 5) {
          this.notification()
        }
      }
    }
  }
convertsalary(value:any){
  return value/100000
}
}

