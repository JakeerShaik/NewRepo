import { ShareDoc } from './share-doc';
import { FileUploadService } from './../_services/file-upload.service';
import { AlertService } from './../_services/alert.service';
import { DropDownService } from './../_services/drop-down.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, RequiredValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shareholder-document-upload',
  templateUrl: './shareholder-document-upload.component.html',
  styleUrls: ['./shareholder-document-upload.component.css']
})
export class ShareholderDocumentUploadComponent implements OnInit, AfterViewInit {
  shareholder_doc: FormGroup;
  isSubmitted: boolean = false;
  items: FormArray;
  country = [];
  selectedFile: File;
  appId: string = null;
  trad: boolean = false;
  memo: boolean = false;
  power: boolean = false;
  allnat = [];
  alleid = [];
  allpass = [];
  allvis = [];
  dataItem: any = null;
  showEid = [];
  showPass = [];
  showVisa = [];


  constructor(private router: Router, private frmBuilder: FormBuilder, private http: HttpClient, private dropdown: DropDownService,
    private alert: AlertService, private fileUpload: FileUploadService, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.shareholder_doc = this.frmBuilder.group({

      noOfShareholders: ["1", [Validators.required]],
      companyTradeLicense: ["", [Validators.required]],
      memorandumOfAssociation: ["", [Validators.required]],
      powerOfAttroney: ["", [Validators.required]],
      // boardResolution: ["", [Validators.required]],
      items: this.frmBuilder.array([this.createItem()])


    });
    this.countryList();
    this.appId = JSON.parse(localStorage.getItem("CurrApp"));

  }

  ngAfterViewInit() {
    this.allUploadedData();
    this.shareholderDocWithNationality("load");

  }

  get noOfShareholders() { return this.shareholder_doc.get('noOfShareholders'); }
  get companyTradeLicense() { return this.shareholder_doc.get('companyTradeLicense'); }
  get memorandumOfAssociation() { return this.shareholder_doc.get('memorandumOfAssociation'); }
  get powerOfAttroney() { return this.shareholder_doc.get('powerOfAttroney'); }
  get boardResolution() { return this.shareholder_doc.get('boardResolution'); }

  get nation() { return this.shareholder_doc.get('nation'); }
  get eid() { return this.shareholder_doc.get('eid'); }
  get passport() { return this.shareholder_doc.get('passport'); }

  // File Upload First Three

  onFileChanged(event, type: string) {
    this.alert.removeAlert();
    let url = "";
    if (type == "companyTradeLicense") {
      url = "tradelicense";
    }
    else if (type == "moa") {
      url = "memorandumofassociation"
    }
    else if (type == "poa") {
      url = "powerOfAttorney"
    }

    this.selectedFile = event.target.files[0];
    console.log(event);
    let ext: any = this.selectedFile.name.split('.').pop();
    if (ext != "pdf" && ext != "png" && ext != "jpg" && ext != "jpeg" && ext != "PDF" && ext != "PNG" && ext != "JPG" && ext != "JPEG") {
      this.alert.error("Upload Image (JPEG, JPG, PNG) and PDF only")
      return;
    }
    if (this.selectedFile.size > 10485760) {
      this.alert.error("File is More than 10 MB")
      return;
    }
    // console.log(this.selectedFile.size);
    // console.log(this.selectedFile.name.split('.').pop());
    this.onUpload(type, url);
  }
  onUpload(type: string, url: string) {
    this.alert.removeAlert();
    const uploadData = new FormData();
    uploadData.append(type, this.selectedFile);
    uploadData.append("applicationId", this.appId);
    this.http.post('/' + url, uploadData)
      .subscribe(data => {
        // console.log(data);
        this.allUploadedData();
      },
        error => {

          this.alert.error("Document Not Uploaded Please try again")
          // console.log(error);
        });
  }

  // End of file Upload First Three

  // File Upload ShareHolder

  onFileChangedshare(event, type: string, index: any, country: string) {
    // console.log(country);
    this.alert.removeAlert();

    let data = (<FormArray>this.shareholder_doc.controls.items);
    data.at(index).get("nation").markAsDirty();
    if (!(document.getElementById("nat" + index) as HTMLInputElement).value) {
      if (type == "eid") {
        data.at(index).get("eid").reset();

      }
      else if (type == "passport") {
        data.at(index).get("passport").reset();

      }
      else if (type == "visa") {
        data.at(index).get("visa").reset();

      }
      this.alert.error("Select Nationality first");
      return;
    }

    // data.at(index).get("nation").clearValidators();
    // data.at(index).get("nation").updateValueAndValidity();
    // return;
    let url = "";
    if (type == "eid") {
      url = "emiratesid";
    }
    else if (type == "passport") {
      url = "passport"
    }
    else if (type == "visa") {
      url = "visa"
    }

    this.selectedFile = event.target.files[0];
    // console.log(event);
    let ext: any = this.selectedFile.name.split('.').pop();
    if (ext != "pdf" && ext != "png" && ext != "jpg" && ext != "jpeg" && ext != "PDF" && ext != "PNG" && ext != "JPG" && ext != "JPEG") {
      this.alert.error("Upload Image (JPEG, JPG, PNG) and PDF only")
      return;
    }
    if (this.selectedFile.size > 10485760) {
      this.alert.error("File is More than 10 MB")
      return;
    }
    // console.log(this.selectedFile.size);
    // console.log(this.selectedFile.name.split('.').pop());
    this.onUploadshare(type, url, index, country);
  }
  onUploadshare(type: string, url: string, index: string, country: string) {
    this.alert.removeAlert();
    ((document.getElementById("nat" + index) as HTMLInputElement).required)

    const uploadData = new FormData();
    uploadData.append(type, this.selectedFile);
    uploadData.append("applicationId", this.appId);
    uploadData.append("index", index);
    uploadData.append("nationality", ((document.getElementById("nat" + index) as HTMLInputElement).value));
    uploadData.append("noOfShareHolders", this.noOfShareholders.value);
    this.http.post('/' + url, uploadData)
      .subscribe(data => {
        // console.log(data);
        this.allUploadedData();
        if (type == "eid") {
          this.showEid.push(index)
        }
        if (type == "passport") {
          this.showPass.push(index)
        }
        if (type == "visa") {
          this.showVisa.push(index)
        }
      },
        error => {

          this.alert.error(error.error.message)
          console.log(error.error.message);
        });
  }

  // End of file Upload First Three


  test() {
    this.dataItem = this.items.controls;
    console.log(this.dataItem);


    // this.dataItem[0].controls.clearValidators();
    // this.dataItem[0].controls.updateValueAndValidity();
    // this.items.controls[0].clearValidators();
    // this.items.controls[0].updateValueAndValidity();

  }

  createItem() {
    return this.frmBuilder.group({
      nation: ['', [Validators.required]],
      eid: ['', [Validators.required]],
      passport: ['', [Validators.required]],
      visa: ''
    });

  }
  addItem(num: number): void {

    // this.items = this.shareholder_doc.get('items') as FormArray;
    // this.items.controls = [];
    // for (let _i = 0; _i < num; _i++) {
    //   this.items.push(this.createItem());

    // }
    // this.showEid = [];
    // this.showPass = [];
    // this.showVisa = [];

    //console.log(num);
    this.items = this.shareholder_doc.get('items') as FormArray;
    // console.log(this.items.controls.length)
    // this.items.controls = [];
    let bigger = 0;
    let less = 0;
    if (this.items.controls.length < num) {
      bigger = num - this.items.controls.length
      // console.log(bigger)
      for (let _i = 0; _i < bigger; _i++) {
        this.items.push(this.createItem());

      }
    }

    if (this.items.controls.length > num) {
      this.showEid = []
      this.showPass = []
      this.showVisa = []
      this.items.controls = [];

      this.fileUpload.updateShareholderCount(JSON.parse(localStorage.getItem("CurrApp")), num).
        subscribe(response => {
          // console.log(response)
          this.shareholderDocWithNationality("");
          for (let _i = 0; _i < num; _i++) {
            this.items.push(this.createItem());

          }

        },
          error => {
            this.alert.error(error.error.statusDetails.statusMessage);
            // console.log(error.error.statusMessage)
          })
      // less=this.items.controls.length-num
      // console.log(less)
      // this.items.removeAt(num-1)
      // for (let _i = 0; _i < newNum; _i++) {
      //   this.items.push(this.createItem());

      // }


    }

    // this.showEid=[];
    // this.showPass=[];
    // this.showVisa=[];
  }

  countryList() {
    this.dropdown.CountryList().
      subscribe(data => {
        //  console.log(data);
        this.country = data;

      },
        error => {
          this.alert.error(error.error.statusMessage);
          //console.log(error.error.statusMessage)
        })
  }


  allUploadedData() {
    this.fileUpload.AllUploadedFile(this.appId).
      subscribe(data => {
        // console.log(data);
        if (data.basicDocs.trdaeLicense) {
          this.trad = true;

          // this.shareholder_doc.get('companyTradeLicenseeid').clearValidators();
          this.companyTradeLicense.clearValidators()
          this.companyTradeLicense.updateValueAndValidity()
        }
        if (data.basicDocs.moa) {
          this.memo = true
          this.memorandumOfAssociation.clearValidators();
          this.memorandumOfAssociation.updateValueAndValidity();
        }
        if (data.basicDocs.poa) {
          this.power = true
          this.powerOfAttroney.clearValidators();
          this.powerOfAttroney.updateValueAndValidity();
        }
      },
        error => {
          this.alert.error(error.error.statusDetails.statusMessage);
          //console.log(error.error.statusMessage)
        })
  }


  shareholderDocWithNationality(mode: string) {
    this.showEid = [];
    this.fileUpload.shareholderDocWithNationality(this.appId).
      subscribe(data => {
        // console.log(data);
        if (data.shareholderDocWithNationality) {
          if (mode == "load") {
            // console.log("load")
            this.shareholder_doc.get('noOfShareholders').setValue(data.shareholderDocWithNationality.length);
            this.addItem(data.shareholderDocWithNationality.length);

          }
          let cont = (<FormArray>this.shareholder_doc.controls.items);

          for (let index = 0; index < data.shareholderDocWithNationality.length; index++) {
            cont.at(index).get("nation").setValue(data.shareholderDocWithNationality[index].nationality);

            if (data.shareholderDocWithNationality[index].emiratesIdOrgFileName) {
              this.showEid.push(index)
              cont.at(index).get("eid").clearValidators();
              cont.at(index).get("eid").updateValueAndValidity();
            }
            if (data.shareholderDocWithNationality[index].passportOrgFileName) {
              this.showPass.push(index)
              cont.at(index).get("passport").clearValidators();
              cont.at(index).get("passport").updateValueAndValidity();
            }
            if (data.shareholderDocWithNationality[index].visaOrgFileName) {
              this.showVisa.push(index)
              cont.at(index).get("visa").clearValidators();
              cont.at(index).get("visa").updateValueAndValidity();

            }

          }


        }
        // console.log(this.showEid);
      },
        error => {
          this.alert.error(error.error.statusMessage);
          //console.log(error.error.statusMessage)
        })
  }


  visaRequired(index) {
    let cont = (<FormArray>this.shareholder_doc.controls.items);
    let val = cont.at(index).get("nation").value
    if (val !== "ARE") {
      cont.at(index).get("visa").setValidators([Validators.required])
      cont.at(index).get("visa").updateValueAndValidity();
    } else {
      cont.at(index).get("visa").clearValidators();
      cont.at(index).get("visa").updateValueAndValidity();
    }

  }



  saveAllDoc() {
    this.isSubmitted = true;
    if (!this.shareholder_doc.valid) {
      return;
    }
    this.fileUpload.shareholderDocWithNationality(this.appId).
      subscribe(data => {
        // console.log(data);
        for (let index = 0; index < data.shareholderDocWithNationality.length; index++) {
          this.allnat.push(data.shareholderDocWithNationality[index].nationality)

        }

        let alldata: ShareDoc = {
          applicationId: JSON.parse(localStorage.getItem("CurrApp")),
          noOfShareholders: this.noOfShareholders.value,
          companyTradeLicense: data.basicDocs.trdaeLicenseOrgFileName,
          memorandumOfAssociation: data.basicDocs.moaOrgFileName,
          powerOfAttroney: data.basicDocs.poaOrgFileName,
          shareHolderlist: data.shareholderDocWithNationality

        }


        this.fileUpload.submitShareHolderFile(alldata).
          subscribe(response => {
            // console.log(response);
            //Redirect To another Page
            this.router.navigate(['/statement']);
          },
            error => {
              this.alert.error(error.error.statusDetails.statusMessage);
              // console.log(error.error.statusMessage)
            })

      },
        error => {
          this.alert.error(error.error.statusMessage);
          //console.log(error.error.statusMessage)
        })
  }


  showEidTick(index) {
    this.showEid = index;
  }

}
