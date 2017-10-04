import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-accesscode',
  templateUrl: './accesscode.component.html',
  styleUrls: ['./accesscode.component.css'],
  providers: [Commonservices],
})
export class AccesscodeComponent implements OnInit {
  public dataForm: FormGroup ;
  public fb;
  public serverurl;
  public is_error;
  private isSubmit;
  private addcookie: CookieService;
  private cookiedetails;
  private logid;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, addcookie: CookieService, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.is_error = '';
    this.addcookie = addcookie;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    if (typeof (this.cookiedetails) == 'undefined') {
      this.router.navigateByUrl('/');
    }
    this.logid = this.cookiedetails._id;
    console.log(this.logid);
    console.log('loginid is' + this.cookiedetails._id);
  }

  ngOnInit() {
    this.isSubmit = false;
    this.dataForm = this.fb.group({
      accesscode: ["", Validators.required],
    });
  }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    this.isSubmit = true;
    if (this.dataForm.valid) {
      let link = this.serverurl + 'accesscodecheck';
      var data = {logid: this.logid, accesscode: formval.accesscode};
      this._http.post(link, data)
          .subscribe(res => {
            var result = res.json();
            if (result.status == 'success') {
              this.router.navigate(['/newpassword']);
            }
            else {
              this.is_error = result.msg;
              this.router.navigate(['/accesscode']);
            }

          }, error => {
            console.log("Oooops!");
          });

    }


  }
}
