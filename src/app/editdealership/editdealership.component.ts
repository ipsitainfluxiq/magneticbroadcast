import {NgZone, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {Http} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
@Component({
  selector: 'app-editdealership',
  templateUrl: './editdealership.component.html',
  styleUrls: ['./editdealership.component.css'],
  providers: [Commonservices],
})
export class EditdealershipComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  public serverurl;
  public postcategorylist: any = [];
  id: number;
  private zone: NgZone;
  public basicOptions: Object;
  public progress: number = 0;
  private response: any = {};
  public uploadedfilesrc: any;
  public is_error;
  public imagename: any;
  public imgsrc: any;
  public userdata: any;

  constructor(fb: FormBuilder, private _http: Http, private router: Router, private _commonservices: Commonservices,  private route: ActivatedRoute) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getdetails();

    this.dataForm = this.fb.group({

      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      link: ['', Validators.required],
      image: [''],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.zone = new NgZone({ enableLongStackTrace: false });
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
      this.progress = data.progress.percent ;
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
            this.dataForm.patchValue({image: result});
            this.uploadedfilesrc =   '../../assets/images/uploads/' + resp.replace(/"/g, '');
            this.imgsrc =   '../../assets/images/uploads/' + resp.replace(/"/g, '');
            console.log('upload file location' + this.uploadedfilesrc);
            this.imagename = result.replace(/"/g, '');
            console.log('imagename');
            console.log(this.imagename);
            console.log(this.uploadedfilesrc);
            this.is_error = 0   ;
          }
        }
      }
    });

  }

  getdetails() {
    let link = this.serverurl + 'detailsofdealer';
    let data = {_id : this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          console.log(result);
          console.log(result.status);
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            let userdet = result.item;
            this.imgsrc = '../../assets/images/uploads/' + userdet.image;
            this.userdata = userdet;
            (<FormControl>this.dataForm.controls['firstname']).setValue(userdet.firstname);
            (<FormControl>this.dataForm.controls['lastname']).setValue(userdet.lastname);
            (<FormControl>this.dataForm.controls['link']).setValue(userdet.link);
            (<FormControl>this.dataForm.controls['email']).setValue(userdet.email);
            (<FormControl>this.dataForm.controls['address']).setValue(userdet.address);
            (<FormControl>this.dataForm.controls['city']).setValue(userdet.city);
            (<FormControl>this.dataForm.controls['state']).setValue(userdet.state);
            (<FormControl>this.dataForm.controls['zip']).setValue(userdet.zip);
            (<FormControl>this.dataForm.controls['phone']).setValue(userdet.phone);
            if (userdet.image == "") {this.is_error = 1}; // No image =1
          }else {
            this.router.navigate(['/dealershiplist']);
          }
        }, error => {
          console.log('Ooops');
        });
  }

  dosubmit(formval) {
    if(formval.status==''){
      formval.status = false;
    }
    formval.image = formval.image.replace(/"/g, '');

    if (this.dataForm.valid) {
      let link= this.serverurl + 'editdealer';
      let data = {
        id: this.id,
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        address: formval.address,
        city: formval.city,
        state: formval.state,
        zip: formval.zip,
        phone: formval.phone,
        link: formval.link,
        image: formval.image
      };
      console.log(data);
      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/dealershiplist']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }
  deleteimage() {
    let link = this.serverurl + 'deleteimage';
    let data = { id: this.id, image: this.userdata.image};
    // console.log(data);

    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            console.log('Image Deleted');
            this.is_error = 1;
          }
        }, error => {
          console.log('Oooops!');
        });
  }
}
