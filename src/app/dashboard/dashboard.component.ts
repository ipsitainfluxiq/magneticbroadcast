import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Commonservices} from '../app.commonservices' ;
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { TwitterService } from 'ng2-twitter';

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
    public usernameoftwitter: any;
    public imageoftwitter: any;
    public result: any;
    public oauth_token: any;
    public usernameoflink: any;
    public imageoflink: any;
    public oauth_token_secret: any;
    public link_oauth_token: any;
    public link_oauth_token_secret: any;
    public tumblr_oauth_token: any;
    public tumblr_oauth_token_secret: any;
    public datalist;
    public allposts;
    public catagorylist;
    public showdetailofpost;
    public result44;
    public data;
    public serverurl;
    public isModalShown1: boolean = false;
    public isModalShown2: boolean = false;
    public all_details;
    public accesstoken;
    public userid;
    public usernameoffb;
    public dpoffb;
    public logid;
    public phplinktwitter: any;
    public phplinklinkedin: any;
    public phplinktumblr: any;
    public usernameoftumblr: any;
    public imageoftumbler: any;

    constructor(addcookie: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices, private fb: FacebookService, private twitter: TwitterService) {
        console.log('not?');
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        if (typeof(this.cookiedetails) == 'undefined') {
            console.log(this.cookiedetails + '--');
            console.log('hb');
            this.router.navigateByUrl('/');
        }
        this.logid = this.cookiedetails._id;
        console.log(this.logid);
        console.log('loginid is' + this.cookiedetails._id);
        this.phplinktwitter = 'http://magneticbroadcast.com/development/php/index.php?id=' + this.logid; // this is for twitter
        this.phplinklinkedin = 'http://magneticbroadcast.com/development/php/linkedinconnect.php?id=' + this.logid;
       // this.phplinktumblr = 'http://magneticbroadcast.com/development/php/connect1.php?id=' + this.logid;
        this.phplinktumblr = '/php/tumblrconnect.php?id=' + this.logid;
        console.log('========' + this.phplinklinkedin);
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


        let link3 = this.serverurl + 'socialmedialist';
        this.data = {
            id: this.cookiedetails._id
        };
        this._http.post(link3, this.data)
            .subscribe(res => {
                let result3 = res.json();
                console.log('res------------');
                console.log(result3);
                this.userid = result3.userid;
                this.longterm_token = result3.long_access_token;
                this.oauth_token = result3.oauth_token;
                this.oauth_token_secret = result3.oauth_token_secret;
                this.link_oauth_token = result3.link_oauth_token;
                this.link_oauth_token_secret = result3.link_oauth_token_secret;
                this.tumblr_oauth_token = result3.tumblr_oauth_token;
                this.tumblr_oauth_token_secret = result3.tumblr_oauth_token_secret;
                // this.link_oauth_verifier = result3.link_oauth_verifier;
                console.log('userid   ' + this.userid);
                console.log('longterm_token      ' + this.longterm_token);
                console.log('oauth_token   ' + this.oauth_token);
                console.log('oauth_token_secret      ' + this.oauth_token_secret);
                console.log('link_oauth_token_secret      ' + this.link_oauth_token_secret);
                console.log('link_oauth_token     ' + this.link_oauth_token);
                console.log('tumblr_oauth_token     ' + this.tumblr_oauth_token);
                console.log('tumblr_oauth_token_secret     ' + this.tumblr_oauth_token_secret);
            }, error => {
                console.log('Oooops!');
            });


        setTimeout(() => {
            this.callfbvalues();
         this.calltwittervalues();
         this.calllinkedinvalues();
         this.calltumblrrvalues();
        }, 1000);
    }

    callfbvalues() {
        console.log('inside settimeout');
        console.log('userid   ' + this.userid);
        console.log('longterm_token      ' + this.longterm_token);
        //  let link = 'https://graph.facebook.com/1274714149322531?access_token=EAAEBMLJXywkBAHtO5F3elkW8wTip9i8HbRtO4YHMbnu8ygaZA9cWGP9scwh3dfD8RMsByRDtSgZBXhpV6Ky9PouWKsUH4SZAgfmZBdZCikhkDtUb2OzCBbs7rt8O3dEHhaD9W3w50ZCSU0fQlblw8IEjnH4ICD2a8ZD';

        let link = 'https://graph.facebook.com/' + this.userid + '?access_token=' + this.longterm_token;
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                console.log(result);
                this.usernameoffb = result.name;
                console.log('this.usernameoffb-----');
                console.log(this.usernameoffb);
            }, error => {
                console.log('Oooops!');
            });


        let link1 = 'https://graph.facebook.com/' + this.userid + '/picture?type=large';
        // let link1 = 'http://graph.facebook.com/1274714149322531/picture?type=large';

        this._http.get(link1)
            .subscribe(res => {
                this.result44 = res;
                console.log('result for fb dp');
               // console.log(this.result44);
                this.dpoffb = this.result44.url;
                console.log(this.dpoffb);
            }, error => {
                console.log('Oooops!');
            });
    }

    calltumblrrvalues() {
        console.log('called');
        let link6 = 'http://magneticbroadcast.com/development/php/getvalfortumblr.php?id=' + this.logid + '&oauth_token=' + this.tumblr_oauth_token + '&oauth_token_secret=' + this.tumblr_oauth_token_secret;
        this.data = {
            id: this.cookiedetails._id
        };
        this._http.post(link6, this.data)
            .subscribe(res => {
                console.log('result---6--push');
                let result6 = res.json();
                console.log('result6');
                console.log(result6);
                // console.log(result6.name);
                this.usernameoftumblr = result6.name;
                this.imageoftumbler = result6.image;
                console.log('this.usernameoftumblr-------' + this.usernameoftumblr);
            }, error => {
                console.log('Oooops!');
            });
    }

    calltwittervalues() {
        let link4 = 'http://magneticbroadcast.com/development/php/getvaluefortwitter.php?id=' + this.logid + '&oauth_token=' + this.oauth_token + '&oauth_token_secret=' + this.oauth_token_secret;
        this.data = {
            id: this.cookiedetails._id
        };
        this._http.post(link4, this.data)
            .subscribe(res => {
                let result4 = res.json();
                console.log('result4');
                console.log(result4.image);
                console.log(result4.name);
                this.usernameoftwitter = result4.name;
                this.imageoftwitter = result4.image;
                console.log('this.usernameoftwitter-------' + this.usernameoftwitter);
            }, error => {
                console.log('Oooops!');
            });
    }



    calllinkedinvalues() {
        console.log('call php for linkedin values1');

        let link5 = 'http://magneticbroadcast.com/development/php/getvalueforlink.php?id=' + this.logid + '&linkoauth_token=' + this.link_oauth_token + '&linkoauth_token_secret=' + this.link_oauth_token_secret;
        console.log(link5);
        this.data = {
            id: this.cookiedetails._id
        };
        this._http.post(link5, this.data)
            .subscribe(res => {
                console.log('call php for linkedin values2');
                let result5 = res.json();
                console.log('result5++++++++++++++++++++++++++++++++++++');
                console.log(result5);
                 this.usernameoflink = result5.fname + ' ' + result5.lname;
                 this.imageoflink = result5.image;
                console.log(this.usernameoflink);
                console.log(this.imageoflink);
            }, error => {
                console.log('Oooops!');
            });
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


        } else {

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
            this.callfbvalues();
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
          let result6 = res.json();
          this.datalist = result6;
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
