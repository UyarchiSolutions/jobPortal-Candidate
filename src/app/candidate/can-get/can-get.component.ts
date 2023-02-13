import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-get',
  templateUrl: './can-get.component.html',
  styleUrls: ['./can-get.component.css']
})
export class CanGetComponent implements OnInit {
  tab = 0;
  appliedJobs: any = [];
  saveJobs: any = [];
  keySkill: any;
  afterSearch: any;
  getAllalerts:any=[];
  searchForm = this.fb.group({
    experience: new FormControl(null, [Validators.required]),
    search: this.fb.array([], [Validators.required]),
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

  })
  setAlertForm = this.fb.group({
    designationSet: new FormControl(null, [Validators.required]),
    keyskillSet: this.fb.array([], [Validators.required]),
    experienceYearSet: new FormControl(null, [Validators.required]),
    experienceMonthSet: new FormControl(null, [Validators.required]),
    locationSet: new FormControl(null, [Validators.required]),
  })
  datavalues: any;
  jobs: any = [];
  recentData: any = [];
  constructor(private canditSarvice: CanditateService, private fb: FormBuilder, private router: Router) { }


  ngOnInit() {
    this.get_allJobs();
    this.recentSearch();
    this.getSaveData()
  }
  get_allJobs() {
    this.canditSarvice.getAlldetails(this.searchForm.value).subscribe((res: any) => {
      this.jobs = res;
      this.recentSearch();
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
  jobAlert() {
    this.tab = 4;
    this.canditSarvice.getAlerts().subscribe((res:any) => {
     this.getAllalerts=res;
    })
  }
  // notification
  notification() {
    this.tab = 5
  }
  // search
  search() {
    console.log(this.searchForm.get('search')?.valid)
    console.log(this.searchForm.get('location')?.valid)
    console.log(this.searchForm.get('experience')?.value)

    // if (this.searchForm.get('search')?.valid && this.searchForm.get('location')?.valid && this.searchForm.get('experience')?.valid) {
    this.get_allJobs();


    // }
  }
  // get skills
  isDisplay = false;
  dispalye(data: any) {
    console
    if (data.target.value) {
      this.isDisplay = true;
      console.log(data.target.value, "valuesmdkjfjdhj")
    } else {
      this.isDisplay = false
      console.log(data.target.value, "not  valuesmdkjfjdhj")
    }
    this.getKeyskills(data.target.value)
  }
  getKeyskills(value: any) {
    this.canditSarvice.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  checkSkill(event: any) {

    const data: FormArray = this.searchForm.get('search') as FormArray;
    if (event.target.checked) {
      data.push(new FormControl(event.target.value));
      console.log(data.value, "val")
      this.datavalues = data.value;
    } else {
      let i: number = 0;
      data.controls.forEach((item: any) => {
        if (item == event.target.value) {
          data.removeAt(i);
          return;
        }
        i++;
      });
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
        experience: res.experience
      })
      this.datavalues = res.search
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
  alretcheckSkill(event: any) {
    const data: FormArray = this.setAlertForm.get('keyskillSet') as FormArray;
    if (event.target.checked) {
      data.push(new FormControl(event.target.value));
      console.log(data.value, "val")
      this.datavalues = data.value;
    } else {
      let i: number = 0;
      data.controls.forEach((item: any) => {
        if (item == event.target.value) {
          data.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  setalert() {
    this.canditSarvice.educationDetail(this.setAlertForm.value).subscribe((res: any) => {

    })
  }
  // advance search
  advanceSearch() {
    this.get_allJobs();
  }
  searchfilter(val: any) {
    const data: FormArray = this.searchForm.get('search') as FormArray;
    if (val == 'search') {
      (this.searchForm.controls['search']).clear();
      this.datavalues = [];

    }
    if (val == 'location') {
      this.searchForm.get('location')?.setValue(null)
    }
    if (val == 'experience') {
      this.searchForm.get('experience')?.setValue(null)
    }
  }
  applynotification(id:any){
  this.router.navigate(['/'])
  }
}

