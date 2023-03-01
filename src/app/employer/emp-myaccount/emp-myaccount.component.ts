import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Env } from 'src/app/environment.dev';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-myaccount',
  templateUrl: './emp-myaccount.component.html',
  styleUrls: ['./emp-myaccount.component.css']
})
export class EmpMyaccountComponent implements OnInit {
  data: any;
  viewproduct: any;
  name: any;
  lat: any;
  long: any;
  zoom = 17;
  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService) { }
  // transform(url: any) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }
  ngOnInit(): void {
    this.getBasicDetailsView()
  }
  getBasicDetailsView(){
    console.log('gbh');
    this.empservice.viewBasicDetailsEmployee().subscribe((res:any)=>{
      this.data = res.user
      this.lat = Number(this.data.lat)
      this.long = Number(this.data.long)
      console.log(this.lat, this.long)
      console.log(this.data,"this.data")
    })
  }
  baseurl = Env.baseAPi;
  // viewproduct_details(item: any,name:any) {
  //   this.viewproduct = item;
  //   this.name= name
  //   console.log(this.baseurl + '/' + item,'asdas');
  // }
}
