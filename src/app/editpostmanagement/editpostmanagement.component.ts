import {NgZone, Component, OnInit } from '@angular/core';
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
      image: [''],
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

  getManagerList() {
    let link = this.serverurl + 'detailsformanagement';
    // let link = 'http://influxiq.com:3001/acesdetails';
    var data = {_id : this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            let userdet = result.item;
            this.imgsrc = '../../assets/images/uploads/' + userdet.image;
            this.userdata = userdet;
            (<FormControl>this.dataForm.controls['title']).setValue(userdet.title);
            (<FormControl>this.dataForm.controls['postlist']).setValue(userdet.postlist);
            (<FormControl>this.dataForm.controls['content']).setValue(userdet.content);
            (<FormControl>this.dataForm.controls['link']).setValue(userdet.link);
            (<FormControl>this.dataForm.controls['priority']).setValue(userdet.priority);
            (<FormControl>this.dataForm.controls['status']).setValue(userdet.status);
            if (userdet.image == "") {this.is_error = 1}; // No image =1
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

    formval.image = formval.image.replace(/"/g, '');

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
        image: formval.image,
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

  deleteimage() {
    let link = this.serverurl + 'deleteimage';
    let data = { id: this.id, image: this.userdata.image};
    // console.log(data);

    this._http.post(link, data)
        .subscribe(res => {
          let result = res.json();
          if (result.status == 'success') {
            console.log('Image Deleted');
            //   this.uploadedfilesrc = '';
            //  this.imagename = '';
            //  this.progress = 0;
            this.is_error = 1;
          }
        }, error => {
          console.log('Oooops!');
        });
  }
}
