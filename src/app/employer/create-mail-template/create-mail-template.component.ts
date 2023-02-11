import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { EmpServiceService } from '../emp-service.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-create-mail-template',
  templateUrl: './create-mail-template.component.html',
  styleUrls: ['./create-mail-template.component.css']
})
export class CreateMailTemplateComponent implements OnInit {
  mailForm:any = this.fb.group({
    jobTittle : new FormControl('', Validators.required),
    templateName: new FormControl('', Validators.required),
    salaryRangeFrom : new FormControl('', Validators.required),
    salaryRangeTo : new FormControl('', Validators.required),
    experienceFrom : new FormControl('', Validators.required),
    experienceTo : new FormControl('', Validators.required),
    keySkill : this.fb.array([], Validators.required),
    jobDescription : new FormControl('', Validators.required),
    signature: new FormControl('', Validators.required),
    jobortemplate: new FormControl('template', Validators.required),
    jobLocation : new FormControl('', Validators.required),
    
  })
  latitude: any;
  longtitude: any;
  isDisplay = false
  keySkill: any;

  constructor(private empservice: EmpServiceService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.editor = new Editor();
  }
  editordoc = '';
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    ['link'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  get doc(): AbstractControl {
    return this.mailForm.get('job_description')?.value;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };
  handleAddressChange(address: Address) {
    console.log(address);
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    this.latitude = address.geometry.location.lat();
    this.longtitude = address.geometry.location.lng();
    this.mailForm.patchValue({
      jobLocation:address.formatted_address
    })
  }
  search_skills(data:any){
    if (data.target.value) {
      this.isDisplay = true;
    } 
    else {
      this.isDisplay = false
    }
    this.getKeyskills(data.target.value)
  }
  getKeyskills(value: any) {
    this.empservice.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  checkSkill(event:any){
    const data: FormArray = this.mailForm.get('keySkill') as FormArray;
    if (event.target.checked) {
      data.push(new FormControl(event.target.value));
      console.log(data)
    } else {
      let i: number = 0;
      data.controls.forEach((item: any) => {
        if (item == event.target.value) {
          data.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submit(){
    this.empservice.submitPostAJob(this.mailForm.value).subscribe((res:any)=>{
      
    })
  }
}
