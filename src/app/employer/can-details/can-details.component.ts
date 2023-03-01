import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-can-details',
  templateUrl: './can-details.component.html',
  styleUrls: ['./can-details.component.css']
})
export class CanDetailsComponent implements OnInit {
  id: any;
  candidate_data: any;
  send_value: any;
  is_open: boolean = false;
  data: any;
  is_new: boolean = false;
  is_old:boolean = false;
  folderName: any;
  folder_list: any;
  folderForm:any = this.fb.group({
    folderName:new FormControl(null)
  })
  jobid: any;
  submitted = false
  err:any
  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params['id']); 
      this.id=params['id'];
      // this.jobid=params['job'];
      this.get_candidate_details(this.id)
    }
  );
  this.getJobpostDetails()
  this.get_folder_list()
  }
  get_candidate_details(id:any){
    this.empservice.get_candidate_id(id).subscribe((res:any)=>{
      this.candidate_data = res[0]
      console.log( this.candidate_data.workStatus);
      // this.folderForm.patchValue({
      //   folderName:this.folderName
      // })
    })
  }
  send(e:any){
    console.log(e.target.value)
     this.send_value = e.target.value;
     if(this.send_value == 'send mail'){
      var data: any ={
        candidates:Array(this.id)
      }
      var queryString = new URLSearchParams(data).toString();
      this.router.navigateByUrl('/sendMail?'+queryString);
     }
     if(this.send_value == 'send job'){
       var data: any ={
        candidates:Array(this.id)
      }
      var queryString = new URLSearchParams(data).toString();
      this.router.navigateByUrl('/sendJob?'+queryString);
     }
   
  }
  getJobpostDetails(){
    this.empservice.myjobPost().subscribe((res:any)=>{
      this.data = res.user
      console.log(res.user);
    })
  }
  save_folder(){
    this.is_new = true;
    this.is_old = false;
    this.folderForm.patchValue({
      folderName:''
    })
 }
 create_new_folder(clk:any){
  
  if(this.folderForm.get('folderName').value){
    var data={
      candidateId:Array(this.id),
      folderName:this.folderForm.get('folderName').value
    }
    console.log(data)
    this.empservice.create_folder(data).subscribe((res:any)=>{
      clk.click();
      this.folderForm.reset();
     this.get_folder_list();
      console.log(res);
    })
  }
 
  
 }
 exis_fold(){
   this.is_new = false;
    this.is_old = true;
 }
 get_folder_list(){
   this.empservice.get_folder_list().subscribe((res:any)=>{
     console.log(res);
    this.folder_list = res.user
   })
 }

 open_folder(e:any,createpopup:any,savepopup:any){
    if(e.target.value == 'add'){
      this.is_new = true;
      this.is_old = false;
      createpopup.click();
      
    }
    else{
      this.is_old = true;
      this.is_new = false;
      savepopup.click();
      this.folderForm.patchValue({
        folderName:e.target.value
      })
    }
  }
  
  redirectto_job(data:any){
    var data: any ={
      candidates:Array(this.id),
      jobId:data._id,
    }
    var queryString = new URLSearchParams(data).toString();
    this.router.navigateByUrl('/sendJob?'+queryString);
  }
  save_candidate(){
    var data: any ={
      candidateId:Array(this.id)
    }
    this.empservice.saved_can(data).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
