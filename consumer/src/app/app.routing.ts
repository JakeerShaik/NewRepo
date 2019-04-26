import { FaqArabicComponent } from './faq-arabic/faq-arabic.component';
import { DigitalConsentArabicComponent } from './digital-consent-arabic/digital-consent-arabic.component';
import { FaqComponent } from './faq/faq.component';
import { DigitalConsentComponent } from './digital-consent/digital-consent.component';
import { QuotationComponent } from './quotation/quotation.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ProductComponent } from './product/product.component';
import { AgreeComponent } from './agree/agree.component';
import { DeclinedComponent } from './declined/declined.component';
import { ApprovedComponent } from './approved/approved.component';
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
import { DevNavComponent } from './dev-nav/dev-nav.component';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';
import { LoanAmountComponent } from './loan-amount/loan-amount.component';
import { LetsGoComponent } from './lets-go/lets-go.component';
import { TermsOfLoanComponent } from './terms-of-loan/terms-of-loan.component';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { TermAndconditionArabicComponent } from './term-andcondition-arabic/term-andcondition-arabic.component';



const appRoutes: Routes = [
  
   {path:'home', component: HomeComponent},//landing page (1)
   {path:'basic',component:BasicDetailsComponent},//new loan first form (2)
   {path:'product',component:ProductComponent,canActivate:[AuthGuard]},//Product Selection (3)
   {path:'loan-amount',component:LoanAmountComponent,canActivate:[AuthGuard]},//new loan first form (2)
   {path:'quotation',component:QuotationComponent,canActivate:[AuthGuard]},//Quotation (2)
  //  {path:'terms-of-loan',component:TermsOfLoanComponent},//new loan first form (2)
   {path:'lets-go',component:LetsGoComponent,canActivate:[AuthGuard]},//new loan first form (2)

   {path:'document-upload',component:ShareholderDocumentUploadComponent,canActivate:[AuthGuard]},//new loan shareholder document upload (3)

   {path:'personal-detail',component:ShareHolderDetailComponent,canActivate:[AuthGuard]},//Shareholder Details (05)

   {path:'registered-address',component:RegisteredOfficeAddressComponent,canActivate:[AuthGuard]},//Registered Office Address (08)
   {path:'employer-detail',component:EmployerDetailComponent,canActivate:[AuthGuard]},//Registered Office Address (08)
   {path:'bank-detail',component:LoanDetailComponent,canActivate:[AuthGuard]},//Loan Details (10)
   {path:'agree',component:AgreeComponent,canActivate:[AuthGuard]},//Accept Temrm and condition (10)
   {path:'approved',component:ApprovedComponent,canActivate:[AuthGuard]},//approved (11)
   {path:'appointment',component:AppointmentComponent,canActivate:[AuthGuard]},//approved (11)
   {path:'declined',component:DeclinedComponent},//approved (11)
   {path:'thank-you',component:ThankyouComponent},//last page of appilication Thank you page (11)

   {path:'view-my-app',component:ViewMyappIdComponent},//view my app with otp (12)
   {path:'my-application',component:MyApplicationComponent,canActivate:[AuthGuard]},//list of existing Application (13)
   {path:'existing-loan-app',component:ExistingLoanAppComponent}, //like login (14)
   {path:'forgot-appid-password',component:ForgotAppIdPasswordComponent},//recover app password (15)
  // {path:'forgot-app-id',component:ForgotAppIDComponent},//view my all Application (16)
   {path:'reset-password',component:ResetPasswordComponent},//reset password for Application (17)
   //{path:'dev-nav',component:DevNavComponent},//Dev Navigation 
   {path:'terms-condition',component:TermConditionComponent},
   {path:'digital-consent',component:DigitalConsentComponent},
   {path:'faq',component:FaqComponent},
   {path:'term-condition-arabic',component:TermAndconditionArabicComponent},
   {path:'digital-consent-arabic',component:DigitalConsentArabicComponent},
   {path:'faq-arabic',component:FaqArabicComponent},


    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);