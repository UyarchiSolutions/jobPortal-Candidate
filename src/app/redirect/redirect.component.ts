import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  id: any;
  constructor(private activateRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activateRouter.queryParams.subscribe((res: any) => {
      this.id = res['mailId'];
      console.log(this.id,'Redirect')
      localStorage.setItem('a',"paithyam")
      if(Cookie.get('tokens')){
       this.router.navigate(['mail-details'],{queryParams:{id:this.id}})
        }else{
          this.router.navigate(['canlogin'],{queryParams:{id:this.id}})
        }
    })

  }

}
