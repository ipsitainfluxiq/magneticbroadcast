import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Commonservices],
})
export class DashboardComponent implements OnInit {
  private addcookie: CookieService;
  private cookiedetails;
  public longterm_token: any;
  public long_token_exp: any;
  public client_id: any;
  public client_secret: any;
  public datalist;
  public allposts;
  public catagorylist;
  public showdetailofpost;
  public data;
  public serverurl;
  public isModalShown1: boolean = false;
  public isModalShown2: boolean = false;
  public all_details;
  public accesstoken;
  public userid;
  public usernameoffb;
  public dpoffb;
  constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices, private fb: FacebookService) {
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    if (typeof(this.cookiedetails) == 'undefined') {
      console.log(this.cookiedetails + '--');
      console.log('hb');
      this.router.navigateByUrl('/');
    }
    this.isModalShown1 = false;
    this.isModalShown2 = false;
    this.serverurl = _commonservices.url;
    this.client_id = _commonservices.client_id;
    this.client_secret = _commonservices.client_secret;

    let initParams: InitParams = {
      appId: '282783638866697',
      xfbml: true,
      version: 'v2.10'
    };
    fb.init(initParams);


/*-----------------------------will see next day-------------------------------------*/

    let link3 = this.serverurl + 'socialmedialist';
    this.data = {
      id: this.cookiedetails._id
    };
    this._http.post(link3, this.data)
        .subscribe(res => {
          let result3 = res.json();
          this.userid = result3.userid;
          this.longterm_token = result3.long_access_token;
          console.log('------'+this.userid);
        }, error => {
          console.log('Oooops!');
        });


    setTimeout(() => {
     //  let link = 'https://graph.facebook.com/1274714149322531?access_token=EAAEBMLJXywkBAHtO5F3elkW8wTip9i8HbRtO4YHMbnu8ygaZA9cWGP9scwh3dfD8RMsByRDtSgZBXhpV6Ky9PouWKsUH4SZAgfmZBdZCikhkDtUb2OzCBbs7rt8O3dEHhaD9W3w50ZCSU0fQlblw8IEjnH4ICD2a8ZD';

     let link = 'https://graph.facebook.com/' + this.userid + '?access_token=' + this.longterm_token;
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          console.log(result);
          this.usernameoffb = result.name;
          console.log('this.usernameoffb777777777777777777777');
          console.log(this.usernameoffb);
        }, error => {
          console.log('Oooops!');
        });


    let link1 = 'http://graph.facebook.com/' + this.userid + '/picture?type=large';
   // let link1 = 'http://graph.facebook.com/1274714149322531/picture?type=large';

    this._http.get(link1)
        .subscribe(res => {
          let result1 = res;
          this.dpoffb = result1.url;
          console.log(this.dpoffb);
        }, error => {
          console.log('Oooops!');
        });
    }, 500);
  }


  loginWithFacebook() {
    console.log('hi');
    console.log('fbresponse');
    console.log(this.fb.getAuthResponse());
    if (typeof (this.fb.getAuthResponse()) == 'undefined') {


      this.fb.login()
          .then((response: LoginResponse) =>
                  this.addfacebooklogindata(response),
              // this.all_details = response.authResponse,
          )
          .catch((error: any) => console.error(error));



    }else {

      //   this.addfacebooklogindata(response),
      this.all_details = this.fb.getAuthResponse();
      if (typeof(this.all_details) != 'undefined') {
        this.accesstoken = this.all_details.accessToken;
        this.userid = this.all_details.userID;
        //  console.log(this.accesstoken);
        //  console.log(this.userid);
        this.callfunc();
      }
    }
  }


  addfacebooklogindata(response: any) {
    this.all_details = this.fb.getAuthResponse();                           // 1st call
    console.log('this.all_details===========');
   // console.log(this.all_details);
    if (typeof(this.all_details) != 'undefined') {
      this.accesstoken = this.all_details.accessToken;
      this.userid = this.all_details.userID;

      /*console.log('in addfacebook function');
      console.log(this.all_details);
      console.log('in addfacebook function');*/
     // console.log(this.accesstoken);
     // console.log(this.userid);
      this.callfunc();

    }
  }
  callfunc() {                                                          // 2nd call
    let link = this.serverurl + 'fbcall';
    let data = {
      token: this.accesstoken,
      client_id: this.client_id,
      client_secret: this.client_secret,
      loginid: this.cookiedetails._id,
      userid: this.userid,
    };
    this._http.post(link,data)
        .subscribe(res => {
          let result = res.json();
        //  console.log(result.htmlval.access_token);
          // this.datalist = result;
         //  console.log(result);
          this.longterm_token = result.htmlval.access_token;
          this.long_token_exp = result.htmlval.expires_in;
          console.log(this.long_token_exp);
          console.log(this.longterm_token);
        }, error => {
          console.log('Oooops!');
        });
  }


  ngOnInit() {
    this.getManagerList();
    this.getcategoryList();
  }
  onHidden(type) {
    if (type == 1) {
      this.isModalShown1 = false;
    }
    if (type == 2) {
      this.isModalShown2 = false;
    }
  }
  getManagerList() {
    let link = this.serverurl + 'postmanagementlist';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          this.datalist = result;
          // console.log(this.datalist);
        }, error => {
          console.log('Oooops!');
        });
  }

  getcategoryList() {
    let link = this.serverurl + 'getcategorylist';
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

  showdetails(id) {
    this.showdetailofpost = '';
    for ( let i in this.datalist) {
      if (this.datalist[i]._id == id) {
        this.showdetailofpost = this.datalist[i];
      }
    }
  //  console.log(this.showdetailofpost);
    this.isModalShown1 = true;
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
