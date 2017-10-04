import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css'],
  providers: [Commonservices],
})
export class NewpasswordComponent implements OnInit {
  public dataForm: FormGroup ;
  public fb;
  public isSubmit;
  id: number;
  public serverurl;
  private addcookie: CookieService;
  private cookiedetails;
  private logid;
  private passmatchvalidate;
  public is_error: any;
  private addcookie1: CookieService;
  private usertype;

  constructor( emailcookie: CookieService, fb: FormBuilder, addcookie1: CookieService, addcookie: CookieService, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.addcookie = addcookie;
    this.addcookie1 = addcookie1 ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    this.usertype = this.addcookie1.getObject('usertype');
    console.log('type is from cookie ' + this.usertype);
    if (typeof (this.cookiedetails) == 'undefined') {
      this.router.navigateByUrl('/');
    }
    this.logid = this.cookiedetails._id;
    console.log(this.logid);
    console.log('loginid is' + this.cookiedetails._id);
  }

  ngOnInit() {
    this.isSubmit = false;
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      confpassword: ["", Validators.required],
    }, {validator: this.matchingPasswords('password', 'confpassword') });
  };


  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        console.log('mismatch');
        return {
          mismatchedPasswords: true
        };
      } else {
        this.passmatchvalidate = true;
      }
    };
  }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    this.is_error = 0;
    this.passmatchvalidate = false;
    if (this.dataForm.controls['password'].value == this.dataForm.controls['confpassword'].value) {
      this.passmatchvalidate = true;
    }
    this.isSubmit = true;
    if (this.dataForm.valid && this.passmatchvalidate) {
      let link = this.serverurl + 'newpassword';
      //   let link = 'http://localhost:3004/newpassword';
      let data = {logid: this.logid, password: formval.password, confirmpassword: formval.confpassword};

      this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
             /* this.addcookie.putObject('cookiedetails', result.msg);    // Value of result.msg is inserted to userdetails
              this.cookiedetails = this.addcookie.getObject('cookiedetails');
              console.log('after putobject ');
              console.log(this.cookiedetails);
              this.addcookie1.putObject('usertype', result.msg.type);
              this.usertype = this.addcookie1.getObject('usertype');
              console.log('after putobject9999999 ');
              console.log(this.usertype);*/
              this.router.navigate(['/dashboard']);
            }
            else {
              this.is_error = result.msg;
            }
          }, error => {
            console.log('Oooops!');
          });
    }


  }
}
