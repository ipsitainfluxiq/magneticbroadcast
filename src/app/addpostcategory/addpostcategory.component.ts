import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-addpostcategory',
  templateUrl: './addpostcategory.component.html',
  styleUrls: ['./addpostcategory.component.css'],
  providers: [Commonservices],

})
export class AddpostcategoryComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  public serverurl;
  constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      title: ['', Validators.required],
     /* lastname: ['', Validators.required],*/
      description: ['', Validators.required],
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
      let link = this.serverurl + 'addpost';
      let data = {
        firstname: formval.title,
        /*lastname: formval.lastname,*/
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
