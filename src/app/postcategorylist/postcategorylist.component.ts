import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-postcategorylist',
  templateUrl: './postcategorylist.component.html',
  styleUrls: ['./postcategorylist.component.css'],
  providers: [Commonservices],
})
export class PostcategorylistComponent implements OnInit {
  private fb;
  public datalist;
  public id;
  private addcookie: CookieService;
  private cookiedetails;
  orderbyquery: any;
  orderbytype: any;
  private isModalShown: boolean = false;
  public serverurl;

  constructor(fb: FormBuilder, private _http: Http, addcookie: CookieService, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.orderbyquery = 'firstname';
    this.orderbytype = 1;
    this.addcookie = addcookie ;
    this.serverurl = _commonservices.url;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    if (typeof (this.cookiedetails) == 'undefined') {
      this.router.navigateByUrl('/login');
    } else {
      /*      setInterval(function () {*/
      this.getManagerList();
      /*     }, 10);*/

    }
  }

  ngOnInit() {
  }

  getManagerList() {
    let link = this.serverurl+'postcategorylist';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          this.datalist = result.res;
          console.log(this.datalist);
        }, error => {
          console.log('Oooops!');
        });
  }

  delConfirm(id) {
    this.id = id;
    // console.log(this.isModalShown);
    this.isModalShown = true;
    console.log(this.isModalShown);
  }

  onHidden() {
    this.isModalShown = false;
  }

  getSortClass(value: any) {
    if (this.orderbyquery == value && this.orderbytype == -1) {
      return 'caret-up';
    }

    if (this.orderbyquery == value && this.orderbytype == 1) {
      // console.log('caret-up');
      return 'caret-down';
    }
    return 'caret-up-down';
  }

  manageSorting(value: any) {
    if (this.orderbyquery == value && this.orderbytype == -1) {
      this.orderbytype = 1;
      return;
    }
    if (this.orderbyquery == value && this.orderbytype == 1) {
      this.orderbytype = -1;
      return;
    }
    this.orderbyquery = value;
    this.orderbytype = 1;
  }

  postcategorydel() {
    console.log('admindel');
    this.isModalShown = false;
    console.log('id got' + this.id);
    let link = this.serverurl+'deletepostcategory';
    let data = {id: this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result = res;
          console.log(result);
          console.log('Data Deleted');
        }, error => {
          console.log('Oooops!');
        });
    setTimeout(() => {
      console.log('calling????????????????????? ?');
      this.getManagerList();
    }, 100);
  }

}
