import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-get',
  templateUrl: './can-get.component.html',
  styleUrls: ['./can-get.component.css']
})
export class CanGetComponent implements OnInit {
  searchForm = this.fb.group({
    search: new FormControl(null),
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
  jobs:any=[];
  constructor(private canditSarvice: CanditateService, private fb: FormBuilder,private router:Router) { }


  ngOnInit(){
    this.get_allJobs();
  }
  get_allJobs(){
    this.canditSarvice.getAlldetails(this.searchForm.value).subscribe((res:any) =>{
    this.jobs=res;
    })
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
  apply(id:any){
   this.router.navigate(['/can-employ'],{queryParams:{id:id}})
  }
}
