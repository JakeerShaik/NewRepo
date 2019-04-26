
import { LetsGoComponent } from './lets-go/lets-go.component';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './_services/loader.service';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { JwtHttpInterceptor } from './jwt-http-interceptor';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { LoaderComponent } from './loader/loader.component';
import { ExistingLoanAppComponent } from './existing-loan-app/existing-loan-app.component';
import { ForgotAppIdPasswordComponent } from './forgot-app-id-password/forgot-app-id-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotAppIDComponent } from './forgot-app-id/forgot-app-id.component';
import { ShareholderDocumentUploadComponent } from './shareholder-document-upload/shareholder-document-upload.component';
import { ViewMyappIdComponent } from './view-myapp-id/view-myapp-id.component';
import { MyApplicationComponent } from './my-application/my-application.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { BankStatmentComponent } from './bank-statment/bank-statment.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { ShareHolderDetailComponent } from './share-holder-detail/share-holder-detail.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { RegisteredOfficeAddressComponent } from './registered-office-address/registered-office-address.component';
import { ParentCompanyAddressComponent } from './parent-company-address/parent-company-address.component';
import { DevNavComponent } from './dev-nav/dev-nav.component';
import { SidebarLabelComponent } from './sidebar-label/sidebar-label.component';
import { EmployerDetailComponent } from './employer-detail/employer-detail.component';
import { LoanAmountComponent } from './loan-amount/loan-amount.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ApprovedComponent } from './approved/approved.component';
import { DeclinedComponent } from './declined/declined.component';
import { AgreeComponent } from './agree/agree.component';
import { DropDownService } from './_services/drop-down.service';
import { ProductComponent } from './product/product.component';
import { TermsOfLoanComponent } from './terms-of-loan/terms-of-loan.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { QuotationComponent } from './quotation/quotation.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';
import { MyDatePickerModule } from 'mydatepicker';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { DigitalConsentComponent } from './digital-consent/digital-consent.component';
import { FaqComponent } from './faq/faq.component';
import { TermAndconditionArabicComponent } from './term-andcondition-arabic/term-andcondition-arabic.component';
import { DigitalConsentArabicComponent } from './digital-consent-arabic/digital-consent-arabic.component';
import { FaqArabicComponent } from './faq-arabic/faq-arabic.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_FORMATS,OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const MY_NATIVE_FORMATS = {
  fullPickerInput: 'yyyy-MM-dd',
  datePickerInput: 'yyyy-MM-dd',
  timePickerInput: 'yyyy-MM-dd HH:mm:ss'
};
export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'LL LT',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BasicDetailsComponent,
    LoaderComponent,
    ExistingLoanAppComponent,
    ForgotAppIdPasswordComponent,
    ResetPasswordComponent,
    ForgotAppIDComponent,
    ShareholderDocumentUploadComponent,
    ViewMyappIdComponent,
    MyApplicationComponent,
    ThankyouComponent,
    BankStatmentComponent,
    CompanyDetailComponent,
    ShareHolderDetailComponent,
    LoanDetailComponent,
    BillingAddressComponent,
    RegisteredOfficeAddressComponent,
    ParentCompanyAddressComponent,
    DevNavComponent,
    SidebarLabelComponent,
    EmployerDetailComponent,
    LoanAmountComponent,
    LetsGoComponent,
    ApprovedComponent,
    DeclinedComponent,
    AgreeComponent,
    ProductComponent,
    TermsOfLoanComponent,
    AppointmentComponent,
    QuotationComponent,
    AlertComponent,
    TermConditionComponent,
    DigitalConsentComponent,
    FaqComponent,
    TermAndconditionArabicComponent,
    DigitalConsentArabicComponent,
    FaqArabicComponent,
    



  ],
  imports: [
    Ng5SliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule, 
    MyDatePickerModule, 
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    OwlDateTimeModule,
        OwlNativeDateTimeModule,
 
  ],
  providers: [
    AuthGuard,
    LoaderService,
    DropDownService,
    AlertService,
    CurrencyPipe,
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtHttpInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '', }
, { provide: LocationStrategy, useClass: HashLocationStrategy },
{provide: OWL_DATE_TIME_LOCALE, useValue: 'en-in'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
