import { HistoryService } from './../_services/history.service';
import { OutstandingjobService } from './../_services/outstandingjob.service';
import { MapAgentJobService } from './../_services/map-agent-job.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { JobReallocationService } from './../_services/job-reallocation.service';

@Component({
  selector: 'app-job-reassign',
  templateUrl: './job-reassign.component.html',
  styleUrls: ['./job-reassign.component.css']
})
export class JobReassignComponent implements OnInit {
  rowData = [];
  onejobdetail:any=null;
  signaturepath:any=null;
  jobhis=[];
  joballocation: FormGroup;
  agent = [];
  result: any = null;
  isSubmitted: boolean = false;

  constructor(private frmBuilder: FormBuilder,private history:HistoryService,private outstandingjob:OutstandingjobService,
    private http: HttpClient,private mapAgentJob: MapAgentJobService
    ,private Jobhistory:HistoryService,private jobReallocation: JobReallocationService,) { }

  ngOnInit() {
    this.joballocation = this.frmBuilder.group({
      jobid: ["", [Validators.required]],
      existingAgentCode: ["", [Validators.required]],
      agentid: ["", [Validators.required, Validators.minLength(3)]],
      newAgentName: ["", [Validators.required]],

      //dated: [null, Validators.required]
    });

this.getAllPendingJob();
  }


  get jobid() { return this.joballocation.get('jobid'); }
  get agentid() { return this.joballocation.get('agentid'); }
  get existingAgentCode() { return this.joballocation.get('existingAgentCode'); }
  get newAgentName() { return this.joballocation.get('newAgentName'); }



  columnDefs = [
    // checkboxSelection: true,headerCheckboxSelection: true
    {headerName: 'Ref No.', field: 'jobReference', width:120},
    //{headerName: 'job FI', field: 'jobFI', width:100},
    {headerName: 'Product', field: 'jobProduct',width:120 }, 
    {headerName: 'Customer Name', field: 'jobCustomerName' }, 
    {headerName: 'Contact', field: 'jobCustomerPhone',width:120 }, 
    {headerName: 'Address', field: 'jobCustomerAddress1',width:120 }, 
    {headerName: 'City', field: 'jobCustomerCity',width:120 }, 
    {headerName: 'Agent Name', field: 'agentName',width:170 }, 

    // {headerName: 'Received', field: 'jobDateReceived',width:120 }, 
    {
      headerName: "Actions",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,
      width:265,
      template:
        `<button type="button" data-action-type="view" class="btn btn-primary" data-toggle="modal" data-target="#jobview">
         View Detail
       </button>
       <button type="button" data-action-type="history" class="btn btn-success" data-toggle="modal" data-target="#jobmap">
        History
       </button>
       <button type="button" data-action-type="" class="btn btn-warning" data-toggle="modal" data-target="#">
        Re-assign
       </button>`
    }
];

getAllPendingJob()
{
  this.outstandingjob.getPendingJob().
  subscribe(allpendingJob => {
//console.log(allpendingJob.jobCreation)

if(allpendingJob.jobCreation)
    {
     this. rowData=allpendingJob.jobCreation
    }
  })
}

getJobHistory(jobid:string)
{
  this.Jobhistory.JobHistory(jobid).
  subscribe(
    data => {
  this.jobhis=data.jobHistory;
//  console.log(this.jobhis);

    },
    error => {

      alert("Oops Something Went Wrong (error Code " + error.status + ")");

      // console.log(error);

    });
}

getoneJobDetail(jobid:string) {

  this.mapAgentJob.getOneJobDetail(jobid).
    subscribe(
      data => {
        // console.log(data.job);
    
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

getAllAgent() {
  this.mapAgentJob.getAllAgent().
    subscribe(allAgent => {
      // console.log(allAgent.agents)
      this.agent = allAgent.agents
    })
}

public onRowClicked(e) {
  if (e.event.target !== undefined) {
    let data = e.data;
    let actionType = e.event.target.getAttribute("data-action-type");

    switch (actionType) {
      case "view":
        return this.onActionViewClick(data);
      case "history":
        return this.onActionRemoveClick(data);
    }
  }
}

save() {
  this.result = "";
  this.isSubmitted = true;
  if (!this.joballocation.valid)
    return;
  //console.log(this.joballocation.value);  

  this.jobReallocation.mapAgentJob(this.joballocation.value).
    subscribe(
      data => {
        //console.log(data.serviceStatus.statusCode);
        this.result = "Job Allocated to Agent SuccessFully";
     
      },
      error => {
          console.log(error);
        if (error.status == 409) {
          this.result = "Already Exists"

        }
        else {
          this.result =  error.error.errorDetails.errorMessage;

          // console.log(error);

        }
        // console.log(error);
      });
}

public onActionViewClick(data: any) {
   //console.log("View action clicked", data.jobReference);
this.getoneJobDetail(data.jobReference);
}
public onActionRemoveClick(data: any) {
// console.log("Remove action clicked", data.jobReference);
this.getJobHistory(data.jobReference);
}

}
