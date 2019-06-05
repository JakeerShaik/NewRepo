import { JobReallocationService } from './../_services/job-reallocation.service';
import { HistoryService } from './../_services/history.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { MapAgentJobService } from './../_services/map-agent-job.service';



@Component({
  selector: 'app-job-reallocation',
  templateUrl: './job-reallocation.component.html',
  styleUrls: ['./job-reallocation.component.css']
})
export class JobReallocationComponent implements OnInit {
  signaturepath: any = null;
  alljob = [];
  rowData = [];
  joballocation: FormGroup;
  agent = [];
  result: any = null;
  isSubmitted: boolean = false;
  jobhis = [];


  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private jobReallocation: JobReallocationService, private mapAgentJob: MapAgentJobService, private Jobhistory: HistoryService) { }

  ngOnInit() {

    this.joballocation = this.frmBuilder.group({
      jobid: ["", [Validators.required]],
      existingAgentCode: ["", [Validators.required]],
      agentid: ["", [Validators.required, Validators.minLength(3)]],
      newAgentName: ["", [Validators.required]],

      //dated: [null, Validators.required]
    });

    this.AllReassigningJob();
    this.getAllAgent();

  }


  get jobid() { return this.joballocation.get('jobid'); }
  get agentid() { return this.joballocation.get('agentid'); }
  get existingAgentCode() { return this.joballocation.get('existingAgentCode'); }
  get newAgentName() { return this.joballocation.get('newAgentName'); }


  getAllAgent() {
    this.mapAgentJob.getAllAgent().
      subscribe(allAgent => {
        // console.log(allAgent.agents)
        this.agent = allAgent.agents
      })
  }

  AllReassigningJob() {
    this.jobReallocation.getAllReassigningJob().
      subscribe(
        data => {
          this.rowData = data.jobAgentDetails;
          //console.log(this.jobhis);

        },
        error => {

          alert("Oops Something Went Wrong (error Code " + error.status + ")");

          // console.log(error);

        });
  }

  columnDefs = [
    // checkboxSelection: true,headerCheckboxSelection: true
    { headerName: 'Ref No.', field: 'jobReference', width: 120 },
    //{headerName: 'job FI', field: 'jobFI', width:100},
    { headerName: 'Product', field: 'jobProduct', width: 120 },
    { headerName: 'Customer Name', field: 'jobCustomerName' },
    { headerName: 'Email', field: 'jobCustomerEmail', width: 170 },
    { headerName: 'Contact', field: 'jobCustomerPhone', width: 100 },
    { headerName: 'Address', field: 'jobCustomerAddress1', width: 120 },
    { headerName: 'City', field: 'jobCustomerCity', width: 120 },
    { headerName: 'Agent Name', field: 'agentName', width: 120 },
    { headerName: 'Agent Code', field: 'agentCode', width: 90 },
    // {headerName: 'Received', field: 'jobDateReceived',width:120 }, 
    {
      headerName: "Actions",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,
      //  width:150,
      template:
        `<button type="button" data-action-type="assign" class="btn btn-primary" data-toggle="modal" data-target="#jobmap">
       Reallocate
     </button>
     <button type="button" data-action-type="history" class="btn btn-success" data-toggle="modal" data-target="#jobhistory">
     History
    </button>`

    }
  ];

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
          this.AllReassigningJob();
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

  getJobHistory(jobid: string) {
    this.Jobhistory.JobHistory(jobid).
      subscribe(
        data => {
          this.jobhis = data.jobHistory;
          //console.log(this.jobhis);

        },
        error => {

          alert("Oops Something Went Wrong (error Code " + error.status + ")");

          // console.log(error);

        });
  }


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "history":
          return this.onActionHistoryClick(data);
        case "assign":
          return this.onActionRemoveClick(data);
      }
    }
  }
  public onActionHistoryClick(data: any) {
    //console.log("View action clicked", data.jobReference);
    this.getJobHistory(data.jobReference)


  }
  public onActionRemoveClick(data: any) {
    // console.log("Remove action clicked", data.jobReference);
    this.joballocation.get('jobid').setValue(data.jobReference);
    this.joballocation.get('existingAgentCode').setValue(data.agentCode);
    this.joballocation.get('newAgentName').setValue(data.agentName);

    this.result = "";
  }


}
