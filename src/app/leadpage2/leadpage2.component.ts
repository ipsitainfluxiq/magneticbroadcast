import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-leadpage2',
  templateUrl: './leadpage2.component.html',
  styleUrls: ['./leadpage2.component.css'],
  providers: [Commonservices],
})
export class Leadpage2Component implements OnInit {
  public dataForm: FormGroup;
  private fb;
  private parentid: any;
  public serverurl;
  static invalidemail;
  static blankemail;
  public isModalShown: boolean = false;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    Leadpage2Component.blankemail = false;
    Leadpage2Component.invalidemail = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parentid = params['id']; // this 'id' is from routes.ts
      console.log('parentid  ' + this.parentid);

    });
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Leadpage2Component.validateEmail])],
      phone: [''],
      zip: ['']
    });
  }


  static validateEmail(control: FormControl) {
    Leadpage2Component.blankemail = false;
    Leadpage2Component.invalidemail = false;

    if (control.value == '') {
      Leadpage2Component.blankemail = true;
      return { 'invalidemail' : true } ;
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      Leadpage2Component.invalidemail = true;
      return { 'invalidemail': true };
    }
  }

  getemail(type: any)  {
    if (type == 'invalid') {
      return Leadpage2Component.invalidemail;
    }
    if (type == 'blank') {
      return Leadpage2Component.blankemail;
    }
  }

  onHidden() {
    this.isModalShown = false;
    this.dataForm.reset();
  }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid && (Leadpage2Component.invalidemail == false || Leadpage2Component.blankemail == false)) {
      let link = this.serverurl + 'lead';
      let data = {
        name: formval.name,
        email: formval.email,
        phone: formval.phone,
        zip: formval.zip,
        parentid: this.parentid,
      };
      this._http.post(link, data)
          .subscribe(res => {
            this.isModalShown = true;
          }, error => {
            console.log('Oooops!');
          });
    }
  }

}
