import { CollateralService } from './../_services/collateral.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-create-collateral',
  templateUrl: './create-collateral.component.html',
  styleUrls: ['./create-collateral.component.css']
})
export class CreateCollateralComponent implements OnInit {
  collform: FormGroup;
  editcoll: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  editresult: any = null;
  loading = false;
  editloading = false;
  rowData = [];
  private columnTypes;
 overlayLoadingTemplate;
 overlayNoRowsTemplate;

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,private createCol:CollateralService) {

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 1px solid #444; background: green;color:white\"><i class=\"fa fa-spinner fa-spin fa-2x\"></i> Please Wait Data is Loading...</span>";
   }

  ngOnInit() {
    this.collform = this.frmBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]],
      code: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.editcoll = this.frmBuilder.group({
      collName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]],
      collcode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.getAllCol();
  }


  get name() { return this.collform.get('name'); }
  get code() { return this.collform.get('code'); }
  get collName() { return this.editcoll.get('collName'); }
  get collcode() { return this.editcoll.get('collcode'); }
  
  save() {
    this.result="";
    this.isSubmitted = true;
    if (!this.collform.valid)
      return;
this.createCol.createCollateral(this.code.value,this.name.value).
subscribe(
  data => {
   //console.log(data.serviceStatus.statusCode);
   if(data.serviceStatus.statusCode==9101)
   {
     this.result="Data Inserted SuccessFully";
     this.loading = false;
     this.getAllCol();
  setTimeout(() => {
      this.result = null;
      this.reset();
    }, 2000);
   }
  
  },
  error => {
    //  console.log(error);
    if (error.status == 409) {
      this.result = "Collateral Code Already Exists"
  
    }
    else {
      //this.result = "Oops Something Went Wrong (error Code "+error.status+")";
      this.result = error.error.serviceStatus.statusMessage;
      ;
      
   // console.log(error);

    }
    // console.log(error);
  });
  }

  getOneColl(collcode:string)
  {
    this.editresult="";
    this.createCol.getOneColl(collcode).
    subscribe(oneColl => {
      if(oneColl.collaterals)
      {
      this.editcoll.get('collName').setValue(oneColl.collaterals[0].collName);
      this.editcoll.get('collcode').setValue(oneColl.collaterals[0].collcode);
    
      }
    })
  }
  
  

getAllCol()
{
  this.createCol.getAllCollateral().
  subscribe(
    data => {
        if(data.collaterals)
        {
         this. rowData=data.collaterals
        }
    },
    error => {
        console.log(error);
    });
}

updateCol()
{
  if (!this.editcoll.valid)
  return;
  this.editresult=null;
  this.editloading=true;
this.createCol.updateColl(this.editcoll.value).
subscribe(data=>
  {
    if(data.serviceStatus.statusCode==9101)
    {
      //console.log("Data Updated SuccessFully");
      this.editresult="Data Updated SuccessFully";
      this.getAllCol();
      this.editloading=false;
     setTimeout(() => {
       this.reset();
     }, 2000);
    }

  } ,
   error => {
      console.log(error);
    alert("oops Something Went Wrong with Error Code "+error.status)
  }
  
  
)}

deleteCol(code:string)
{
  this.createCol.deleteCollateral(code).
  subscribe(
    data => {
       // console.log(data);
       this.getAllCol();
    },
    error => {
      // console.log(error);
      //  console.log(error.error.errorDetails.errorMessage);
 alert(error.error.errorDetails.errorMessage)
    });
}

  reset() {
    this.isSubmitted = false;
    this.collform.reset();
  //  this.editcoll.reset();
  }

  columnDefs = [
    { headerName: 'Collateral Code', field: 'collcode' },
    { headerName: 'Collateral Name', field: 'collName',width:330 },  

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
  //  console.log("View action clicked", data.collcode);
    this.getOneColl(data.collcode)
  }

  public onActionRemoveClick(data: any) {
    if(confirm("Are you sure to delete "+data.collName)) {
      this.deleteCol(data.collcode);
      
    }
  }

  
}
