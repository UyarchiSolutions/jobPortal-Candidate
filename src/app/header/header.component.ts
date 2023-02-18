import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { CanditService } from '../candit.service';
import { EmpServiceService } from '../employer/emp-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  idShow=false;
  empshow = false;
  userNAme:any;
  logo=false
  empusername: any;

  constructor(private canditService:CanditService,private router:Router,private empservice: EmpServiceService) {

  }

  ngOnInit() {
   this.userNAme =  localStorage.getItem('name')
   this.empusername =  localStorage.getItem('empname')
   if(!Cookie.get('tokens')){
    this.idShow=false;
    }else{
    this.idShow=true
    }
   if(!Cookie.get('emptoken')){
    this.empshow=false;
   }else{
    this.empshow=true
   }
    this.canditService.get_token.subscribe((res:any) => {
      if(res){
        this.idShow=true
      }else{
        this.idShow=false
      }

    })
    this.empservice.get_token.subscribe((res:any) => {
      if(res){
        this.empshow=true
      }else{
        this.empshow=false
      }

    })
    this.canditService.name.subscribe((res:any) => {
      console.log(res,"sdslkdlksnfjksnfjkn")
      this.userNAme=res
    })

    this.empservice.name.subscribe((res:any) => {
      console.log(res,"sdslkdlksnfjksnfjkn")
      this.empusername=res
    })
  }
  logOut(){
    Cookie.deleteAll();
    localStorage.clear()
   this.router.navigate(['/canlogin'])
   this.idShow=false;
  }
  emplogOut(){
    Cookie.deleteAll();
    localStorage.clear()
   this.router.navigate(['/login'])
   this.empshow=false;
  }
}
