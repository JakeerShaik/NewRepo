import { MapJobDocService } from './_services/map-job-doc.service';
import { MapJobColService } from './_services/map-job-col.service';
import { JobTypeService } from './_services/job-type.service';
import { DocumentService } from './_services/document.service';
import { CollateralService } from './_services/collateral.service';
import { AddAgentService } from './_services/add-agent.service';
import { JwtHttpInterceptor } from './jwt-http-interceptor';
import { AuthenticationService } from './_services/authentication.service';
import { AuthGuard } from './_guards/auth.guard';
import { WebUserService } from './_services/web-user.service';

import { AgGridModule } from 'ag-grid-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { routing }        from './app.routing';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { LoginComponent,CopyDirective } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AgentAddComponent } from './agent-add/agent-add.component';
import { CreateCollateralComponent } from './create-collateral/create-collateral.component';
import { WebUserComponent } from './web-user/web-user.component';
import { PassCompareDirective } from './_directive/pass-compare.directive';
import { CreateJobComponent } from './create-job/create-job.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { JobAllocationComponent } from './job-allocation/job-allocation.component';
import { JobTypeComponent } from './job-type/job-type.component';
import { JobColMapComponent } from './job-col-map/job-col-map.component';
import { JobDocMapComponent } from './job-doc-map/job-doc-map.component';
import { LoaderComponent } from './loader/loader.component';
import { OutstandingJobComponent } from './outstanding-job/outstanding-job.component';
import { CompletedJobComponent } from './completed-job/completed-job.component';
import { PendingJobComponent } from './pending-job/pending-job.component';
import { JobReallocationComponent } from './job-reallocation/job-reallocation.component';
import { JobReassignComponent } from './job-reassign/job-reassign.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    AgentAddComponent,
    CreateCollateralComponent,
    WebUserComponent,
    PassCompareDirective,
    CreateJobComponent,
    CreateDocumentComponent,
    JobAllocationComponent,
    JobTypeComponent,
    JobColMapComponent,
    JobDocMapComponent,
    LoaderComponent,
    OutstandingJobComponent,
    CopyDirective,
    CompletedJobComponent,
    PendingJobComponent,
    JobReallocationComponent,
    JobReassignComponent
  
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([]),
    NgMultiSelectDropDownModule.forRoot(),
    MyDatePickerModule 
    
    // AngularDateTimePickerModule
    // NgbModule.forRoot()

  ],
  providers: [
AuthGuard,
AuthenticationService,
WebUserService,
AddAgentService,
CollateralService,
DocumentService,
JobTypeService,
MapJobColService,
MapJobDocService,
{
  provide: HTTP_INTERCEPTORS,
  useClass: JwtHttpInterceptor,
  multi: true
},
{ provide: APP_BASE_HREF, useValue: '', }
, { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
