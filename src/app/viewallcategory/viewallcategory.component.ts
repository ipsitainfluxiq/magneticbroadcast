import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-viewallcategory',
  templateUrl: './viewallcategory.component.html',
  styleUrls: ['./viewallcategory.component.css'],
  providers: [Commonservices],
})
export class ViewallcategoryComponent implements OnInit {
  private addcookie: CookieService;
  private addcookie1: CookieService;
  private cookiedetails;
  public result: any;
  public catagorylist;
  public serverurl;
  public allposts;
  public isModalShown2: boolean = false;
  public logid;
  public usertype: any;

  constructor(addcookie: CookieService, private _http: Http, addcookie1: CookieService, private router: Router, private _commonservices: Commonservices) {
    this.isModalShown2 = false;
    this.addcookie = addcookie;
    this.addcookie1 = addcookie1 ;
    this.usertype = this.addcookie1.getObject('usertype');
    console.log('++++++++++ '+this.usertype);
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    this.serverurl = _commonservices.url;
    if (typeof(this.cookiedetails) == 'undefined') {
      console.log(this.cookiedetails + '--');
      console.log('hb');
      this.router.navigateByUrl('/');
    }
    this.logid = this.cookiedetails._id;
    console.log(this.logid);
  }

  ngOnInit() {
    this.getcategoryList();
  }
  onHidden() {
      this.isModalShown2 = false;
  }
  getcategoryList() {
    // let link = this.serverurl + 'getcategorylist';
    let link = this.serverurl + 'getcategorylist_subscribedornot';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          this.catagorylist = result;
          console.log('this.catagorylist');
          console.log(this.catagorylist);
        }, error => {
          console.log('Oooops!');
        });
  }
  checksubscription(val: any) {
    console.log(' in check subscription');
    console.log(val);
    console.log(val.length);
    if (val.length == 0) return false;
    console.log(this.logid);
    let x: any;
    for (x in val) {
      console.log(val[x]);
      if (val[x].logid == this.logid) {
        return true;
      }
    }
    return false;
  }
  showdetails1(id) {
    this.allposts = '';
    for ( let i in this.catagorylist) {
      if (this.catagorylist[i]._id == id) {
        this.allposts = this.catagorylist[i];
      }
    }
    console.log(this.allposts);
    this.isModalShown2 = true;
  }
  callsubscribe(categoryid) {
    console.log(this.logid);
    console.log(categoryid);
    let link  = this.serverurl + 'callsubscribe';
    let data = {
      logid: this.logid,
      categoryid: categoryid
    };
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
         // console.log('result');
         // console.log(result);
        }, error => {
          console.log('Oooops!');
        });
    setTimeout(() => {
      this.getcategoryList();
    }, 300);
  }
  callunsubscribe(categoryid) {
    let link  = this.serverurl + 'callunsubscribe';
    let data = {
      logid: this.logid,
      categoryid: categoryid
    };
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          console.log('result');
          console.log(result);
        }, error => {
          console.log('Oooops!');
        });
    setTimeout(() => {
      this.getcategoryList();
    }, 300);
  }

}
