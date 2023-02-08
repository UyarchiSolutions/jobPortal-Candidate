import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-emp-jobdetails',
  templateUrl: './emp-jobdetails.component.html',
  styleUrls: ['./emp-jobdetails.component.css']
})
export class EmpJobdetailsComponent implements OnInit {
  jobDetals: any = [];
  constructor(private candidateService: CanditateService, private activate: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.activate.queryParams.subscribe((res: Params) => {
      this.get_jobDetails(res['id'])
    })
  }
  postedTime(time: any) {
    let date_1 = new Date(time);
    let date_2 = new Date();
    const days = (date_1: any, date_2: any) => {
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
    }
    console.log(days(date_1, date_2) + " days to world cup");
    return days(date_1, date_2)
  }
  // redirect to hompage
  homePage(){
   this.router.navigate(['/canJobs'])
  }
  get_jobDetails(id: any) {
    this.candidateService.getJobs(id).subscribe((res: any) => {
      this.jobDetals = res;
      console.log((this.jobDetals.aboutCompany), "titlenfjdnfjk")
    })
  }
}
