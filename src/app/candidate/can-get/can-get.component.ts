import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  keySkill: any;
  afterSearch: any;
  getAllalerts: any = [];
  getAllNotification: any = [];
  searchForm: any = this.fb.group({
    experience: new FormControl(null, [Validators.required]),
    search: new FormControl([], [Validators.required]),
    experienceAnotherfrom: new FormControl(null),
    experienceAnotherto: new FormControl(null),
    location: new FormControl(null, [Validators.required]),
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
  })
  datavalues: any;
  jobs: any = [];
  recentData: any = [];
  industry: any = [];
  currentDepartment: any = [];
  course: any = [];
  constructor(private canditSarvice: CanditateService, private fb: FormBuilder, private router: Router, private activateroute: ActivatedRoute) { }


  ngOnInit() {

    this.recentSearch();
    this.getSaveData();
    this.getCourse()
    this.canditSarvice.currentIndustry().subscribe((res: any) => {
      this.industry = res;
    })
    this.canditSarvice.currentDepartment().subscribe((res: any) => {
      this.currentDepartment = res;
    })
    this.activateroute.queryParams.subscribe((res: any) => {
      if (res.tab) {
        this.tab = res.tab;
        this. notification();
      }

      this.searchForm.patchValue({
        searchbox: res.search,
        location: res.location,
        experience: res.experience
      })
    })
    this.get_allJobs();
  }
  get_allJobs() {
    this.canditSarvice.getAlldetails(this.searchForm.value).subscribe((res: any) => {
      this.jobs = res;
      this.recentSearch();
    })
  }
  getCourse() {
    this.canditSarvice.courseAll().subscribe((res: any) => {
      this.course = res;
    })
  }
  postedTime(time: any) {
    let date_1 = new Date(time);
    let date_2 = new Date();
    const days = (date_1: any, date_2: any) => {
      let difference = date_2.getTime() - date_1.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
    }
    return days(date_1, date_2)
  }
  // redirect to employer details
  apply(id: any) {
    console.log('workinf')
    this.router.navigate(['/can-employ'], { queryParams: { id: id } })
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
    this.canditSarvice.getAppliedJobs().subscribe((res: any) => {
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
    this.isDisplay=false;
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
        searchbox: res.search
      })
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
    console.log("mental")
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
    this.canditSarvice.educationDetail(this.setAlertForm.value).subscribe((res: any) => {
      this.alert = false;
    })
  }
  // advance search
  advanceSearch() {
    this.get_allJobs();
  }
  searchfilter(val: any) {
    // const data: FormArray = this.searchForm.get('search') as FormArray;
    // if (val == 'search') {
    //   (this.searchForm.controls['search']).clear();
    //   this.datavalues = [];

    // }
    // if (val == 'location') {
    //   this.searchForm.get('location')?.setValue(null)
    // }
    // if (val == 'experience') {
    //   this.searchForm.get('experience')?.setValue(null)
    // }
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

  }
  // salaryrange
  salaryrange(event: any) {

  }
  // company type
  postedBy(event: any) {

  }
  EductionDetails(event: any) {

  }
}

