import { Component, OnInit  } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;
@Component({
  selector: 'app-subscribedcategories',
  templateUrl: './subscribedcategories.component.html',
  styleUrls: ['./subscribedcategories.component.css'],
  providers: [Commonservices],
})
export class SubscribedcategoriesComponent implements OnInit {
  private addcookie: CookieService;
  private addcookie1: CookieService;
  private cookiedetails;
  public usertype: any;
  public isModalShown2: boolean = false;
  public allposts;
  public catagorylist;
  public logid;
  public serverurl;

  constructor(addcookie: CookieService, addcookie1: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    console.log('not?');
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
    this.getcategoryList();
  }
  getcategoryList() {
    // let link = this.serverurl + 'getcategorylist';
    let link = this.serverurl + 'getcategorylist_subscribedornot';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          this.catagorylist = result;
          //  this.catagorylength = this.catagorylist.length;
          console.log('this.catagorylist----------------++++----');
          console.log(this.catagorylist);
        }, error => {
          console.log('Oooops!');
        });
  }

  checksubscription(val : any){
    //  console.log(' in check subscription');
    // console.log(val);
    //  console.log(val.length);
    if(val.length==0) return false;
    //  console.log(this.logid);
    let x : any;
    for(x in val){
      //   console.log(val[x]);
      if(val[x].logid == this.logid){
        return true;
      }
    }
    return false;
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
          console.log('result');
          console.log(result);
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
    console.log(data);
    console.log('data77777777');
    this._http.post(link, data)
        .subscribe(res => {
          // let result = res.json();
          //  console.log('result');
          //  console.log(result);
        }, error => {
          console.log('Oooops!');
        });
    setTimeout(() => {
      this.getcategoryList();
    }, 300);
  }

  showdetails1(id) {
    this.allposts = '';
    for ( let i in this.catagorylist) {
      if (this.catagorylist[i]._id == id) {
        /*this.allposts = this.catagorylist[i].Postcategorydetail;*/
        this.allposts = this.catagorylist[i];
      }
    }
    console.log(this.allposts);
    this.isModalShown2 = true;
  }

}
