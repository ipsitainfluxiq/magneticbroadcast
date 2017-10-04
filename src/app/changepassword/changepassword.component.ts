import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css'],
    providers: [Commonservices],
})
export class ChangepasswordComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public isSubmit;
    id: number;
    public serverurl;
    private passmatchvalidate;
    public is_error: any;
    private addcookie: CookieService;
    private addcookie1: CookieService;
    private cookiedetails;
    public usertype: any;
    public logid: any;

    constructor(addcookie: CookieService, addcookie1: CookieService, fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.addcookie = addcookie;
        this.addcookie1 = addcookie1 ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.usertype = this.addcookie1.getObject('usertype');
        console.log('++++++++++ '+this.usertype);
        if (typeof(this.cookiedetails) == 'undefined') {
            console.log(this.cookiedetails + '--');
            console.log('hb');
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
            oldpassword: ["", Validators.required],
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
        this.is_error = 0;
        this.passmatchvalidate = true;
        this.isSubmit = true;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if (this.dataForm.valid && this.passmatchvalidate) {

            var link = this.serverurl + 'changepassword';
            // var link= 'http://influxiq.com:3001/changepassword';
            var data = {logid: this.logid, oldpassword: formval.oldpassword, password: formval.password, confirmpassword: formval.confpassword};

            this._http.post(link, data)
                .subscribe(res => {
                    var result = res.json();
                   /* console.log(result.msg);*/
                   // console.log(result.msg.type);
                    console.log('???????????????????????????????????????????');
                    if (result.status == 'success') {
                        this.addcookie.putObject('cookiedetails', result.msg);    // Value of result.msg is inserted to userdetails
                        this.cookiedetails = this.addcookie.getObject('cookiedetails');
                        console.log('after putobject ');
                        console.log(this.cookiedetails);
                        this.addcookie1.putObject('usertype', result.msg.type);
                        this.usertype = this.addcookie1.getObject('usertype');
                        console.log('after putobject9999999 ');
                        console.log(this.usertype);
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.is_error = result.msg;
                    }
                }, error => {
                    console.log("Oooops!");
                });
        }


    }
}
