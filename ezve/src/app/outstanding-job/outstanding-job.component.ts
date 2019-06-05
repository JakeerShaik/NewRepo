import { OutstandingjobService } from './../_services/outstandingjob.service';
import { MapAgentJobService } from './../_services/map-agent-job.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'




@Component({
  selector: 'app-outstanding-job',
  templateUrl: './outstanding-job.component.html',
  styleUrls: ['./outstanding-job.component.css']
})
export class OutstandingJobComponent implements OnInit {
  rowData = [];
  onejobdetail:any=null;
  signaturepath:any=null;
  private rowSelection;
  joballocation: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  agent = [];
  
  constructor(private frmBuilder: FormBuilder,private outstandingjob:OutstandingjobService,private http: HttpClient, private mapAgentJob: MapAgentJobService) { }

  ngOnInit() {
    this.joballocation = this.frmBuilder.group({
      jobid: ["", [Validators.required]],
      outstanding: ["1", [Validators.required]],
      agentid: ["", [Validators.required, Validators.minLength(3)]],

      //dated: [null, Validators.required]
    });
    this.getAllOutstnadingJob();
    this.getAllAgent();
    this.rowSelection = "multiple";
  }


  get jobid() { return this.joballocation.get('jobid'); }
  get agentid() { return this.joballocation.get('agentid'); }
  get outstanding() { return this.joballocation.get('outstanding'); }

  columnDefs = [
    // checkboxSelection: true,headerCheckboxSelection: true
    {headerName: 'Ref No.', field: 'jobReference', width:120},
    //{headerName: 'job FI', field: 'jobFI', width:100},
    {headerName: 'Product', field: 'jobProduct',width:120 }, 
    {headerName: 'Customer Name', field: 'jobCustomerName' }, 
    {headerName: 'Email', field: 'jobCustomerEmail',width:170 }, 
    {headerName: 'Contact', field: 'jobCustomerPhone',width:120 }, 
    {headerName: 'Address', field: 'jobCustomerAddress1',width:120 }, 
    {headerName: 'City', field: 'jobCustomerCity',width:120 }, 
    // {headerName: 'Received', field: 'jobDateReceived',width:120 }, 
    {
      headerName: "Actions",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,
      // width:auto,
      template:
        `<button type="button" data-action-type="view" class="btn btn-primary" data-toggle="modal" data-target="#jobview">
         View Detail
       </button>
       <button type="button" data-action-type="assign" class="btn btn-warning" data-toggle="modal" data-target="#jobmap">
        Allocate
       </button>`
    }
];

getAllAgent() {
  this.mapAgentJob.getAllAgent().
    subscribe(allAgent => {
      // console.log(allAgent.agents)
      this.agent = allAgent.agents
    })
}

getAllOutstnadingJob()
{
  this.outstandingjob.getAllOustandingJob().
  subscribe(allOutstnadingJob => {
//console.log(allOutstnadingJob.pendingJobDetails)

if(allOutstnadingJob.pendingJobDetails)
    {
     this. rowData=allOutstnadingJob.pendingJobDetails
    }
  })
}


getoneJobDetail(jobid:string) {

    this.mapAgentJob.getOneJobDetail(jobid).
      subscribe(
        data => {
           console.log(data.job);
      
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


  save() {
    this.result="";
    this.isSubmitted = true;
    if (!this.joballocation.valid)
      return;
//console.log(this.joballocation.value);  

    this.mapAgentJob.mapAgentJob(this.joballocation.value).
      subscribe(
        data => {
          //console.log(data.serviceStatus.statusCode);
          if (data.serviceStatus.statusCode == 9101) {
            this.result = "Job Allocated to Agent SuccessFully";
            this.getAllOutstnadingJob();

          
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

  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "view":
          return this.onActionViewClick(data);
        case "assign":
          return this.onActionRemoveClick(data);
      }
    }
  }
  public onActionViewClick(data: any) {
     //console.log("View action clicked", data.jobReference);
 this.getoneJobDetail(data.jobReference);
  }
  public onActionRemoveClick(data: any) {
  // console.log("Remove action clicked", data.jobReference);
   this.joballocation.get('jobid').setValue(data.jobReference);

   this.result="";
  }
 


}




