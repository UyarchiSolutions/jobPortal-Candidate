import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CanditService } from '../candit.service';

@Component({
  selector: 'app-can-home',
  templateUrl: './can-home.component.html',
  styleUrls: ['./can-home.component.css']
})
export class CanHomeComponent implements OnInit {
  jobs: any = [];
  searchForm = this.fb.group({
    search: this.fb.array([],[Validators.required]),
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

  })
  constructor(private canditSarvice: CanditService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getjobS();

  }
  postedTime(time:any){
    let date_1 = new Date(time);
    let date_2 = new Date();
    const days = (date_1:any, date_2:any) => {
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
    }
    console.log(days(date_1, date_2) + " days to world cup");
    return days(date_1, date_2)
  }
  getjobS() {
    this.canditSarvice.jobs(this.searchForm.value).subscribe((res: any) => {
      this.jobs = res.user;
    })
  }
}
