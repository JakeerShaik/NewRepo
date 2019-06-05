import { MapJobDocService } from './../_services/map-job-doc.service';
import { DocumentService } from './../_services/document.service';
import { JobTypeService } from './../_services/job-type.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-doc-map',
  templateUrl: './job-doc-map.component.html',
  styleUrls: ['./job-doc-map.component.css']
})
export class JobDocMapComponent implements OnInit {

  editdDocMap: FormGroup;
  docmapform: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  editresult: any = null;
  loading = false;
  editloading = false;
  rowData = [];
  myData = [];

  jobtype = [];
  document = [];
  documentedit = [];
  dropdownList = [];
  selectedItemsdoc = [];
  selectedItemsdocedit = [];
  dropdownSettings = {};
  dropdownSettingsedit = {};

  constructor(private frmBuilder: FormBuilder,
    private http: HttpClient, private docservice: DocumentService,
    private jobTypeServices: JobTypeService,
    private mapDocservice: MapJobDocService) {


  }

  ngOnInit() {
    this.docmapform = this.frmBuilder.group({
      job: ["", [Validators.required]],
      doc: ["", [Validators.required]],
    });

    this.editdDocMap = this.frmBuilder.group({
      jobTypeCode: ["", [Validators.required]],
      documentCode: ["", [Validators.required]],
      jobTypeName: ["", [Validators.required]],
    });


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'docCode',
      textField: 'docName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.dropdownSettingsedit = {
      singleSelection: false,
      idField: 'docCode',
      textField: 'docName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };


    this.getDoc();
    this.getJobType();
    this.getAllJobDocMap();
  }

  get job() { return this.docmapform.get('job'); }
  get doc() { return this.docmapform.get('doc'); }

  get jobTypeCode() { return this.editdDocMap.get('jobTypeCode'); }
  get documentCode() { return this.editdDocMap.get('documentCode'); }
  get jobTypeName() { return this.editdDocMap.get('jobTypeName'); }


  save() {
    this.result = "";
    this.isSubmitted = true;
    if (!this.docmapform.valid)
      return;
    this.loading = true;

    this.mapDocservice.mapJobDoc(this.docmapform.value).
      subscribe(
        data => {
          //console.log(data.serviceStatus.statusCode);
          if (data.serviceStatus.statusCode == 9101) {
            this.getAllJobDocMap();
            this.result = "Data Inserted SuccessFully";
            this.loading = false;

            setTimeout(() => {
              this.result = null;
              this.reset();
              this.docmapform.get('job').setValue("");
            }, 2000);
          }

        },
        error => {
          //  console.log(error);
          if (error.status == 409) {
            this.result = "Already Exists"
            this.loading = false;
          }
          else {
            this.result = "Oops Something Went Wrong (error Code " + error.status + ")";
            this.loading = false;
            // console.log(error);

          }
          // console.log(error);
        });
  }

  reset() {
    this.isSubmitted = false;
    this.docmapform.reset();


  }

  getDoc() {
    this.docservice.getAllDocument().
      subscribe(data => {
        //console.log(data);
        this.document = data.documents;
        this.documentedit = data.documents;

      },
        error => {
          //  console.log(error);

        }
      )
  };

  getJobType() {
    this.jobTypeServices.getAllJobType().
      subscribe(data => {
        // console.log(data);
        this.jobtype = data.jobTypes;
      },
        error => {

        }
      )
  }


  getAllJobDocMap() {
    // this.myData.splice(0, this.myData.length);
    // this.rowData.splice(0, this.rowData.length);
    this.mapDocservice.getAllDocMap().
      subscribe(jobDocMap => {
        if (jobDocMap.jobDocMapList) {
          console.log(jobDocMap.jobDocMapList);
          // this.rowData = jobColMap.jobColMapList.collateral;
          // for (var i = 0; i < jobDocMap.jobDocMapList.length; i++) {

          //   var obj1 = jobDocMap.jobDocMapList[i].jobtype;
          //   var obj2 = jobDocMap.jobDocMapList[i].document;
          //   var merged = Object.assign(obj1, obj2);
          //   this.myData.push(merged);
          //   // console.log(this.rowData);
          // }
          this.rowData = jobDocMap.jobDocMapList
          // console.log(this.rowData);
        }
      }
        , error => {

        }
      )
  }


  getOneJobCOlMap(jobId: string) {
    this.editresult = "";
    this.mapDocservice.getOneJobDocMap(jobId).subscribe
      (data => {
        if (data.jobType) {
          this.editdDocMap.get('jobTypeCode').setValue(data.jobType.jobTypeCode);
          this.editdDocMap.get('jobTypeName').setValue(data.jobType.jobTypeName);
          this.selectedItemsdocedit = data.documents;
          //console.log(data.collaterals);
        }
      },
        error => {
          //console.log(error);
          alert("oops Something Went Wrong with Error Code " + error.status)
        })
  }



  updateJobDocMap() {
    this.editresult = "";
    if (!this.editdDocMap.valid)
      return;
    this.editloading = true;
    // console.log(this.editdColMap.value);
    this.mapDocservice.updateJobDocMap(this.editdDocMap.value).
      subscribe(data => {

        //console.log(data.serviceStatus.statusCode);
        if (data.serviceStatus.statusCode == 9101) {
          this.editresult = "Data Updated SuccessFully";


          this.getAllJobDocMap();


          ;
        }

      },
        error => {
          //  console.log(error);
          if (error.status == 409) {
            this.editresult = "Already Exists"
            this.editloading = false;
          }
          else {
            this.editresult = error.message;
            this.editloading = false;
            // console.log(error);

          }
          // console.log(error);
        })
  }

  deleteJobDocMap(jobid: string) {
    this.mapDocservice.deleteJobDocMap(jobid).
      subscribe(data => {
        this.getAllJobDocMap();
      },
        error => {
          console.log(error);
          alert("oops Something Went Wrong with Error Code " + error.status)
        })
  }

  columnDefs = [
    { headerName: 'Job Code', field: 'jobTypeCode', width: 100 },
    { headerName: 'Job Name', field: 'jobTypeName', width: 150 },
    { headerName: 'Doc Code', field: 'docCode', width: 100 },
    { headerName: 'Document Name', field: 'docName' },

    {
      headerName: "Actions",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,
      template:
        `<button type="button" data-action-type="view" class="btn btn-primary" data-toggle="modal" data-target="#edit">
         Edit
       </button>

      <button type="button" data-action-type="remove" class="btn btn-danger">
         Remove
      </button>`
    }
  ];

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "view":
          return this.onActionViewClick(data);
        case "remove":
          return this.onActionRemoveClick(data);
      }
    }
  }

  public onActionViewClick(data: any) {
    // console.log("View action clicked", data);
    this.getOneJobCOlMap(data.jobTypeCode);

  }

  public onActionRemoveClick(data: any) {
    //console.log("Remove action clicked", data);
    if (confirm("Are you sure to delete Job Type Code" + data.jobTypeCode)) {
      this.deleteJobDocMap(data.jobTypeCode);

    }
  }

}
