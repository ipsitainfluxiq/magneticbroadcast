/**
 * Created by kta pc on 7/25/2017.
 */
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
    url: any;
    client_id: any;
    client_secret: any;

    constructor(private http: Http) {
        if (window.location.hostname == 'localhost') {
            this.url = 'http://localhost:3005/';
            this.client_id = '282783638866697';  //app id
            this.client_secret = '2c95a6da97d7052a6ee84410f140a922';
        } else {
            this.url = 'http://influxiq.com:3015/';
            this.client_id = '282783638866697';
            this.client_secret = '2c95a6da97d7052a6ee84410f140a922';
        }

    }



}