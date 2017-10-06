import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-subscribedposts',
  templateUrl: './subscribedposts.component.html',
  styleUrls: ['./subscribedposts.component.css'],
  providers: [Commonservices],
})
export class SubscribedpostsComponent implements OnInit {
  private addcookie: CookieService;
  private addcookie1: CookieService;
  private cookiedetails;
  public serverurl;
  public usertype: any;
  public datalist;
  public datalist7;
  public logid;

  constructor(addcookie: CookieService, addcookie1: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.addcookie = addcookie;
    this.addcookie1 = addcookie1;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    this.usertype = this.addcookie1.getObject('usertype');
    console.log('++++++++++ ' + this.usertype);
    if (typeof(this.cookiedetails) == 'undefined') {
      console.log(this.cookiedetails + '--');
      console.log('hb');
      this.router.navigateByUrl('/');
    }
    this.logid = this.cookiedetails._id;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
    this.getManagerList();
    this.getList();
  }
  getManagerList() {
    let link = this.serverurl + 'subscribedposts';
    let data = {
      loginid: this.logid,
    };
    this._http.post(link, data)
        .subscribe(res => {
          let result6 = res.json();
          this.datalist = result6;
         // console.log('this.datalist==========9999===');
      //    console.log(this.datalist);
        }, error => {
          console.log('Oooops!');
        });
  }


  getList() {
    let link = this.serverurl + 'broadcastposts';
    this._http.get(link)
        .subscribe(res => {
          let result67 = res.json();
          this.datalist7 = result67;
          console.log('this.datalist==========9999===');
          console.log(this.datalist7);
          console.log(this.datalist7.length);
        }, error => {
          console.log('Oooops!');
        });
  }

}
