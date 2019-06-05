import { MapJobDocService } from './../_services/map-job-doc.service';
import { MapJobColService } from './../_services/map-job-col.service';
import { JobTypeService } from './../_services/job-type.service';
import { CollateralService } from './../_services/collateral.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-job-col-map',
  templateUrl: './job-col-map.component.html',
  styleUrls: ['./job-col-map.component.css']
})
export class JobColMapComponent implements OnInit {
  colmapform: FormGroup;
  editdColMap: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  editresult: any = null;
  loading = false;
  editloading = false;
  myData = [];
  rowData = [];
  collateral = [];
  collateraledit = [];
  jobtype = [];
  dropdownList = [];
  selectedItemscol = [];
  selectedItemscoledit = [];
  dropdownSettings = {};
  dropdownSettingsedit = {};
  overlayLoadingTemplate;
 overlayNoRowsTemplate;

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private colservice: CollateralService,
    private jobTypeServices: JobTypeService,
    private mapCol: MapJobColService,
    private router: Router,
  ) {
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      "<span style=\"padding: 10px; border: 1px solid #444; background: green;color:white\"><i class=\"fa fa-spinner fa-spin fa-2x\"></i> Please Wait Data is Loading...</span>";
  }

  ngOnInit() {
    this.colmapform = this.frmBuilder.group({
      job: ["", [Validators.required]],
      coll: ["", [Validators.required]],
    });

    this.editdColMap = this.frmBuilder.group({
      jobTypeCode: ["", [Validators.required]],
      collateralCode: ["", [Validators.required]],
      jobTypeName: ["", [Validators.required]],
    });
    //  this.selectedItemscoledit = [{'collcode':'123','collName':'PASSPORT'}];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'collcode',
      textField: 'collName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.dropdownSettingsedit = {
      singleSelection: false,
      idField: 'collcode',
      textField: 'collName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.getAllCol();
    this.getJobType();
    this.getAllJobColMap();

  }
  get job() { return this.colmapform.get('job'); }
  get coll() { return this.colmapform.get('coll'); }

  get jobTypeCode() { return this.editdColMap.get('jobTypeCode'); }
  get collateralCode() { return this.editdColMap.get('collateralCode'); }
  get jobTypeName() { return this.editdColMap.get('jobTypeName'); }

  save() {
    this.result = "";
    this.isSubmitted = true;
    if (!this.colmapform.valid)
      return;
    this.loading = true;
    //console.log(this.colmapform.value);
    this.mapCol.mapJobCol(this.colmapform.value).
      subscribe(
        data => {
          //console.log(data.serviceStatus.statusCode);
          if (data.serviceStatus.statusCode == 9101) {
            this.getAllJobColMap();
            this.result = "Data Inserted SuccessFully";
            this.loading = false;

            setTimeout(() => {
              this.result = null;
              this.reset();
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
            this.result = "Oops Something Went Wrong (error Code "+error.status+")";
            this.loading = false;
            // console.log(error);

          }
          // console.log(error);
        });
  }

  reset() {
    this.isSubmitted = false;
    this.colmapform.reset();
    this.selectedItemscol = [

    ];
  }

  getAllCol() {
    this.colservice.getAllCollateral().
      subscribe(data => {
        //console.log(data.collaterals);
        this.collateral = data.collaterals;
        this.collateraledit = data.collaterals;

      },
        error => {
          //  console.log(error);
        })
  };

  getJobType() {
    this.jobTypeServices.getAllJobType().
      subscribe(data => {
        this.jobtype = data.jobTypes;
      },
        error => {
        }
      )
  }

  getAllJobColMap() {

    this.mapCol.getAllColMap().
      subscribe(jobColMap => {
        if (jobColMap.jobTypeCollateralList) {
          // this.rowData = jobColMap.jobColMapList.collateral;
          
            // console.log(jobColMap.jobTypeCollateralList);

          this.rowData = jobColMap.jobTypeCollateralList
          // console.log(this.rowData);
        }
      }
        , error => {

        }
      )
  }

  deleteJobColMap(jobid: string) {
    this.mapCol.deleteJobColMap(jobid).
      subscribe(data => {
        this.getAllJobColMap();

      },
        error => {
          console.log(error);
          alert("Oops Something Went Wrong with Error Code " + error.status)
        })
  }

  getOneJobCOlMap(jobId:string)
  {
    this.editresult="";
    this.mapCol.getOneJobColMap(jobId).subscribe
    (data=>
    {
if(data.jobType)
{
  this.selectedItemscoledit=[]
 this.editdColMap.get('jobTypeCode').setValue(data.jobType.jobTypeCode);
  this.editdColMap.get('jobTypeName').setValue(data.jobType.jobTypeName);
this.selectedItemscoledit=data.collaterals;
  //console.log(data.collaterals);
}
    } ,
        error => {
          console.log(error);
          alert("Oops Something Went Wrong with Error Code " + error.status)
        })
  }

updateJobColMap()
{
  this.editresult="";
  if (!this.editdColMap.valid)
      return;

     // console.log(this.editdColMap.value);
this.mapCol.updateJobColMap(this.editdColMap.value).
subscribe(data=>{

    //console.log(data.serviceStatus.statusCode);
    if (data.serviceStatus.statusCode == 9101) {
      this.editresult = "Data Inserted SuccessFully";
  this.getAllJobColMap();
    
      setTimeout(() => {
        this.result = null;
        this.reset();
        this.editdColMap.get('job').setValue("");

      }, 2000);
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

onItemSelect(item: any) {

  console.log(this.selectedItemscoledit);
  }

  onItemDeSelect(item:any)
  {
    console.log(this.selectedItemscoledit);

  }

  columnDefs = [
    { headerName: 'Job Code', field: 'jobCode', width: 100 },
    { headerName: 'Job Name', field: 'jobName', width: 150 },
    { headerName: 'Coll Code', field: 'collateralCode', width: 100 },
    { headerName: 'Collateral Name', field: 'collateralName' },

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
    //console.log("View action clicked", data);
    this.getOneJobCOlMap(data.jobCode);


  }

  public onActionRemoveClick(data: any) {
   // console.log("Remove action clicked", data);
    if (confirm("Are you sure to delete " + data.jobCode)) {
      this.deleteJobColMap(data.jobCode);
    }
  }






}
