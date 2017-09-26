import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
declare var $: any;

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
  public parentid: any;
  static invalidemail;
  static blankemail;
  public isModalShown: boolean = false;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
   /* $('head').append('<meta content="I am trying to post a url with a hashtag in it. Encoding the hashtag does not work, and I do not know how to use intent structure mentioned here with Codebird: https://dev.twitter.com/discussions/5..." property="og:description" />');
    $('head').append('<meta content="https://github.com/jublonet/codebird-php/issues/77" property="og:url" />');
    $('head').append('<meta content="Posting Url With Hashtags · Issue #77 · jublonet/codebird-php" property="og:title" />');
    $('head').append('<meta content="https://avatars3.githubusercontent.com/u/310320?v=4&amp;s=400" property="og:image" />');*/

   $('#mtitle').attr('content','this is Test');
   alert($('#mtitle').attr('content'));
    this.fb = fb;
    this.serverurl = _commonservices.url;
    Leadpage1Component.blankemail = false;
    Leadpage1Component.invalidemail = false;
   //  this.metaService.setTag({ name: 'property', content: 'content' });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parentid = params['id']; // this 'id' is from routes.ts
      console.log('parentid  ' + this.parentid);

    });

    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Leadpage1Component.validateEmail])],
      phone: [''],
      zip: ['']
    });
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
    this.dataForm.reset();
    }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid && (Leadpage1Component.invalidemail == false || Leadpage1Component.blankemail == false)) {
      let link = this.serverurl + 'lead';
      let data = {
        parentid: this.parentid,
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
