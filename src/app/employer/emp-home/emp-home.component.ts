import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent implements OnInit {
  data: any;
  applied_data: any;
  isDisplay=false
  keySkill: any;
  value: any;
  searchForm: any = this.fb.group({
    keyskills: this.fb.array([],[Validators.required]),
    location: new FormControl(null),
    anykeywords: new FormControl(null),
    experiencefrom: new FormControl(null),
    experienceto: new FormControl(null),
    experience: new FormControl(null),
    qualification: new FormControl(null)
  })
  activeform:any = this.fb.group({
    active: new FormControl(true)

  })
  can_data: any;
  rcnt_data: any;
  is_icon: boolean = false;
  is_search_icon: boolean = true;
  save_search_data: any;
  listArray:any=[];
  canid: any;
  constructor(private empservice: EmpServiceService,private fb:FormBuilder, private router: Router,) { }
  is_viewpost : boolean = false;
  is_viewapplies : boolean = false;
  is_viewcan:boolean = true;
  is_icon1 = false;
  ngOnInit(): void {
    this.getJobpostDetails()
    this.get_can()
    this.recent_search()
    this.get_save_search()
    this.get_course_list()
  }
  getJobpostDetails(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.data = res.user
      console.log(res.user);
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
    this.is_icon = true
    this.is_search_icon = false
    this.search();
  }
  get_can(){
    this.empservice.view_can(this.searchForm.value).subscribe((res:any)=>{
      console.log(res);
     this.can_data = res.user
    })
  }
  search(){
    console.log('search',this.searchForm.value);
      if(this.searchForm.get('keyskills')?.valid && this.searchForm.get('location')?.valid && this.searchForm.get('experience')?.valid){
        this.empservice.view_can(this.searchForm.value).subscribe((res:any)=>{
          console.log(res);
         this.can_data = res.user
         this.recent_search()
        //  this.searchForm.reset();
        })
      }
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
  recent_search(){
    this.empservice.rcnt_search().subscribe((res: any) => {
      this.rcnt_data = res
      console.log(res);
    })
  }
  get_recnt_search(id:any){
    this.empservice.get_rcnt_search(id).subscribe((res: any) => {
      this.is_icon = true
      this.is_search_icon = false
      console.log(res.keyskills)
      this.searchForm.patchValue({
        location: res.location,
        experience: res.experience
      })
    })
  }
  save_search(){
    if(this.searchForm.get('keyskills')?.valid && this.searchForm.get('location')?.valid && this.searchForm.get('experience')?.valid){
      this.is_icon1 = true;
      this.is_icon = false;
      this.is_search_icon = false;
      this.empservice.save_search(this.searchForm.value).subscribe((res:any)=>{
        console.log(res)
        this.get_save_search();
      })
    }
  }
 get_save_search(){
  this.empservice.get_save_search().subscribe((res:any)=>{
    console.log(res)
    this.save_search_data = res
  })
 }
 change_status(id:any,e:any){
  console.log(id,e.target.checked)
  this.empservice.change_status(id,this.activeform.value).subscribe((res:any)=>{
    this.getJobpostDetails()
    console.log(res)
  })
 }
 canId(event:any){
    if (event.target.checked) {
      this.listArray.push(event.target.value);
    } else {
      let i: number = 0;
      this.listArray.forEach((item: any) => {
        if (item == event.target.value) {
          this.listArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.listArray)
   
 }
 send(id:any){
  var data: any ={
    mailId:id,
    candidates:this.listArray
  }
  var queryString = new URLSearchParams(data).toString();
  this.router.navigateByUrl('/can-details?'+queryString);

 }
 get_course_list(){
  this.empservice.get_course_list().subscribe((res:any)=>{
    console.log(res)
  })
 }

}