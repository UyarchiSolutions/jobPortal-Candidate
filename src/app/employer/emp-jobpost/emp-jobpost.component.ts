import { Component, OnInit } from '@angular/core';
import { FormGroup,AbstractControl, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Editor, Toolbar } from 'ngx-editor';
import { EmpServiceService } from '../emp-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-emp-jobpost',
  templateUrl: './emp-jobpost.component.html',
  styleUrls: ['./emp-jobpost.component.css']
})
export class EmpJobpostComponent implements OnInit {
  isDisplay = false
  checkedList : any=[];
  jobpostForm:any = this.formBuilder.group({
    jobTittle : new FormControl('', Validators.required),
    jobDescription : new FormControl('', Validators.required),
    keySkill :  new FormControl([], Validators.required),
    salaryRangeFrom : new FormControl(null),
    salaryRangeTo : new FormControl(null),
    experienceFrom : new FormControl(null, Validators.required),
    experienceTo : new FormControl(null, Validators.required),
    interviewType : new FormControl(null, Validators.required),
    candidateDescription : new FormControl('', Validators.required),
    salaryDescription : new FormControl(''),
    urltoApply : new FormControl(''),
    workplaceType : new FormControl(null, Validators.required),
    industry : new FormControl(null, Validators.required),
    preferedIndustry : this.formBuilder.array([], Validators.required),
    jobLocation : new FormControl([], Validators.required),
    location:new FormControl([]),
    employmentType : new FormControl(null, Validators.required),
    openings : new FormControl(''),
    department: new FormControl(null, Validators.required),
    roleCategory: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    interviewstartDate: new FormControl(null, Validators.required),
    interviewendDate: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
    recruiterName:new FormControl(null, [Validators.required,Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]),
    recruiterEmail:new FormControl(null, [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    recruiterNumber:new FormControl(null, Validators.required),
    qualification:this.formBuilder.array([], Validators.required),
    course:this.formBuilder.array([], Validators.required),
    specialization:this.formBuilder.array([], Validators.required),
    searchbox: new FormControl(null,Validators.required),
    apply_method:new FormControl(null,Validators.required),
    recruiterList:new FormControl(null,Validators.required),
    recruiterList1:new FormControl(null,Validators.required),
    venue:new FormControl(null,Validators.required),
    loc:new FormControl(null),
    recruiterId:new FormControl(null,Validators.required)

  });
  job_post(){
    console.log(this.jobpostForm)
    console.log(this.jobpostForm.valid)
    this.submitted = true;
    if(this.jobpostForm.valid){

      var jobForm = new FormData();
      jobForm.append('jobTittle', this.jobpostForm.get('jobTittle')?.value);
      jobForm.append('jobDescription', this.jobpostForm.get('jobDescription')?.value);
      jobForm.append('keySkill', this.jobpostForm.get('keySkill')?.value);
      jobForm.append('educationalQualification', this.jobpostForm.get('educationalQualification')?.value);
      jobForm.append('salaryRangeFrom', this.jobpostForm.get('salaryRangeFrom')?.value);
      jobForm.append('salaryRangeTo', this.jobpostForm.get('salaryRangeTo')?.value);
      jobForm.append('experienceFrom', this.jobpostForm.get('experienceFrom')?.value);
      jobForm.append('experienceTo', this.jobpostForm.get('experienceTo')?.value);
      jobForm.append('interviewType', this.jobpostForm.get('interviewType')?.value);
      jobForm.append('candidateDescription', this.jobpostForm.get('candidateDescription')?.value);
      jobForm.append('salaryDescription', this.jobpostForm.get('salaryDescription')?.value);
      jobForm.append('urltoApply', this.jobpostForm.get('urltoApply')?.value);
      jobForm.append('workplaceType', this.jobpostForm.get('workplaceType')?.value);
      jobForm.append('industry', this.jobpostForm.get('industry')?.value);
      jobForm.append('preferedIndustry', this.jobpostForm.get('preferedIndustry')?.value);
      jobForm.append('jobLocation', this.jobpostForm.get('jobLocation')?.value);
      jobForm.append('employmentType', this.jobpostForm.get('employmentType')?.value);
      jobForm.append('openings', this.jobpostForm.get('openings')?.value);
      jobForm.append('department', this.jobpostForm.get('department')?.value);
      jobForm.append('roleCategory', this.jobpostForm.get('roleCategory')?.value);
      jobForm.append('role', this.jobpostForm.get('role')?.value);
      jobForm.append('interviewstartDate', this.jobpostForm.get('interviewstartDate')?.value);
      jobForm.append('interviewendDate', this.jobpostForm.get('interviewendDate')?.value);
      jobForm.append('startTime', this.jobpostForm.get('startTime')?.value);
      jobForm.append('endTime', this.jobpostForm.get('endTime')?.value);
      jobForm.append('recruiterName', this.jobpostForm.get('recruiterName')?.value);
      jobForm.append('recruiterEmail', this.jobpostForm.get('recruiterEmail')?.value);
      jobForm.append('recruiterNumber', this.jobpostForm.get('recruiterNumber')?.value);
      jobForm.append('qualification', this.jobpostForm.get('qualification')?.value);
      jobForm.append('course', this.jobpostForm.get('course')?.value);
      jobForm.append('specialization', this.jobpostForm.get('specialization')?.value);
      jobForm.append('searchbox', this.jobpostForm.get('searchbox')?.value);
      jobForm.append('apply_method', this.jobpostForm.get('apply_method')?.value);
      jobForm.append('recruiterList', this.jobpostForm.get('recruiterList')?.value);
      jobForm.append('recruiterList1', this.jobpostForm.get('recruiterList1')?.value);
      jobForm.append('venue', this.jobpostForm.get('venue')?.value);
      jobForm.append('recruiterId', this.jobpostForm.get('recruiterId')?.value);





      this.empservice.submitPostAJob(jobForm).subscribe((res:any)=>{
        console.log(res);
        this.jobpostForm.reset();
        if(res){
          var data:any= {
            Tab : 1
          }
          var queryString = new URLSearchParams(data).toString();
          this.router.navigateByUrl('/emp-home?' + queryString);
        }
      })
    }


  }
  keySkill: any;
  latitude:any;
  longtitude:any;
  indus_data: any;
  depart_data: any;
  cat_data:any;
  role_data: any;
  is_new: boolean =false;
  is_list: boolean=false;

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Industry',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownSettings1: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'qualification',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownSettings2: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Course',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  dropdownSettings3: IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'Specialization',
    itemsShowLimit: 3,
    limitSelection: 3,
    allowSearchFilter: true,
    enableCheckAll: false
  };
  qua_data: any;
  pushdata:any;
  coursedata: any;
  spcldata: any;
  courseid: any;
  coursename: any;
  is_open: boolean = false;
  quaid: any;
  is_course: boolean = false;
  quaname: any;
  educationArray:any=[

  ];
  spclname: any;
  pushdata1:any;
  pushdatac:any;
  pushdatacs:any;
  list:any;
  apply_method: any;
  is_new1: boolean = false;
  is_list1: boolean = false;
  roledata: any;
  quadata: any;
  depdata: any;
  inddata: any;
  submitted: boolean = false;
  now: any;
  nowto:any;
  predictions: any=[];
  datatext: any;
  val: any;
  address: any;
  constructor(private formBuilder:FormBuilder,private router: Router,private empservice: EmpServiceService) { }

  ngOnInit(): void {
    const datePipe = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN')
    const time = formatDate(new Date(), 'hh:mm', 'en-IN')
    this.now = datePipe

    this.editor = new Editor();
    this.editorcan = new Editor();
    this.editorsal = new Editor();
    this.get_industry_list()
    this.get_depart()
    this.get_qualification()
    this.get()
  }
  editordoc = '';
  editor!: Editor;
  editorcan!: Editor;
  editorsal!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    ['ordered_list', 'bullet_list'],
    ['link'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  get doc(): AbstractControl {
    return this.jobpostForm.get('jobDescription')?.value;
  }
  get docs(): AbstractControl {
    return this.jobpostForm.get('candidateDescription')?.value;
  }
  get docsa(): AbstractControl {
    return this.jobpostForm.get('salaryDescription')?.value;
  }
  checkFrom(){
    const to = this.jobpostForm.get('interviewstartDate')?.value
    console.log(to)
    const datePipe = formatDate(to, 'yyyy-MM-dd', 'en-IN')
    this.nowto = datePipe
  }
  ngOnDestroy(): void {
    this.editor.destroy();
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
  checkSkill(event: any, skill: any) {
    console.log('checkSkill',skill);
    let index: any = this.jobpostForm.get('keySkill')?.value;
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(skill.Skill_Title)
      this.jobpostForm.get('keySkill')?.setValue(index)
      let search: any = index.toString() + ","
      this.jobpostForm.get('searchbox')?.setValue(search);
      this.isDisplay =false
      console.log(this.jobpostForm.get('searchbox')?.value)
    }
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
    console.log(this.latitude, this.longtitude)
    this.address = address.formatted_address
    // this.val = e.structured_formatting.main_text

    this.jobpostForm.patchValue({
      loc:''
    })
  }
  get_industry_list(){
    this.empservice.get_industry().subscribe((res:any) => {
      console.log(res);
      this.indus_data = res
    })
  }
  get_depart(){
    this.empservice.get_department().subscribe((res:any) => {
      console.log(res);
      this.depart_data = res
    })
  }
  depart(data: any){
    this.empservice.get_category(data.target.value).subscribe((res:any) => {
      console.log(res);
      this.cat_data = res
    })
  }
  cat(data: any){
    this.empservice.get_role(data.target.value).subscribe((res:any) => {
      console.log(res);
      this.role_data = res
    })
  }
  pre(preview:any){
    this.submitted = true
    if(this.jobpostForm.valid){
      preview.click();
      console.log(this.depart_data)
      if(this.jobpostForm.get('role')?.value){
        let index = this.role_data.find((r: any) => r._id == this.jobpostForm.get('role')?.value)
        this.roledata = index.Job_role
        console.log(this.roledata)
      }
      // if(this.jobpostForm.get('qualification')?.value){
      //   let index = this.qua_data.find((r: any) => r._id == this.jobpostForm.get('qualification')?.value)
      //   this.quadata = index.qualification
      // }
      if(this.jobpostForm.get('department')?.value){
        let index = this.depart_data.find((r: any) => r._id == this.jobpostForm.get('department')?.value)
        console.log(this.jobpostForm.get('department')?.value)
        this.depdata = index.Department
          console.log(index,this.depdata)
      }
      if(this.jobpostForm.get('preferedIndustry')?.value){
        let index = this.indus_data.find((r: any) => r._id == this.jobpostForm.get('preferedIndustry')?.value)
        this.inddata = index.Industry
      }
    }


  }
  dispalye(data: any) {
    console.log("lusu")
    let value = data.target.value.split(",");
    console.log(value)
    if (data.target.value) {
      this.isDisplay = true;
    } else {
      this.isDisplay = false
    }
    if (value.length != 0) {
      if (value[value.length - 1] != null && value[value.length - 1] != '') {
        this.getKeyskills(value[value.length - 1])
      }
    }
    this.jobpostForm.get('keySkill')?.setValue(value)
    console.log(this.jobpostForm.get('keySkill')?.value)
  }
  recriterlist1(e:any){
   console.log(e.target.value)
   if(e.target.value == 'list1'){
        this.is_list1 = true;
        this.is_new1 = false;
   }
   else{
        this.jobpostForm.get('recruiterName')?.setValue('');
        this.jobpostForm.get('recruiterEmail')?.setValue('');
        this.jobpostForm.get('recruiterNumber')?.setValue('');
        this.is_new1 = true;
        this.is_list1 = false;
   }
   console.log(this.is_new,this.is_list)
  }
  recriterlist(e:any){
    console.log(e.target.value)
    if(e.target.value == 'list'){
         this.is_list = true;
         this.is_new = false;
         this.jobpostForm.get('recruiterId')?.setErrors({ incorrect: true });
         this.jobpostForm.get('recruiterName')?.setErrors(null);
         this.jobpostForm.get('recruiterEmail')?.setErrors(null);
         this.jobpostForm.get('recruiterNumber')?.setErrors(null);
    }
    else{

         this.jobpostForm.get('recruiterName')?.setValue('');
         this.jobpostForm.get('recruiterEmail')?.setValue('');
         this.jobpostForm.get('recruiterNumber')?.setValue('');
         this.is_new = true;
         this.is_list = false;
         this.jobpostForm.get('recruiterId')?.setErrors(null);
         this.jobpostForm.get('recruiterName')?.setErrors({ incorrect: true });
         this.jobpostForm.get('recruiterEmail')?.setErrors({ incorrect: true });
         this.jobpostForm.get('recruiterNumber')?.setErrors({ incorrect: true });
    }
    console.log(this.is_new,this.is_list)
   }
  pushCourse(e:any){
    const data: FormArray = this.jobpostForm.get('preferedIndustry') as FormArray;
    data.push(new FormControl(e._id))
    console.log(data)

  }
  get_qualification(){
    this.empservice.get_qualification().subscribe((res:any) => {
      console.log(res);
      this.qua_data = res
    })
  }

  DeSelect_putcourse(e:any){
    console.log(e)
    let i: number = 0;
    this.pushdata.forEach((item: any) => {
      if (item == e._id) {
        this.pushdata.removeAt(i);
        return;
      }
      i++;
    });
    this.empservice.get_courses({arr:this.pushdata.value}).subscribe((res:any) => {
      console.log(res)
    })
  }
  putspecial(e:any){
    const data: FormArray = this.jobpostForm.get('course') as FormArray;
    console.log(e)
    data.push(new FormControl(e._id))
    this.spcldata = data
    console.log(data)
    this.empservice.get_specialization({arr:this.spcldata.value}).subscribe((res:any) => {
      this.spcldata = res
      console.log(res)
    })
  }
  put(e:any){

  }
  selectqualificaion(e:any,event:any){
    console.log(event.target.checked)
    if(event.target.checked){
      const data: FormArray = this.jobpostForm.get('qualification') as FormArray;
      data.push(new FormControl(e._id))
      this.pushdata = data
      this.quaid = Array(e._id)
      this.quaname = e.qualification
      console.log("fd",this.quaid,this.quaname)
      this.empservice.get_courses({arr:this.quaid}).subscribe((res:any) => {
        this.coursedata = res[0].allCourses
        this.is_course = true
        console.log(this.coursedata)
      })
    }
    else{
      this.is_course = false
      let i: number = 0;
      this.pushdata.forEach((item: any) => {
        if (item == e._id) {
          this.pushdata.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
  selectcourse(e:any,event:any){
    console.log(e)
    this.courseid = Array(e._id)
    this.coursename = e.Course
    if(event.target.checked){
      const data: FormArray = this.jobpostForm.get('course') as FormArray;
      data.push(new FormControl(e._id))
      this.pushdatac = data
      this.empservice.get_specialization({arr:this.courseid}).subscribe((res:any) => {
      this.spcldata = res
      this.is_open = true
      console.log(res)
      })
    }
    else{
      this.is_open = false
      let i: number = 0;
      this.educationArray.forEach((item: any) => {
        if (item.coursename == this.coursename) {
          this.educationArray.splice(i);
          return;
        }
        i++;
      });

      this.pushdatac.forEach((item: any) => {
        if (item == e._id) {
          this.pushdatac.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.educationArray)

  }
  selectspcl(e:any,event:any){
    this.spclname = e.Specialization

    if(event.target.checked){
      this.educationArray.push(
        {
          coursename:this.coursename,
          spclname: this.spclname
        }
      )
      const data: FormArray = this.jobpostForm.get('specialization') as FormArray;
      data.push(new FormControl(e._id))
      this.pushdatacs = data
    }
    else{
      const filteredPeople = this.educationArray.findIndex((item:any) => item.spclname == this.spclname);
      console.log(filteredPeople)
      this.educationArray.splice(filteredPeople,1);
      console.log(this.educationArray)

      let i: number = 0;
      this.pushdatacs.forEach((item: any) => {
        if (item == e._id) {
          this.pushdatacs.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
  rem(data:any){
    console.log(data)
    const filteredPeople = this.educationArray.findIndex((item:any) => item.coursename == data.coursename &&  item.spclname == data.spclname);
    console.log(filteredPeople)
    this.educationArray.splice(filteredPeople,1);
    console.log(this.educationArray)
  }
  isChecke(data: any) {
    if (this.educationArray.find((a: any) => a.spclname == data)) {
      return true;
    } else {
      return false;
    }
  }
  get(){
    this.empservice.get_recruiter().subscribe((data) =>{
      console.log(data)
      this.list = data
    })
  }
  changerecruiter(data:any){
    console.log(data.target.value)
    this.empservice.getdetails_recruiter(data.target.value).subscribe((data:any) =>{
      this.jobpostForm.patchValue({
        recruiterName:data.recruiterName,
        recruiterEmail:data.email,
        recruiterNumber:data.mobileNumber
      })
    })
  }
  choose_apply(e:any){
      this.apply_method = e.target.value
      if(this.apply_method == 'email'){
        this.jobpostForm.get('recruiterEmail')?.setErrors({ incorrect: true });
        this.jobpostForm.get('recruiterList1')?.setErrors(null);
      }
      if(this.apply_method == 'telephone'){

        this.jobpostForm.get('recruiterEmail')?.setErrors(null);
        this.jobpostForm.get('recruiterList1')?.setErrors({ incorrect: true });

      }
      if(this.apply_method == 'treatjobs'){
        this.jobpostForm.get('recruiterEmail')?.setErrors(null);
        this.jobpostForm.get('recruiterList1')?.setErrors(null);

      }
  }
  MAX_LENGTH = 250;
  somefunction(event:any) {
    console.log("dfgdf")
    if (event.editor.getLength() > this.MAX_LENGTH) {
      event.editor.deleteText(this.MAX_LENGTH, event.editor.getLength());
    }
  }
  isLoc =false
  get_area_location(e:any){
    if(e.target.value){
      var data={
        input:e.target.value
      }
      this.empservice.get_area_location(data).subscribe((data:any) =>{
        console.log(data)
        this.predictions = data.predictions
        this.isLoc = true;
      })
    }
    else{
      this.isLoc = false;
    }

  }
  datas:any=[]
  choose(e:any,location:any){

    if(location){
      this.datas.push(location)
      this.isLoc = false
    }
    this.jobpostForm.patchValue({
      loc:''
    })
    this.jobpostForm.get('jobLocation')?.setValue(this.datas)
    console.log(this.jobpostForm.get('jobLocation')?.valid)
  }
  type:any;
  checkerr_inter(e:any){
    this.type = e.target.value
    if (this.type == 'walk in') {
      this.jobpostForm.get('interviewstartDate')?.setErrors({ incorrect: true });
      this.jobpostForm.get('interviewendDate')?.setErrors({ incorrect: true });
      this.jobpostForm.get('startTime')?.setErrors({ incorrect: true });
      this.jobpostForm.get('endTime')?.setErrors({ incorrect: true });
      this.jobpostForm.get('venue')?.setErrors({ incorrect: true });
      this.jobpostForm.get('recruiterList')?.setErrors({ incorrect: true });
      this.jobpostForm.get('apply_method')?.setErrors(null);
    }
    else{
      this.jobpostForm.get('interviewstartDate')?.setErrors(null);
      this.jobpostForm.get('interviewendDate')?.setErrors(null);
      this.jobpostForm.get('startTime')?.setErrors(null);
      this.jobpostForm.get('endTime')?.setErrors(null);
      this.jobpostForm.get('venue')?.setErrors(null);
      this.jobpostForm.get('recruiterList')?.setErrors(null);
      this.jobpostForm.get('apply_method')?.setErrors({ incorrect: true });
      console.log(this.jobpostForm.get('apply_method')?.valid,"sadsdsd")
    }
  }
  remove_location(data:any){
    let array = this.jobpostForm.get('jobLocation')?.value;
    let i: number = 0;
    array.forEach((item: any) => {
      if (item == data) {
        array.splice(i, 1);
        return;
      }
      i++;
    });
    if(array.length == 0){
      this.isLoc = false
    }
    console.log(array.length)
  }
  get_maintext(data:any){
    console.log(data)
    let text = data.split(',')
    console.log(text[0])
    return text[0]
  }
  onDeSelect(id: any) {
    const data = this.jobpostForm.get('preferedIndustry')?.value;
    let i: number = 0;
    data.forEach((item: any) => {
      if (item == id._id) {
        data.splice(i, 1);
        console.log(data, "data------------>")
        return;
      }
      i++;
    })
  }

}
