import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
// import { Meta } from '@angular/platform-browser';
import { MetaService } from 'ng2-meta';
import { MetaModule } from 'ng2-meta';

@Component({
  selector: 'app-leadpage1',
  templateUrl: './leadpage1.component.html',
  styleUrls: ['./leadpage1.component.css'],
  providers: [Commonservices],
})
export class Leadpage1Component implements OnInit {
  public dataForm: FormGroup;
  private fb;
  public serverurl;
  static invalidemail;
  static blankemail;
  public isModalShown: boolean = false;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices, private metaService: MetaService) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    Leadpage1Component.blankemail = false;
    Leadpage1Component.invalidemail = false;
    // this.metaService.setTitle({ name: 'property', content: 'content' });
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Leadpage1Component.validateEmail])],
      phone: [''],
      zip: ['']
    });
/*    this.metaService.setTitle('Product page for NAME');
     this.metaService.setTag('og:image', 'hiiie');*/
  }


  static validateEmail(control: FormControl) {
    Leadpage1Component.blankemail = false;
    Leadpage1Component.invalidemail = false;

    if (control.value == '') {
      Leadpage1Component.blankemail = true;
      return { 'invalidemail' : true } ;
    }
    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      Leadpage1Component.invalidemail = true;
      return { 'invalidemail': true };
    }
  }


  getemail(type: any)  {
    if (type == 'invalid') {
      return Leadpage1Component.invalidemail;
    }
    if (type == 'blank') {
      return Leadpage1Component.blankemail;
    }
  }

  onHidden() {
      this.isModalShown = false;
    }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid && (Leadpage1Component.invalidemail == false || Leadpage1Component.blankemail == false)) {
      let link = this.serverurl + 'lead';
      let data = {
        name: formval.name,
        email: formval.email,
        phone: formval.phone,
        zip: formval.zip,
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
