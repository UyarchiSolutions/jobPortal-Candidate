import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { CanditService } from '../candit.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  idShow=false;
  userNAme:any;
  constructor(private canditService:CanditService,private router:Router) {

   }

  ngOnInit() {
   this.userNAme =  localStorage.getItem('name')
   if(!Cookie.get('tokens')){
    this.idShow=false;
   }else{
    this.idShow=true
   }
    this.canditService.get_token.subscribe((res:any) => {
      if(res){
        this.idShow=true
      }else{
        this.idShow=false
      }

    })
    this.canditService.name.subscribe((res:any) => {
      console.log(res,"sdslkdlksnfjksnfjkn")
      this.userNAme=res
    })
  }
  logOut(){
    Cookie.deleteAll();
    localStorage.clear()
   this.router.navigate(['/canlogin'])
   this.idShow=false;
  }
}
