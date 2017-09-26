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
    private addcookie1: CookieService;
  private cookiedetails;
  public result: any;
  public datalist;
  public serverurl;
  public data;
  public userid;
  public longterm_token: any;
  public oauth_token: any;
  public oauth_token_secret: any;
  public link_oauth_token: any;
  public link_oauth_token_secret: any;
  public tumblr_oauth_token: any;
  public tumblr_oauth_token_secret: any;
    public usertype: any;

  constructor(addcookie: CookieService, addcookie1: CookieService, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.addcookie = addcookie;
      this.addcookie1 = addcookie1 ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
      this.usertype = this.addcookie1.getObject('usertype');
      console.log('++++++++++ '+this.usertype);
    this.serverurl = _commonservices.url;
    if (typeof(this.cookiedetails) == 'undefined') {
      console.log(this.cookiedetails + '--');
      console.log('hb');
      this.router.navigateByUrl('/');
    }

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
          console.log('twitter oauth_token   ' + this.oauth_token);
          console.log('twitter oauth_token_secret      ' + this.oauth_token_secret);
          console.log('link_oauth_token_secret      ' + this.link_oauth_token_secret);
          console.log('link_oauth_token     ' + this.link_oauth_token);
          console.log('tumblr_oauth_token     ' + this.tumblr_oauth_token);
          console.log('tumblr_oauth_token_secret     ' + this.tumblr_oauth_token_secret);
        }, error => {
          console.log('Oooops!');
        });
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

  calltumblrpost(title, linkis, contentis, imageis) {
    console.log('called');
    let link6 = 'http://magneticbroadcast.com/development/php/postvalfortumblr.php';
    this.data = {
      id: this.cookiedetails._id,
      linkval: linkis + '/' + this.cookiedetails._id,
      oauth_token : this.tumblr_oauth_token,
      oauth_token_secret : this.tumblr_oauth_token_secret,
      title : title,
      contentis : contentis,
      image : 'http://development.magneticbroadcast.com/assets/images/uploads/' + imageis,
      //  logid :  this.logid
    };
    this._http.post(link6, this.data)
        .subscribe(res => {
        }, error => {
          console.log('Oooops!');
        });
  }

  calllinkedinpost(titleis, linkis, contentis, imageis) {
    let link5 = 'http://magneticbroadcast.com/development/php/postvalforlinkedin.php';
    //  let link5 = 'http://magneticbroadcast.com/development/php/linkedin_try.php';
    console.log(link5);
    this.data = {
      id: this.cookiedetails._id,
      linkval: linkis + '/' + this.cookiedetails._id,
      title : titleis,
      linkoauth_token : this.link_oauth_token,
      linkoauth_token_secret : this.link_oauth_token_secret,
      content : contentis,
      image : 'http://development.magneticbroadcast.com/assets/images/uploads/' + imageis,
    };
    console.log('data///////////////////////////////////');
    console.log(this.data);
    this._http.post(link5, this.data)
        .subscribe(res => {
        }, error => {
          console.log('Oooops!');
        });
  }


    calltwitterpost(title, linkis, imageis) {
        let link4 = 'http://magneticbroadcast.com/development/php/postvalfortwitter.php';
        this.data = {
            id: this.cookiedetails._id,
            // title: title,
            // linkval: linkis + '/' + this.cookiedetails._id,
            linkval: title + ' ' + linkis + '/' + this.cookiedetails._id,
            oauth_token : this.oauth_token,
            oauth_token_secret : this.oauth_token_secret,
            //  logid :  this.logid
            image : 'http://development.magneticbroadcast.com/assets/images/uploads/' + imageis,
        };
        this._http.post(link4, this.data)
            .subscribe(res => {
            }, error => {
                console.log('Oooops!');
            });
    }


}
