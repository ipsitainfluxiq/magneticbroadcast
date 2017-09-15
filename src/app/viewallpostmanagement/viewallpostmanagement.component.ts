import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-viewallpostmanagement',
  templateUrl: './viewallpostmanagement.component.html',
  styleUrls: ['./viewallpostmanagement.component.css'],
  providers: [Commonservices],
})
export class ViewallpostmanagementComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;
  public result: any;
  public datalist;
  public serverurl;
  constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.addcookie = addcookie;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    this.serverurl = _commonservices.url;
    if (typeof(this.cookiedetails) == 'undefined') {
      console.log(this.cookiedetails + '--');
      console.log('hb');
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
    this.getManagerList();
  }
  getManagerList() {
    let link = this.serverurl + 'postmanagementlist';
    this._http.get(link)
        .subscribe(res => {
          let result6 = res.json();
          this.datalist = result6;
          console.log('this.datalist7777777');
          console.log(this.datalist);
        }, error => {
          console.log('Oooops!');
        });
  }
}
