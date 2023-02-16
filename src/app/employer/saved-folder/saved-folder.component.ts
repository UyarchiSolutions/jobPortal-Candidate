import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-saved-folder',
  templateUrl: './saved-folder.component.html',
  styleUrls: ['./saved-folder.component.css']
})
export class SavedFolderComponent implements OnInit {
  list: any;
  editForm:any = this.fb.group({
    folderName:new FormControl('', Validators.required)
  })
  oldName: any;
  listdata: any;
  constructor(private empservice: EmpServiceService,private fb:FormBuilder, private router: Router,) { }

  ngOnInit(): void {
    this.get_all_saved_folder()
  }
  get_all_saved_folder(){
    this.empservice.get_all_saved_folder().subscribe((res:any)=>{
      console.log(res);
      this.list = res.user
      
    })
  }
  edit(list:any){
    console.log(list);
    this.oldName = list.folderName
    this.editForm.patchValue({
      folderName:list.folderName
    })
  }
  create_new_folder(){
    var data={
      folderName:this.oldName,
      newfoldername: this.editForm.get('folderName').value
    }
    this.empservice.edit_folder(data).subscribe((res:any)=>{
      console.log(res);
      this.get_all_saved_folder()
  
    })
  }
  open(list:any){
    console.log(list);
     this.listdata = list
  }
  delete(){
    this.empservice.delete_folder(this.listdata.userId,this.listdata.folderName).subscribe((res:any)=>{
      console.log(res);
      this.get_all_saved_folder()
    })
  }
}
