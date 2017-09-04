import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {
  private cookiedetails;
  private addcookie: CookieService;

  constructor(private router: Router, addcookie: CookieService) {
    this.addcookie = addcookie ;
    this.router = router;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    if (typeof(this.cookiedetails) == 'undefined') {
      console.log(this.cookiedetails+'??????????');
      console.log('hb');
      this.router.navigateByUrl('/');
    }

  }

  ngOnInit() {
   /* setTimeout(() => {

    }, 100);*/

  }

}
