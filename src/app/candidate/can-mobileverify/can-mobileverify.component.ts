import { Component, OnInit } from '@angular/core';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-can-mobileverify',
  templateUrl: './can-mobileverify.component.html',
  styleUrls: ['./can-mobileverify.component.css']
})
export class CanMobileverifyComponent implements OnInit {

  constructor(private canditateService: CanditateService) { }

  ngOnInit(): void {
  }
  // sent OTP for
  mobilenumberFns(mobile: any) {
    const a = {
      mobilenumber: mobile
    }
    this.canditateService.verifyMobile(a).subscribe((res: any) => {

    })
  }
}
