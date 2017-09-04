import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css'],
  providers: [Commonservices],
})
export class AddadminComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  private passmatchvalidate;
  public serverurl;
  static invalidemail;
  static blankemail;
  private addcookie: CookieService;
  private cookiedetails;

  constructor(fb: FormBuilder, addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    AddadminComponent.blankemail = false;
    AddadminComponent.invalidemail = false;
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
 /*   console.log('get t he cookie value');
    console.log(this.cookiedetails);*/
  }

  ngOnInit() {
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, AddadminComponent.validateEmail])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confpassword: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'confpassword') });
  }


  static validateEmail(control: FormControl) {
    AddadminComponent.blankemail = false;
    AddadminComponent.invalidemail = false;

    if (control.value == '') {
      AddadminComponent.blankemail = true;
      return { 'invalidemail' : true } ;
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      AddadminComponent.invalidemail = true;
      return { 'invalidemail': true };
    }
  }

  getemail(type: any)  {
   // console.log('t '+type);
    if (type == 'invalid') {
      return AddadminComponent.invalidemail;
    }
    if (type == 'blank') {
      return AddadminComponent.blankemail;
    }
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        console.log('mismatch');
        return {
          mismatchedPasswords: true
        };
      }
      else {
        this.passmatchvalidate = true;
      }
    };
  }


  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    console.log('inside submit');
    if (this.dataForm.valid && this.passmatchvalidate && (AddadminComponent.invalidemail == false || AddadminComponent.blankemail == false)) {
      console.log('inside dataformvalid');
      //  let link = 'http://localhost:3002/addadmin';
      let link = this.serverurl + 'addadmin';
      let data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        password: formval.password,
        address: formval.address,
        city: formval.city,
        state: formval.state,
        zip: formval.zip,
        phone: formval.phone,
      };
      this._http.post(link, data)
          .subscribe(res => {
             this.router.navigate(['/adminlist']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }


}
