import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [Commonservices],
})
export class ForgetpasswordComponent implements OnInit {
  public dataForm: FormGroup ;
  public fb;
  private isSubmit;
  public serverurl;
  public is_error;
  public logid;
  static invalidemail;
  static blankemail;
  private addcookie: CookieService;
  private cookiedetails;

  constructor(addcookie: CookieService, fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.addcookie = addcookie;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    if (typeof(this.cookiedetails) != 'undefined') {
      this.router.navigateByUrl('/dashboard');
    }
/*    this.logid = this.cookiedetails._id;
    console.log(this.logid);
    console.log('loginid is' + this.cookiedetails._id);*/
    /*  this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
     console.log('mailcookiedetails');
     console.log('get mail from login page saved cookie ->  ' + this.mailcookiedetails);*/
    ForgetpasswordComponent.blankemail = false;
    ForgetpasswordComponent.invalidemail = false;
    this.is_error = '';
  }

  ngOnInit() {
    this.isSubmit = false;
    this.dataForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, ForgetpasswordComponent.validateEmail])],
    });

  }

  static validateEmail(control: FormControl) {
    ForgetpasswordComponent.blankemail = false;
    ForgetpasswordComponent.invalidemail = false;
    if (control.value == '') {
      ForgetpasswordComponent.blankemail = true;
      return { 'invalidemail' : true } ;
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      ForgetpasswordComponent.invalidemail = true;
      return { 'invalidemail': true };
    }
  }


  getemail(type: any)  {
    console.log('t ' + type);
    if (type == 'invalid') {
      return ForgetpasswordComponent.invalidemail;
    }
    if (type == 'blank') {
      return ForgetpasswordComponent.blankemail;
    }
  }


  dosubmit(formval) {
    console.log('submit');
    this.is_error = 0;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    console.log('this.dataForm.valid' + this.dataForm.valid);
    console.log('ForgetpasswordComponent.invalidemail' + ForgetpasswordComponent.invalidemail);
    console.log('ForgetpasswordComponent.blankemail' + ForgetpasswordComponent.blankemail);

    if (this.dataForm.valid &&  (ForgetpasswordComponent.invalidemail == false || ForgetpasswordComponent.blankemail == false)) {
      console.log('inside');
      let link = this.serverurl + 'forgetpassword';
      // var link = 'http://localhost:3004/forgetpassword';
      let data = {email: formval.email};
      this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
              this.addcookie.putObject('cookiedetails', result.msg);    // Value of result.msg is inserted to userdetails
              this.cookiedetails = this.addcookie.getObject('cookiedetails');
              console.log('after putobject id is');
              console.log(this.cookiedetails._id);
              this.router.navigate(['/accesscode']);
            }
            else {
              this.is_error = result.msg;
              this.router.navigate(['/forgetpassword']);
            }
          }, error => {
            console.log("Oooops!");
          });
    }
  }
}
