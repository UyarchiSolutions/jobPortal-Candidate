import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../emp-service.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {
  canid: any;
  mailForm:any = this.fb.group({
    email:new FormControl(null),
    subject:new FormControl(null),
    message:new FormControl(null),
    signature:new FormControl(null)
  })
  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params['candidates']); 
      this.canid=params['candidates'];
    }
  );
  }
  sendamail(){
    var data={
      candidates:Array(this.canid),
      subject:this.mailForm.get('subject')?.value,
      signature:this.mailForm.get('signature')?.value,
      email:this.mailForm.get('email')?.value,
      message:this.mailForm.get('message')?.value
   }
    this.empservice.sendajob(data).subscribe((res:any)=> {
     console.log(res)
    })
  }
}
