import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
 import {appRoutingProviders, routing} from './route';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { OrderBy } from './orderby';
import { UsersearchPipe } from './search.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditadminComponent } from './editadmin/editadmin.component';
import { AdminleftsidebarComponent } from './adminleftsidebar/adminleftsidebar.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LoginComponent } from './login/login.component';
import { AdddealershipComponent } from './adddealership/adddealership.component';
import { Ng2UploaderModule } from 'ng2-uploader';
import { DealershiplistComponent } from './dealershiplist/dealershiplist.component';
import { AddpostcategoryComponent } from './addpostcategory/addpostcategory.component';
import { PostcategorylistComponent } from './postcategorylist/postcategorylist.component';
import { EditpostcategoryComponent } from './editpostcategory/editpostcategory.component';
import { DealersignupComponent } from './dealersignup/dealersignup.component';
import { PostmanagementComponent } from './postmanagement/postmanagement.component';
import { PostmanagementlistComponent } from './postmanagementlist/postmanagementlist.component';
import { EditpostmanagementComponent } from './editpostmanagement/editpostmanagement.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Leadpage1Component } from './leadpage1/leadpage1.component';
import { FacebookModule } from 'ngx-facebook';
import { Leadpage2Component } from './leadpage2/leadpage2.component';
import { TwitterService } from 'ng2-twitter';
import { LeadlistComponent } from './leadlist/leadlist.component';
import { MyleadsComponent } from './myleads/myleads.component';
import { SubscribedcategoriesComponent } from './subscribedcategories/subscribedcategories.component';
import { SubscribedpostsComponent } from './subscribedposts/subscribedposts.component';
import { ViewallpostmanagementComponent } from './viewallpostmanagement/viewallpostmanagement.component';
import { ViewallcategoryComponent } from './viewallcategory/viewallcategory.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MetaComponent } from './meta/meta.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AccesscodeComponent } from './accesscode/accesscode.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { EditdealershipComponent } from './editdealership/editdealership.component';

@NgModule({
  declarations: [
    AppComponent,
    AddadminComponent,
    AdminheaderComponent,
    AdminlistComponent,
    OrderBy,
    UsersearchPipe,
    EditadminComponent,
    AdminleftsidebarComponent,
    LoginComponent,
    AdddealershipComponent,
    DealershiplistComponent,
    AddpostcategoryComponent,
    PostcategorylistComponent,
    EditpostcategoryComponent,
    DealersignupComponent,
    PostmanagementComponent,
    PostmanagementlistComponent,
    EditpostmanagementComponent,
    DashboardComponent,
    Leadpage1Component,
    Leadpage2Component,
    LeadlistComponent,
    ViewallpostmanagementComponent,
    ViewallcategoryComponent,
    SubscribedcategoriesComponent,
    MetaComponent,
    MyleadsComponent,
    SubscribedpostsComponent,
    ChangepasswordComponent,
    ForgetpasswordComponent,
    AccesscodeComponent,
    NewpasswordComponent,
    EditdealershipComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    Ng2UploaderModule,
    ClipboardModule,
    FacebookModule.forRoot(),
   // MetaModule.forRoot()
  ],
  providers: [appRoutingProviders, CookieService, TwitterService],
  bootstrap: [AppComponent],
})
export class AppModule { }
