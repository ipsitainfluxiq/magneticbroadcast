import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-editpostmanagement',
  templateUrl: './editpostmanagement.component.html',
  styleUrls: ['./editpostmanagement.component.css'],
  providers: [Commonservices],
})
export class EditpostmanagementComponent implements OnInit {

  public dataForm: FormGroup;
  private fb;
  public serverurl;
  public postcategorylist: any = [];
  id: number;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices,  private route: ActivatedRoute) {
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
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getManagerList();

    this.dataForm = this.fb.group({
      title: ['', Validators.required],
      postlist: ['', Validators.required],
      content: ['', Validators.required],
      link: ['', Validators.required],
      priority: ['', Validators.required],
      status: [''],
    });
  }

  getManagerList() {
    let link = this.serverurl + 'detailsformanagement';
    // let link = 'http://influxiq.com:3001/acesdetails';
    var data = {_id : this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            let userdet = result.item;
            (<FormControl>this.dataForm.controls['title']).setValue(userdet.title);
            (<FormControl>this.dataForm.controls['postlist']).setValue(userdet.postlist);
            (<FormControl>this.dataForm.controls['content']).setValue(userdet.content);
            (<FormControl>this.dataForm.controls['link']).setValue(userdet.link);
            (<FormControl>this.dataForm.controls['priority']).setValue(userdet.priority);
            (<FormControl>this.dataForm.controls['status']).setValue(userdet.status);
          }else {
            this.router.navigate(['/postmanagementlist']);
          }
        }, error => {
          console.log('Oooops!');
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
      let link = this.serverurl + 'editpostmanagement';
      let data = {
        id: this.id,
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
