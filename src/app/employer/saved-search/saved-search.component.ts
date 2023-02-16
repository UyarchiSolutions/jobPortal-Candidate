import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-saved-search',
  templateUrl: './saved-search.component.html',
  styleUrls: ['./saved-search.component.css']
})
export class SavedSearchComponent implements OnInit {
  list: any;
  listdata: any;

  constructor(private empservice: EmpServiceService,private fb:FormBuilder, private router: Router,) { }

  ngOnInit(): void {
    this.get_savedsearch()
  }

  get_savedsearch(){
    this.empservice.get_all_savedsearch().subscribe((res:any)=>{
      this.list = res.user
      console.log(res);
    })
  }
  open(list:any){
    console.log(list)
    this.listdata = list
  }
  delete(){
    var data={
      candidateId:Array(this.listdata._id)
    }
    this.empservice.delete_search(data).subscribe((res:any)=>{
      console.log(res);
      this.get_savedsearch()
    })
  }
}
