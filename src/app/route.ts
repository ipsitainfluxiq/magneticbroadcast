/**
 * Created by kta pc on 7/18/2017.
 */


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import {AdminlistComponent} from './adminlist/adminlist.component';
import {EditadminComponent} from './editadmin/editadmin.component';
import {AdminleftsidebarComponent} from './adminleftsidebar/adminleftsidebar.component';
import {LoginComponent} from './login/login.component';
import {AdddealershipComponent} from './adddealership/adddealership.component';
import {DealershiplistComponent} from './dealershiplist/dealershiplist.component';
import {AddpostcategoryComponent} from './addpostcategory/addpostcategory.component';
import {PostcategorylistComponent} from './postcategorylist/postcategorylist.component';
import {EditpostcategoryComponent} from './editpostcategory/editpostcategory.component';
import {DealersignupComponent} from './dealersignup/dealersignup.component';
import {PostmanagementComponent} from './postmanagement/postmanagement.component';
import {PostmanagementlistComponent} from './postmanagementlist/postmanagementlist.component';
import {EditpostmanagementComponent} from './editpostmanagement/editpostmanagement.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Leadpage1Component} from './leadpage1/leadpage1.component';
import {Leadpage2Component} from './leadpage2/leadpage2.component';
import {LeadlistComponent} from './leadlist/leadlist.component';
import {ViewallpostmanagementComponent} from './viewallpostmanagement/viewallpostmanagement.component';
import {ViewallcategoryComponent} from './viewallcategory/viewallcategory.component';


const appRoutes: Routes = [
    { path: 'addadmin', component: AddadminComponent},
    { path: 'adminheader', component: AdminheaderComponent},
   { path: 'adminlist', component: AdminlistComponent},
    { path: 'editadmin/:id', component: EditadminComponent},
    { path: 'adminleftsidebar', component: AdminleftsidebarComponent},
    { path: '', component: LoginComponent},
    { path: 'adddealership', component: AdddealershipComponent},
    { path: 'dealershiplist', component: DealershiplistComponent},
    { path: 'addpostcategory', component: AddpostcategoryComponent},
    { path: 'postcategorylist', component: PostcategorylistComponent},
    { path: 'editpostcategory/:id', component: EditpostcategoryComponent},
    { path: 'dealersignup', component: DealersignupComponent},
    { path: 'postmanagement', component: PostmanagementComponent},
    { path: 'postmanagementlist', component: PostmanagementlistComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'offer1/:id', component: Leadpage1Component},
    { path: 'offer2/:id', component: Leadpage2Component},
    { path: 'leadlist', component: LeadlistComponent},
    { path: 'viewallpostmanagement', component: ViewallpostmanagementComponent},
    { path: 'viewallcategory', component: ViewallcategoryComponent},
    { path: 'editpostmanagementcategory/:id', component: EditpostmanagementComponent},

];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });