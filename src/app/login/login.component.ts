import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Commonservices]
})
export class LoginComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  private isSubmit;
  private isemailvalidate;
  public is_error;
  private addcookie: CookieService;
  private addcookie1: CookieService;
  private cookiedetails;
  private usertype;
  public serverurl;
  public user: any;


  constructor(fb: FormBuilder, addcookie: CookieService, addcookie1: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.addcookie = addcookie ;
    this.addcookie1 = addcookie1 ;
    this.serverurl = _commonservices.url;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    this.usertype = this.addcookie1.getObject('usertype');
     if (typeof (this.cookiedetails) != 'undefined') {
       this.router.navigateByUrl('/adminlist');
     }
  }

  ngOnInit() {
    this.isSubmit=false;
    this.isemailvalidate=false;

    this.dataForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]});
  }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    this.is_error = 0;
    this.isSubmit = true;
    if (this.dataForm.valid) {
      let link  = this.serverurl+'login';
      let data = {email: formval.email, password: formval.password};

      this._http.post(link, data)
          .subscribe(res => {
            let result = res.json();
            if (result.status == 'success') {
              console.log('result8888888888888888');
              this.addcookie.putObject('cookiedetails', result.msg);    // Value of result.msg is inserted to userdetails
              this.cookiedetails = this.addcookie.getObject('cookiedetails');
              console.log('after putobject ');
              console.log(this.cookiedetails);
              this.addcookie1.putObject('usertype', result.msg.type);
              this.usertype = this.addcookie1.getObject('usertype');
              console.log('after putobject9999999 ');
              console.log(this.usertype);
              this.router.navigateByUrl('/dashboard');
            }
            else {
              this.is_error = result.msg;
              this.router.navigate(['/']);
            }

          }, error => {
            console.log('Oooops!');
          });



    }
  }
}
