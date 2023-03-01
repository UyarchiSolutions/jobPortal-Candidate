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
    email:new FormControl('noreply-tj@uyarchi.com'),
    subject:new FormControl(null),
    message:new FormControl(null),
    signature:new FormControl(null)
  })
  canArray: any;
  constructor(private empservice: EmpServiceService,private route: ActivatedRoute, private router: Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log(params['candidates']); 
      this.canid=params['candidates'];
      this.canArray = this.canid.split(",")
      console.log(this.canArray);
    }
  );
  this.mailForm.patchValue({
    email:this.mailForm.get('email')?.value
  })

  }
  sendamail(){
    var data={
      candidates:this.canArray,
      subject:this.mailForm.get('subject')?.value,
      signature:this.mailForm.get('signature')?.value,
      email:this.mailForm.get('email')?.value,
      message:this.mailForm.get('message')?.value,
      mail:'mail'
   }
    this.empservice.sendajob(data).subscribe((res:any)=> {
     console.log(res)
     this.mailForm.reset();
    })
  }
}
