import { JobTypeService } from './../_services/job-type.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.css']
})
export class JobTypeComponent implements OnInit {
  jobtypeform: FormGroup;
  editjobtypeform: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  editresult: any = null;
  jobTypeNameData:any=null;
  rowData = [];

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,private jobType:JobTypeService) { }

  ngOnInit() {
    this.jobtypeform = this.frmBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      // sla: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30),Validators.pattern("^[0-9]*$")]],
      code: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.editjobtypeform = this.frmBuilder.group({
      editname: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      editsla: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30),Validators.pattern("^[0-9]*$")]],
       editcode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],


    });
this.getAllJobTypeName()
this.getAllJobType();

  }

  get name() { return this.jobtypeform.get('name'); }
  get code() { return this.jobtypeform.get('code'); }
  // get sla() { return this.jobtypeform.get('sla'); }

  get editname() { return this.editjobtypeform.get('editname'); }
  get editcode() { return this.editjobtypeform.get('editcode'); }
  get editsla() { return this.editjobtypeform.get('editsla'); }


  save() {
    this.result = "";
    this.isSubmitted = true;
    if (!this.jobtypeform.valid)
      return;
      this.jobType.createJobtype(this.jobtypeform.value).
        subscribe(
          data => {
            //console.log(data.serviceStatus.statusCode);
            if (data.serviceStatus.statusCode == 9101) {
              this.getAllJobType();
              this.getAllJobTypeName();
              this.result = "Data Inserted SuccessFully";

  
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
    
            }
            else {
              this.result = "Oops Something Went Wrong (error Code "+error.status+")";
         
              // console.log(error);
  
            }
            // console.log(error);
          });
  }






  reset() {
    this.isSubmitted = false;
    this.jobtypeform.reset();

  }

  getAllJobType()
  {
    this.jobType.getAllJobType().subscribe
(jobtype=>
  {
//console.log(jobtypename.jobTypeName);
this.rowData=jobtype.jobTypes;
//console.log(jobtype.jobTypes)
  }
)
  }

getAllJobTypeName()
{
this.jobType.getAllJobTypeName().subscribe
(jobtypename=>
  {
//console.log(jobtypename.jobTypeName);
this.jobTypeNameData=jobtypename.jobtypeName;
//console.log(this.jobTypeNameData.jobtypeName)
  }
)
}


getOnejobType(jobtype:string)
{
  this.jobType.getoneJobtype(jobtype).subscribe
  (onejobtype=>
    {
      //console.log(onejobtype.jobTypes);
      this.editjobtypeform.get('editcode').setValue(onejobtype.jobTypes[0].jobTypeCode);
      this.editjobtypeform.get('editname').setValue(onejobtype.jobTypes[0].jobTypeName);
      this.editjobtypeform.get('editsla').setValue(onejobtype.jobTypes[0].jobTypeSla);


    })
}

edit()
{
  this.editresult="";
  if (!this.editjobtypeform.valid)
      return;
  this.jobType.editJobtype(this.editjobtypeform.value).subscribe
  (updatejobtype=>
    {
      //console.log(data.serviceStatus.statusCode);
      if (updatejobtype.serviceStatus.statusCode == 9101) {
        this.getAllJobType();
       
        this.editresult = "Data Updated SuccessFully";

      }

    },
    error => {
      //  console.log(error);
      if (error.status == 409) {
        this.editresult = "Already Exists"

      }
      else {
        this.editresult = "Oops Something Went Wrong (error Code "+error.status+")";
   
        // console.log(error);

      }
      // console.log(error);
    });
}

  columnDefs = [
    { headerName: 'Job Code', field: 'jobTypeCode' },
    { headerName: 'Job Name', field: 'jobTypeName' },
    // { headerName: 'Job SLA', field: 'jobTypeSla', width: 100 },
    {
      headerName: "Actions",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,
      template:
        `<button type="button" data-action-type="view" class="btn btn-primary" data-toggle="modal" data-target="#edit">
         Edit
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
   this.getOnejobType(data.jobTypeCode);
  }

  public onActionRemoveClick(data: any) {
    console.log("Remove action clicked", data);
  }

}
