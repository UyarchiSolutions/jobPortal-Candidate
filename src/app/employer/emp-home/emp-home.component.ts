import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent implements OnInit {
  data: any;
  applied_data: any;
  keyskills=null;
  location=null;
  anykeywords=null; 
  experiencefrom=null; 
  experienceto=null;
  qualification=null;
  isDisplay=false
  keySkill: any;
  value: any;
  searchForm: any = this.fb.group({
    keyskills: this.fb.array([],[Validators.required]),
    location: new FormControl(null),
    anykeywords: new FormControl(null),
    experiencefrom: new FormControl(null),
    experienceto: new FormControl(null),
    qualification: new FormControl(null)
  })
  constructor(private empservice: EmpServiceService,private fb:FormBuilder) { }
  is_viewpost : boolean = false;
  is_viewapplies : boolean = false;
  is_viewcan:boolean = true;
  ngOnInit(): void {
    this.getJobpostDetails()

  }
  getJobpostDetails(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.data = res.user
      console.log(res);
    })
  }
  current_link(){
    this.is_viewpost = true
    this.is_viewapplies = false
    this.is_viewcan = false
  }
  current_applies(id :any){
    console.log('current_applies',id);
    this.is_viewapplies = true
    this.is_viewpost = false
    this.is_viewcan = false
    this.empservice.view_post(id).subscribe((res:any)=>{
      this.applied_data = res
      console.log(this.applied_data);
    })
  }
  view_post_details(){

  }
  can_list(){
    this.is_viewcan = true
    this.is_viewapplies = false
    this.is_viewpost = false
    this.search();
  }
  search(){
   
      this.empservice.view_can(this.searchForm.value).subscribe((res:any)=>{
        console.log(res);
      })
    
  }
  search_skills(data:any){
    if (data.target.value) {
      this.isDisplay = true;
    } 
    else {
      this.isDisplay = false
    }
    this.getKeyskills(data.target.value)
  }
  getKeyskills(value: any) {
    this.empservice.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  checkSkill(event:any){
    const data: FormArray = this.searchForm.get('keyskills') as FormArray;
    if (event.target.checked) {
      data.push(new FormControl(event.target.value));
      console.log(data)
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
}
