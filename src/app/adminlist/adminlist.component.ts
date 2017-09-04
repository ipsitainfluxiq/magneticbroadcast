import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css'],
  providers: [Commonservices],
})
export class AdminlistComponent implements OnInit {
  private fb;
  public datalist;
  public id;
  orderbyquery: any;
  orderbytype: any;
  private isModalShown: boolean = false;
  public serverurl;

  constructor(fb: FormBuilder, private _http: Http,  private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.orderbyquery = 'firstname';
    this.orderbytype = 1;
    this.serverurl = _commonservices.url;
      this.getAdminList();
  }

  ngOnInit() {
  }
  getAdminList() {
    let link = this.serverurl+'adminlist';
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

  admindel() {
    console.log('admindel');
    this.isModalShown = false;
    console.log('id got' + this.id);
    let link = this.serverurl+'deleteadmin';
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
      this.getAdminList();
    }, 100);
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
}
