import { MapAgentJobService } from './../_services/map-agent-job.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'


import { IMyDpOptions } from 'mydatepicker';
@Component({
  selector: 'app-job-allocation',
  templateUrl: './job-allocation.component.html',
  styleUrls: ['./job-allocation.component.css']
})
export class JobAllocationComponent implements OnInit {



  joballocation: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  job = [];
  rowData = [];
  agent = [];
  nojobdetails: any = null;
  onejobdetail:any=null;
  signaturepath:any=null;
  joblist = [];
  selectedItemsjob = [];
  dropdownSettings = {};

  constructor(private frmBuilder: FormBuilder, private mapAgentJob: MapAgentJobService) { }
  ngOnInit() {
    this.joballocation = this.frmBuilder.group({
      jobid: ["", [Validators.required]],
      agentid: ["", [Validators.required, Validators.minLength(3)]],

      //dated: [null, Validators.required]
    });


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'jobReference',
      textField: 'jobReference',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.getAllassignedjobs();
    this.getAllAgent();
    this.getAllPendingjobs();
  }


  get jobid() { return this.joballocation.get('jobid'); }
  get agentid() { return this.joballocation.get('agentid'); }
  // get dated() { return this.joballocation.get('dated');}



  getoneJobDetail() {

    if (this.jobid.value == "") {
      // alert("Please Select Job Id First");
      this.onejobdetail=null;
      this.nojobdetails = "Please Select Job Reference First";
      return false;
    }
    else {

      this.mapAgentJob.getOneJobDetail(this.jobid.value).
        subscribe(
          data => {
            // console.log(data.job);
            this.nojobdetails=null;
            this.onejobdetail=data;
            this.signaturepath=data.job.jobCustomerSignature;
//console.log(this.onejobdetail.job);
          },
          error => {

            alert("Oops Something Went Wrong (error Code " + error.status + ")");

            // console.log(error);

          });
      //alert("data");
    }
  }

  save() {
    this.result="";
    this.isSubmitted = true;
    if (!this.joballocation.valid)
      return;

    this.mapAgentJob.mapAgentJob(this.joballocation.value).
      subscribe(
        data => {
          //console.log(data.serviceStatus.statusCode);
          if (data.serviceStatus.statusCode == 9101) {
            this.result = "Data Inserted SuccessFully";
            this.getAllassignedjobs();
            this.getAllPendingjobs();
            setTimeout(() => {
              this.result = null;
              this.reset();
            this.joballocation.get('agentid').setValue("");

            }, 2000);

          }

        },
        error => {
          //  console.log(error);
          if (error.status == 409) {
            this.result = "Already Exists"

          }
          else {
            this.result = "Oops Something Went Wrong (error Code " + error.status + ")";

            // console.log(error);

          }
          // console.log(error);
        });
  }


  getAllassignedjobs() {
    this.mapAgentJob.getAllJobAssignedJobs().
      subscribe(alljob => {
        //  console.log(alljob);

        if (alljob.assignedjobs) {

          this.rowData = alljob.assignedjobs
          // console.log(this.rowData);


        }
      })
  }



  getAllPendingjobs() {
    this.mapAgentJob.getAllPendingJob().
      subscribe(allpendingjob => {
        // console.log(alljob.pendingJob);

        if (allpendingjob.pendingJobDetails) {
          this.joblist = allpendingjob.pendingJobDetails;
          //console.log(this.joblist);
        }
      })
  }

  getAllAgent() {
    this.mapAgentJob.getAllAgent().
      subscribe(allAgent => {
        // console.log(allAgent.agents)
        this.agent = allAgent.agents
      })
  }

  reset() {
    this.isSubmitted = false;
    this.joballocation.reset();

  }



  columnDefs = [
    { headerName: 'Agent Code', field: 'agentcode', width: 120 },
    { headerName: 'Agent Name', field: 'agentname', width: 150 },
    { headerName: 'Email', field: 'agentmailid' },
    { headerName: 'Product', field: 'jobproduct', width: 150 },
    { headerName: 'Job Ref No.', field: 'jobReference', width: 120 },

    //   { headerName: "Actions",
    //   suppressMenu: true,
    //   suppressSorting: true,
    //   autoHeight: true,
    //   template:
    //     `<button type="button" data-action-type="view" class="btn btn-primary">
    //        Edit
    //      </button>

    //     <button type="button" data-action-type="remove" class="btn btn-danger">
    //        Remove
    //     </button>`
    // }
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
  }

  public onActionRemoveClick(data: any) {
  //  console.log("Remove action clicked", data);
  }

}
