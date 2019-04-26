import { LetsGoComponent } from './lets-go/lets-go.component';
import { LoanAmountComponent } from './loan-amount/loan-amount.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { ShareHolderDetailComponent } from './share-holder-detail/share-holder-detail.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { BankStatmentComponent } from './bank-statment/bank-statment.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ShareholderDocumentUploadComponent } from './shareholder-document-upload/shareholder-document-upload.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotAppIDComponent } from './forgot-app-id/forgot-app-id.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';

import { Routes, RouterModule } from '@angular/router';
import { ExistingLoanAppComponent } from './existing-loan-app/existing-loan-app.component';
import { ForgotAppIdPasswordComponent } from './forgot-app-id-password/forgot-app-id-password.component';
import { ViewMyappIdComponent } from './view-myapp-id/view-myapp-id.component';
import { MyApplicationComponent } from './my-application/my-application.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { RegisteredOfficeAddressComponent } from './registered-office-address/registered-office-address.component';
import { ParentCompanyAddressComponent } from './parent-company-address/parent-company-address.component';
import { DevNavComponent } from './dev-nav/dev-nav.component';



const appRoutes: Routes = [
  
   {path:'home', component: HomeComponent},//landing page (1)
   {path:'basic',component:BasicDetailsComponent},//new loan first form (2)
   {path:'loan-amount',component:LoanAmountComponent},//new loan first form (2)
   {path:'lets-go',component:LetsGoComponent},//new loan first form (2)
   {path:'shareholder-document',component:ShareholderDocumentUploadComponent},//new loan shareholder document upload (3)
   {path:'statement',component:BankStatmentComponent},//Bank Statement (04)
   {path:'shareholder-detail',component:ShareHolderDetailComponent},//Shareholder Details (05)
   {path:'company-detail',component:CompanyDetailComponent},//Company Details (06)
   {path:'billing-address',component:BillingAddressComponent},//Billing Address (07)
   {path:'registered-address',component:RegisteredOfficeAddressComponent},//Registered Office Address (08)
   {path:'parent-company-address',component:ParentCompanyAddressComponent},//(If) Parent Company Details  (09) 
   {path:'bank-detail',component:LoanDetailComponent},//Bank Details (10)
   {path:'thank-you',component:ThankyouComponent},//last page of appilication Thank you page (11)

   {path:'view-my-app',component:ViewMyappIdComponent},//view my app with otp (12)
   {path:'my-application',component:MyApplicationComponent},//list of existing Application (13)
   {path:'existing-loan-app',component:ExistingLoanAppComponent}, //like login (14)
   {path:'forgot-appid-password',component:ForgotAppIdPasswordComponent},//recover app password (15)
   {path:'forgot-app-id',component:ForgotAppIDComponent},//view my all Application (16)
   {path:'reset-password',component:ResetPasswordComponent},//reset password for Application (17)
   {path:'dev-nav',component:DevNavComponent},//Dev Navigation 


    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);