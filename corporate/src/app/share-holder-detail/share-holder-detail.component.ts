import { BasicDetailsService } from './../_services/basic-details.service';
import { AlertService } from './../_services/alert.service';
import { DropDownService } from './../_services/drop-down.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { ShareHolder } from './share-holder';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-share-holder-detail',
  templateUrl: './share-holder-detail.component.html',
  styleUrls: ['./share-holder-detail.component.css']
})
export class ShareHolderDetailComponent implements OnInit {
  share_holders: FormGroup;
  isSubmitted: boolean = false;
  country = [];
  designation = [];
  shareHolderCount: any = null;
  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";
  borrowerDetailsForm = [];
  exShareholder = [];
  totShare = [];
  step = 0;

  month: any;
  year: any;
  public min: any = null;
  public max: any = null;
  public maxdate: any = null;
  today = new Date();
  jstoday: any;

  testData = ["dd", "aa"];

  constructor(private router: Router, private frmBuilder: FormBuilder, private dropdown: DropDownService,
    private alert: AlertService, private basic: BasicDetailsService) {
    this.jstoday = formatDate(this.today, 'dd', 'en-US');

  }

  ngOnInit() {
    this.share_holders = this.frmBuilder.group({
      title: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
      middleName: ["", [Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]*$')]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
      gender: ["", [Validators.required]],
      designationCode: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      emailId: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(50), Validators.pattern(this.emailPattern)]],
      dateofBirth: ["", [Validators.required]],
      sharePercentage: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern("^[0-9]*$")]],
      mobileNumber: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^0[0-9]*$")]],
      martialStatus: ["", [Validators.required]],
      eidNumber: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(15), Validators.pattern("^[0-9]*$")]],
      expirydate: ["", [Validators.required,]],
      nationality: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      passportNumber: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      passportExpiryDate: ["", [Validators.required]],
      visaNumber: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      visaExpiryDate: ["", [Validators.required]],
      uaeAddress: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(200)]],
      homeCountryAddress: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(200)]],
      index: ["", []],

    });

    this.countryList();
    this.desig();
    this.AllShareHolder();
    this.formControlValueChanged();

    this.year = this.today.getFullYear()
    this.month = this.today.getMonth()

    this.min = new Date(this.year, this.month, this.jstoday, 10, 30);
    this.maxdate = new Date(this.year - 120, this.month, this.jstoday, 10, 30);
    this.max = new Date(this.year - 22, this.month, this.jstoday, 10, 30);


    // let data = JSON.parse(localStorage.getItem("shareholder"));

    //for one shareHolder
    if (JSON.parse(localStorage.getItem("shareholder"))) {
      // if (JSON.parse(localStorage.getItem("shareholder")).length == 1) {
        this.shareHoderSelect(0)
      // }
    }


  }



  get title() { return this.share_holders.get('title'); }
  get firstName() { return this.share_holders.get('firstName'); }
  get middleName() { return this.share_holders.get('middleName'); }
  get lastName() { return this.share_holders.get('lastName'); }
  get gender() { return this.share_holders.get('gender'); }
  get designationCode() { return this.share_holders.get('designationCode'); }
  get emailId() { return this.share_holders.get('emailId'); }
  get dateofBirth() { return this.share_holders.get('dateofBirth'); }
  get sharePercentage() { return this.share_holders.get('sharePercentage'); }
  get mobileNumber() { return this.share_holders.get('mobileNumber'); }
  get martialStatus() { return this.share_holders.get('martialStatus'); }
  get eidNumber() { return this.share_holders.get('eidNumber'); }
  get expirydate() { return this.share_holders.get('expirydate'); }
  get nationality() { return this.share_holders.get('nationality'); }
  get passportNumber() { return this.share_holders.get('passportNumber'); }
  get passportExpiryDate() { return this.share_holders.get('passportExpiryDate'); }
  get visaNumber() { return this.share_holders.get('visaNumber'); }
  get visaExpiryDate() { return this.share_holders.get('visaExpiryDate'); }
  get homeCountryAddress() { return this.share_holders.get('homeCountryAddress'); }
  get uaeAddress() { return this.share_holders.get('uaeAddress'); }
  get index() { return this.share_holders.get('index'); }



  countryList() {
    this.dropdown.CountryList().
      subscribe(data => {
        // console.log(data);
        this.country = data;

      },
        error => {
          this.alert.error(error.error.statusMessage);
          console.log(error.error.statusMessage)
        })
  }

  desig() {
    this.dropdown.OccupationLevel().
      subscribe(data => {
        // console.log(data);
        this.designation = data;

      },
        error => {
          this.alert.error(error.error.statusMessage);
          console.log(error.error.statusMessage)
        })
  }


  popupbox(id: string) {
    alert(id);
  }

  save(event) {
    this.isSubmitted = true;
    this.index.value;
    if (!this.share_holders.valid) {
      return;
    }
    this.exShareholder = [];
    this.borrowerDetailsForm = [];
    this.exShareholder = JSON.parse(localStorage.getItem("shareholder"));
    if (this.exShareholder) {
      
      if (this.shareHolderCount.length == this.exShareholder.length) {

        this.saveShareHolder(event);
        return;
      }
      this.borrowerDetailsForm = this.exShareholder;
      this.borrowerDetailsForm.push(this.share_holders.value)

      // console.log(this.borrowerDetailsForm);

    }
    else {

      this.borrowerDetailsForm.push(this.share_holders.value)

    }
    // console.log(this.borrowerDetailsForm.length)

    localStorage.setItem("shareholder", JSON.stringify(this.borrowerDetailsForm));
    this.isSubmitted = false;
    this.share_holders.reset();
    this.exShareholder = JSON.parse(localStorage.getItem("shareholder"));
    this.step = this.exShareholder.length;
    if (this.shareHolderCount.length == this.exShareholder.length) {

      this.saveShareHolder(event);

    }
    // data.splice(0, 1, this.share_holders.value);
    // console.log(data);
  }


  AllShareHolder() {
    this.basic.getAppDetail(JSON.parse(localStorage.getItem("CurrApp"))).
      subscribe(data => {
        this.shareHolderCount = data.shareHolderDocs;
        // console.log(data.listOfShareHolderDetails);
        // localStorage.setItem("shareholder", JSON.stringify(data.listOfShareHolderDetails));

      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          console.log(error.error.statusDetails.statusMessage)
        })
  }

  shareHoderSelect($event: any) {
    // this.isSubmitted=true;
    // if(!this.share_holders.valid)
    // {
    //   return;
    // }
    this.step = $event;
    let data = JSON.parse(localStorage.getItem("shareholder"));
    if (data[$event]) {
      // console.log(data[$event]);
      this.share_holders.get('title').setValue(data[$event].title);
      this.share_holders.get('firstName').setValue(data[$event].firstName);
      this.share_holders.get('middleName').setValue(data[$event].middleName);
      this.share_holders.get('lastName').setValue(data[$event].lastName);
      this.share_holders.get('gender').setValue(data[$event].gender);
      this.share_holders.get('designationCode').setValue(data[$event].designationCode);
      this.share_holders.get('emailId').setValue(data[$event].emailId);
      this.share_holders.get('dateofBirth').setValue(data[$event].dateofBirth);
      this.share_holders.get('sharePercentage').setValue(data[$event].sharePercentage);
      this.share_holders.get('mobileNumber').setValue(data[$event].mobileNumber);
      this.share_holders.get('martialStatus').setValue(data[$event].martialStatus);
      this.share_holders.get('eidNumber').setValue(data[$event].eidNumber);
      this.share_holders.get('expirydate').setValue(data[$event].expirydate);
      this.share_holders.get('nationality').setValue(data[$event].nationality);
      this.share_holders.get('passportNumber').setValue(data[$event].passportNumber);
      this.share_holders.get('passportExpiryDate').setValue(data[$event].passportExpiryDate);
      this.share_holders.get('visaNumber').setValue(data[$event].visaNumber);
      this.share_holders.get('visaExpiryDate').setValue(data[$event].visaExpiryDate);
      this.share_holders.get('homeCountryAddress').setValue(data[$event].homeCountryAddress);
      this.share_holders.get('uaeAddress').setValue(data[$event].uaeAddress);
      this.share_holders.get('index').setValue($event);

      console.log(this.share_holders.value)
    }
    else {
      this.share_holders.reset();
    }
  }

  saveShareHolder(event) {
    let data: ShareHolder = {
      applicationId: JSON.parse(localStorage.getItem("CurrApp")),
      borrowerDetailsForm: JSON.parse(localStorage.getItem("shareholder"))
    }

    this.basic.saveShareHolderDetail(data).
      subscribe(data => {
        // console.log(event)
        if (event == 'saveandexit') {
          this.router.navigate(['/home']);

        } else {
          this.router.navigate(['/billing-address']);

        }

        console.log(data);

      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          console.log(error.error.statusDetails.statusMessage)
        })
  }




  formControlValueChanged() {

    const visaNumber = this.share_holders.get('visaNumber');
    const visaexp = this.share_holders.get('visaExpiryDate');

    this.share_holders.get('nationality').valueChanges.subscribe(
      (mode: string) => {
        // console.log(mode);
        if (mode !== 'ARE') {
          visaNumber.setValidators([Validators.required]);
          visaexp.setValidators([Validators.required]);
        }
        else {
          visaNumber.clearValidators();
          visaexp.clearValidators();
        }
        visaNumber.updateValueAndValidity();
        visaexp.updateValueAndValidity();
      });
  }


}

