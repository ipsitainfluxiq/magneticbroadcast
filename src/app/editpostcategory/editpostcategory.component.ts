import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editpostcategory',
  templateUrl: './editpostcategory.component.html',
  styleUrls: ['./editpostcategory.component.css'],
  providers: [Commonservices],
})
export class EditpostcategoryComponent implements OnInit {
  public fb;
  public serverurl;
  public dataForm: FormGroup;
  public is_error;
  id: number;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices, private route: ActivatedRoute) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getManagerList();

    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
     /* lastname: ['', Validators.required],*/
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: [''],
    });
  }
  getManagerList() {
    let link = this.serverurl + 'details1';
    // let link = 'http://influxiq.com:3001/acesdetails';
    var data = {_id : this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            let userdet = result.item;
            (<FormControl>this.dataForm.controls['firstname']).setValue(userdet.firstname);
         /*   (<FormControl>this.dataForm.controls['lastname']).setValue(userdet.lastname);*/
            (<FormControl>this.dataForm.controls['description']).setValue(userdet.description);
            (<FormControl>this.dataForm.controls['priority']).setValue(userdet.priority);
            (<FormControl>this.dataForm.controls['status']).setValue(userdet.status);
          }else {
            this.router.navigate(['/postcategorylist']);
          }
        }, error => {
          console.log('Oooops!');
        });
  }

  dosubmit(formval) {
    if (formval.status == '') {
      formval.status = false;
    }

    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if (this.dataForm.valid) {
      console.log('inside dataformvaddmanager');
      let link = this.serverurl + 'editpostcategory';
      let data = {
        id: this.id,
        firstname: formval.firstname,
       /* lastname: formval.lastname,*/
        description: formval.description,
        priority: formval.priority,
        status: formval.status,
      };
      this._http.post(link, data)
          .subscribe(res => {
            this.router.navigate(['/postcategorylist']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
