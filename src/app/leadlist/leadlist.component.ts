import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-leadlist',
  templateUrl: './leadlist.component.html',
  styleUrls: ['./leadlist.component.css'],
  providers: [Commonservices],
})
export class LeadlistComponent implements OnInit {
  private fb;
  public datalist;
  public id;
  orderbyquery: any;
  orderbytype: any;
  public serverurl;
  public pageno;
  public pagestart;
  public pageinitation;
  public totalpage;
  public showrows;
  public list_length;

  constructor(fb: FormBuilder, private _http: Http,  private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.orderbyquery = 'name';
    this.orderbytype = 1;
    this.showrows = 5;
    this.serverurl = _commonservices.url;
    this.pageno = 1;
    this.pagestart = 0;
    this.pageinitation = 5;
    this.getLeadList();
  }

  ngOnInit() {
  }
  getLeadList() {
    let link = this.serverurl + 'leadlist';
    this._http.get(link)
        .subscribe(res => {
          let result = res.json();
          this.datalist = result.res;
          console.log(this.datalist);
          this.list_length = result.res.length;
          this.totalpage = this.list_length / this.showrows ;
          if (this.totalpage != parseInt(this.totalpage)) {   // it means if the totalpage is 1.4 or any values that is not round number
            this.totalpage = parseInt(this.totalpage) + 1;
            // console.log('total page  ' + this.totalpage);
          }
          console.log('this.list_length  ' + this.list_length);
          console.log('showrows  ' + this.showrows);
          console.log('total page  ' + this.totalpage);


          }, error => {
          console.log('Oooops!');
        });
  }

  getSortClass(value: any) {
    if (this.orderbyquery == value && this.orderbytype == -1) {
      return 'caret-up';
    }

    if (this.orderbyquery == value && this.orderbytype == 1) {
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
    //   setTimeout(() => {
    this.totalpage = this.list_length / this.showrows ;
    if (this.list_length % this.showrows != 0) {
      this.totalpage = this.totalpage + 1;
      console.log('total  ' + this.totalpage);
      this.totalpage = parseInt(this.totalpage);
     /* if (this.totalpage != parseInt(this.totalpage)) {
        this.totalpage = parseInt(this.totalpage) + 1;
      }*/

    }
    this.pageno = 1;
    this.pagestart = 0;
    this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);

    //  }, 700);
  }

}
