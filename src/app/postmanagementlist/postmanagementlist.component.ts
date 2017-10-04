import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-postmanagementlist',
  templateUrl: './postmanagementlist.component.html',
  styleUrls: ['./postmanagementlist.component.css'],
  providers: [Commonservices],
})
export class PostmanagementlistComponent implements OnInit {
  private fb;
  public datalist;
  public id;
  private addcookie: CookieService;
  private cookiedetails;
  orderbyquery: any;
  orderbytype: any;
  private isModalShown1: boolean = false;
  public serverurl;
  public pageno;
  public pagestart;
  public pageinitation;
  public totalpage;
  public showrows;
  public list_length;
  public logid;
  public contentdetails;
  public isModalShown2: boolean = false;

  constructor(fb: FormBuilder, private _http: Http, addcookie: CookieService, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.orderbyquery = 'title';
    this.orderbytype = 1;
    this.showrows = 5;
    this.pageno = 1;
    this.pagestart = 0;
    this.pageinitation = 5;
    this.addcookie = addcookie ;
    this.serverurl = _commonservices.url;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    if (typeof (this.cookiedetails) == 'undefined') {
      this.router.navigateByUrl('/login');
    } else {
      this.getManagerList();

    }
    this.logid = this.cookiedetails._id;
    console.log('loginid is' + this.cookiedetails._id);
  }

  ngOnInit() {
  }

  getManagerList() {
    let link = this.serverurl+'postmanagementlist';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          this.datalist = result;
          console.log('datalist------');
          console.log(this.datalist);
          this.list_length = result.length;
          this.totalpage = this.list_length / this.showrows ;

          if (this.totalpage != parseInt(this.totalpage)) {
            this.totalpage = parseInt(this.totalpage) + 1;
          }
          console.log('this.list_length  ' + this.list_length);
          console.log('showrows  ' + this.showrows);
          console.log('total page  ' + this.totalpage);

          console.log(this.datalist);
        }, error => {
          console.log('Oooops!');
        });
  }
  showcontents(itemid) {
    this.contentdetails = '';
    for ( let i in this.datalist) {
      if (this.datalist[i]._id == itemid) {
        this.contentdetails = this.datalist[i];
      }
    }
    console.log('this.contentdetails');
    console.log(this.contentdetails);
    this.isModalShown2 = true;
  }
  delConfirm(id) {
    this.id = id;
    this.isModalShown1 = true;
    console.log(this.isModalShown1);
  }

  onHidden(type) {
    if(type == 1){
      this.isModalShown1 = false;
    }
    if(type == 2){
      this.isModalShown2 = false;
    }
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
    this.isModalShown1 = false;
    console.log('id got' + this.id);
    let link = this.serverurl+'deletepostmanagement';
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
    }, 300);
  }

  /*______________________________________________page_initiation_______________________________________*/

  pageval(type) {

    if (type == 1 ) {       // for prev page
      if ((this.pagestart - this.showrows) >= 0) {
        this.pageno--;
        this.pagestart = (this.pageno - 1) * this.showrows;
      }
    }

    if ( type == 2 ) {      // for next page
      if (this.list_length - this.showrows - 1 >= this.pagestart) {
        this.pagestart = this.pageno * this.showrows;
        this.pageno++;
      }
    }

    if ( type == 3 ) {    // for goto input type
      if ( (this.pageno >0) && (this.pageno <= this.totalpage) ) {
        this.pagestart = (this.pageno - 1) * this.showrows;
      } else {
        this.pageno = 1;
        this.pagestart = 0;
      }
    }

    this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
  }

  chagevalues() {
    this.totalpage = this.list_length / this.showrows ;
    if (this.list_length % this.showrows != 0) {
      this.totalpage = this.totalpage + 1;
      this.totalpage = parseInt(this.totalpage);
    }
    this.pageno = 1;
    this.pagestart = 0;
    this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
  }
}
