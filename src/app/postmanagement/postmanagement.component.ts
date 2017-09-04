import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-postmanagement',
  templateUrl: './postmanagement.component.html',
  styleUrls: ['./postmanagement.component.css'],
  providers: [Commonservices],
})
export class PostmanagementComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  public serverurl;
  public postcategorylist: any = [];

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;

    let link = this.serverurl + 'postcategorylist';
    this._http.get(link)
        .subscribe(res => {
          var result1 = res.json();
          for (let i in result1.res) {
            this.postcategorylist[i] = result1.res[i];
          }
        }, error => {
          console.log("Oooops!");
        });

  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      title: ['', Validators.required],
      postlist: ['', Validators.required],
      content: ['', Validators.required],
      link: ['', Validators.required],
      priority: ['', Validators.required],
      status: [''],
    });
  }

  dosubmit(formval) {

    if(formval.status==''){
      formval.status = false;
    }


    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    console.log('inside submit');
    if (this.dataForm.valid) {
      console.log('inside dataformvalid');
      let link = this.serverurl + 'postcategorymanagement';
      let data = {
        title: formval.title,
        postlist: formval.postlist,
        content: formval.content,
        link: formval.link,
        priority: formval.priority,
        status: formval.status,
      };
      console.log(data);
      this._http.post(link, data)
          .subscribe(res => {
            this.router.navigate(['/postmanagementlist']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }

}
