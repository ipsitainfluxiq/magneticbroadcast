import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-dealersignup',
  templateUrl: './dealersignup.component.html',
  styleUrls: ['./dealersignup.component.css'],
  providers: [Commonservices],
})
export class DealersignupComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  private passmatchvalidate;
  public serverurl;
  static invalidemail;
  static blankemail;
  private zone: NgZone;
  public basicOptions: Object;
  public progress: number = 0;
  private response: any = {};
  public uploadedfilesrc: any;
  public imagename: any;
  public is_error: any;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    DealersignupComponent.blankemail = false;
    DealersignupComponent.invalidemail = false;
  }

  ngOnInit() {
    this.passmatchvalidate = false;
    this.dataForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      image: [''],
      /*link: ['', Validators.required],*/
      email: ['', Validators.compose([Validators.required, DealersignupComponent.validateEmail])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confpassword: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      link: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'confpassword')});


    this.zone = new NgZone({enableLongStackTrace: false});
    this.basicOptions = {
      url: this.serverurl + 'uploads'
    };

  }
  handleUpload(data: any): void // uploading the images and saving to particular folder
  {
    console.log('hi');
    console.log(data);
    this.zone.run(() => {
      this.response = data;
      this.progress = data.progress.percent;
      console.log(data.progress.percent);
      if (data.progress.percent == 100) {
        let resp = data.response;
        console.log('resp');
        console.log((resp));
        console.log(typeof(resp));
        if (typeof(resp) != 'undefined') {
          let result = (data.response);
          console.log('result');
          console.log(result);
          if (result.length > 1) {
            // this.dataForm.patchValue({image: result.filename});
            this.dataForm.patchValue({image: result});
            this.uploadedfilesrc = '../../assets/images/uploads/' + resp.replace(/"/g, '');
            console.log('upload file location' + this.uploadedfilesrc);
            // this.imagename = result.filename;
            this.imagename = result.replace(/"/g, '');
            console.log('imagename');
            console.log(this.imagename);
          }
        }
      }
    });
  }


  static validateEmail(control: FormControl) {
    DealersignupComponent.blankemail = false;
    DealersignupComponent.invalidemail = false;

    if (control.value == '') {
      DealersignupComponent.blankemail = true;
      return {'invalidemail': true};
    }
    if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      DealersignupComponent.invalidemail = true;
      return {'invalidemail': true};
    }
  }

  getemail(type: any) {
    //  console.log('t ' + type);
    if (type == 'invalid') {
      return DealersignupComponent.invalidemail;
    }
    if (type == 'blank') {
      return DealersignupComponent.blankemail;
    }
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        console.log('mismatch');
        // console.log(this.dataForm.controls['confirmpassword'].valid);
        return {
          mismatchedPasswords: true
        };
      }
      else {
        this.passmatchvalidate = true;
      }
    };
  }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    console.log('inside submit');
    if (this.dataForm.valid && this.passmatchvalidate && (DealersignupComponent.invalidemail == false || DealersignupComponent.blankemail == false)) {
      console.log('inside dataformvalid');
      //  let link = 'http://localhost:3002/addadmin';
      formval.image = formval.image.replace(/"/g, '');
      let link = this.serverurl + 'adddealership';
      let data = {
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        password: formval.password,
        address: formval.address,
        city: formval.city,
        state: formval.state,
        zip: formval.zip,
        phone: formval.phone,
        image: formval.image,
        link: formval.link,
      };
      this._http.post(link, data)
          .subscribe(res => {
            this.router.navigate(['/dealershiplist']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }


  deleteimage(imagename: any) {
    console.log(imagename);
    var link = this.serverurl + 'deleteimage';
    // var link ='http://influxiq.com:3001/deleteimage';
    var data = {id: '', image: imagename};
    // console.log(data);

    this._http.post(link, data)
        .subscribe(res => {
          var result = res.json();
          // var result = res;

          if (result.status == 'success') {
            console.log('Image Deleted');
            this.uploadedfilesrc = '';
            this.progress = 0;

            this.is_error = 1;
          }

        }, error => {
          console.log("Oooops!");
        });


  }
}

