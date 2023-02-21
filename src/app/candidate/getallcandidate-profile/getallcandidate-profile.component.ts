import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { CanditateService } from '../canditate.service';

@Component({
  selector: 'app-getallcandidate-profile',
  templateUrl: './getallcandidate-profile.component.html',
  styleUrls: ['./getallcandidate-profile.component.css']
})
export class GetallcandidateProfileComponent implements OnInit {
  getAlldetails: any = []
  tab = 0;
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
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    workStatus: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
  details: any;
  pdfUrl: any;
  keySkill: any;
  constructor(private candidateservice: CanditateService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.getallDetails();
    this.recentSearch();
  }
  getallDetails() {
    this.candidateservice.viewDetails().subscribe((res: any) => {
      this.getAlldetails = res.user;
      console.log(this.getAlldetails[0].name,"namename")
      this.Candidateform.patchValue({
        name: this.getAlldetails[0].name,
        email: this.getAlldetails[0].email,
        workStatus: this.getAlldetails[0].workStatus,
        mobileNumber: this.getAlldetails[0].mobileNumber,
        location: this.getAlldetails[0].location
      })
      this.pdfUrl = `https://livebroadcast.click/resumes/1675427235220.pdf`;
      console.log(this.pdfUrl, "dl,ld,")
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
  edit() {
    this.tab = 10;
  }
}
