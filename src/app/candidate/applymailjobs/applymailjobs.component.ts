import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applymailjobs',
  templateUrl: './applymailjobs.component.html',
  styleUrls: ['./applymailjobs.component.css']
})
export class ApplymailjobsComponent implements OnInit {

  constructor(private activeRouter:ActivatedRoute ) { }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe((res:any) => {

    })
  }

}
