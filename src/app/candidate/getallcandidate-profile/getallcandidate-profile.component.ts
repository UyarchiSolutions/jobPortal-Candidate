import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-getallcandidate-profile',
  templateUrl: './getallcandidate-profile.component.html',
  styleUrls: ['./getallcandidate-profile.component.css']
})
export class GetallcandidateProfileComponent implements OnInit {
  getAlldetails: any = []
  tab = 0;
  email: any;
  recentData: any = [];
  resumeForm: any = this.fb.group({
    resume: new FormControl('', Validators.required)
  })
  searchForm: any = this.fb.group({
    search: new FormControl([]),
    location: new FormControl(),
    experience: new FormControl(),
    searchbox: new FormControl(),
  })
  Candidateform: any = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z-.]*$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    workStatus: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
  isSubmit = false;
  details: any;
  pdfUrl: any;
  keySkill: any;
  mobile: any;
  check: boolean = false;
  mailData: any;
  mobile_data: any;
  constructor(private candidateservice: CanditateService, private router: Router, private fb: FormBuilder, private activaterouter: ActivatedRoute) { }

  ngOnInit() {
    this.getallDetails();
    this.recentSearch();
    this.activaterouter.queryParams.subscribe((params: any) => {
      this.tab = params.taps
    })


  }
  imagepreview:any="https://livebroadcast.click/"
  profileview:any

  profile:any


  getallDetails() {
    this.candidateservice.viewDetails().subscribe((res: any) => {
      this.getAlldetails = res.user;
     this.profileview=this.getAlldetails[0].image

     this.profile=this.imagepreview+this.profileview
      console.log(this.imagepreview+this.getAlldetails[0].image)
      this.imagepreview=this.getAlldetails.image
      this.email = this.getAlldetails[0].email;
      this.mobile = this.getAlldetails[0].mobileNumber;
      this.id = this.getAlldetails[0]._id
      console.log(this.id)
      if (this.tab == 10) {
        this.mailData = localStorage.getItem('emailId')
        this.mobile_data = localStorage.getItem('mobileId')
      } else {
        this.tab = 0;
        this.mailData = this.getAlldetails[0].email;
        this.mobile_data = this.getAlldetails[0].mobileNumber
      }
      console.log(this.tab, 'tab')
      this.Candidateform.patchValue({
        name: this.getAlldetails[0].name,
        email: this.mailData,
        workStatus: this.getAlldetails[0].workStatus,
        mobileNumber: this.mobile_data,
        location: this.getAlldetails[0].location
      })
      this.pdfUrl =this.getAlldetails[0].resume;
    })
  }

  getBasic() {
    this.tab = 0
  }
  getAdvance() {
    console.log("workinf")
    this.tab = 2
  }
  geteducation() {
    this.tab = 3;
  }
  Professional() {
    this.tab = 4
  }
  uploadfile() {
    this.tab = 5;
  }
  full() {
    this.tab = 6;
  }
  editAdvance_det() {
    this.router.navigate(['/updateProfile'], { queryParams: { tab: "0" } })
  }
  editedu() {
    this.router.navigate(['/can-edu'])
  }
  editProffi() {
    this.router.navigate(['/can-proffesinal'])
  }
  // recent Search
  recentSearch() {
    this.candidateservice.getRecentsearch().subscribe((res: any) => {
      this.recentData = res;
    })
  }
  seach() {
    let data = {
      search: this.searchForm.get('search')?.value,
      location: this.searchForm.get('location')?.value,
      experience: this.searchForm.get('experience')?.value
    }
    const queryString = new URLSearchParams(data).toString()
    this.router.navigateByUrl('/canJobs?' + queryString)
  }
  recentdata(event: any) {
    console.log(event, "event")
    let data = {
      search: event.search,
      location: event.location,
      experience: event.experience
    }
    const queryString = new URLSearchParams(data).toString()
    this.router.navigateByUrl('/canJobs?' + queryString)
  }
  isDisplay = false;
  dispalye(data: any) {
    console.log("lusu")
    let value = data.target.value.split(",");

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
    this.searchForm.get('search')?.setValue(value)

  }
  getKeyskills(value: any) {
    this.candidateservice.getSkill(value).subscribe((res: any) => {
      this.keySkill = res;
    })
  }
  checkSkill(event: any, skill: any) {
    this.isDisplay = false;
    let index: any = this.searchForm.get('search')?.value;
    console.log(index, "gfg")
    if (index.length != 0) {
      let value = index.splice([index.length - 1], 1);
      index.push(skill)
      this.searchForm.get('search')?.setValue(index)
      let search: any = index.toString() + ","
      this.searchForm.get('searchbox')?.setValue(search);
    }
  }
  uploadResume(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      this.candidateservice.educationDetail(formData).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    }
    // https://livebroadcast.click/v1/educationDetails/get_Role/b628eb64-c411-4507-a791-73d8204baa1c
  }
  logOut() {
    Cookie.deleteAll();
    localStorage.clear()
    this.router.navigate(['/canlogin'])
  }
  changePassword() {
    this.router.navigate(['/changePassword'])
  }
  isChecked(lang: any) {
    let value = false
    console.log(lang, "lahdksd")
    if (lang == 'Speck') {

      value = true

    }
    return value;
  }
  deactivate() {
    this.candidateservice.deactivate().subscribe((res: any) => {
      this.router.navigate(['/canlogin'])
    })
  }
  homePage(tab: any) {

  }
  isEdit = 10;
  id: any;
  edit(id: any) {
    this.id = id
    this.tab = 10;
  }
  latitude: any;
  longtitude: any;
  handleAddressChange(address: Address) {
    this.latitude = address.geometry.location.lat();
    this.latitude = String(this.latitude)
    this.longtitude = address.geometry.location.lng();
    this.longtitude = String(this.longtitude)

    this.Candidateform.patchValue({
      lat: this.latitude,
      long: this.longtitude,
      location: address.formatted_address
    })
  }
  options: any = {
    componentRestrictions: { country: 'IN' },
  };

  editBasic() {
    this.isSubmit = true;
    if (this.Candidateform.valid) {
      this.candidateservice.edit_basic(this.id, this.Candidateform.value).subscribe((res: any) => {
        this.tab = 0;
        this.getallDetails();
        localStorage.setItem('name', this.Candidateform.get('name')?.value)
        this.router.navigate(['/getAllprofile'])
      })
    }
  }
  mailValue: any;
  chackeMail(va: any) {
    this.mailValue = va.target.value;
  }
  verify() {
    const data = {
      email: this.Candidateform.get('email')?.value
    }
    this.candidateservice.verifymail(this.id, data).subscribe((res: any) => {
      localStorage.setItem('emailId', this.Candidateform.get('email')?.value)
      this.router.navigate(['/email-verification'], { queryParams: { mail: this.Candidateform.get('email')?.value } })
    })
  }
  verifymobile() {
    const data = {
      mobileNumber: this.Candidateform.get('mobileNumber')?.value
    }
    this.candidateservice.verify_mobile(this.id, data).subscribe((res: any) => {
      localStorage.setItem('mobileId', this.Candidateform.get('mobileNumber')?.value)
      this.router.navigate(['/mobile-verification'], { queryParams: { mobileNumber: this.Candidateform.get('mobileNumber')?.value } })
    })
  }
  index: any;
  isDisplayIcon(value: any, know: any) {
    this.index = value.find((res: any) => res == know)
    if (this.index) {
      this.check = true;
      return this.check
    }
    else {
      this.check = false;
      return this.check;
    }
  }
  isCheck = false;
  isDisplayIcon2(value: any, know: any) {
    this.index = value.find((res: any) => res == know);
    if (this.index) {
      this.isCheck = true;
      return this.isCheck;
    }
    else {
      this.isCheck = false;

      return this.isCheck;
    }
  }
  ischeck3 = false;
  isDisplayIcon3(value: any, know: any) {
    this.index = value.find((res: any) => res == know)
    if (this.index) {
      this.ischeck3 = true;
      return this.ischeck3;
    }
    else {
      this.ischeck3 = false;
      console.log(this.ischeck3, "fngjgnhjfghj")
      return this.ischeck3;
    }
  }
}
