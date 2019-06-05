import { HistoryService } from './../_services/history.service';
import { OutstandingjobService } from './../_services/outstandingjob.service';
import { MapAgentJobService } from './../_services/map-agent-job.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pending-job',
  templateUrl: './pending-job.component.html',
  styleUrls: ['./pending-job.component.css']
})
export class PendingJobComponent implements OnInit {
  rowData = [];
  onejobdetail:any=null;
  signaturepath:any=null;
  jobhis=[];

  constructor(private history:HistoryService,private outstandingjob:OutstandingjobService,
    private http: HttpClient,private mapAgentJob: MapAgentJobService
    ,private Jobhistory:HistoryService) { }

  ngOnInit() {
this.getAllPendingJob();
  }


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
      // width:auto,
      template:
        `<button type="button" data-action-type="view" class="btn btn-primary" data-toggle="modal" data-target="#jobview">
         View Detail
       </button>
       <button type="button" data-action-type="history" class="btn btn-success" data-toggle="modal" data-target="#jobmap">
        History
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
public onActionViewClick(data: any) {
   //console.log("View action clicked", data.jobReference);
this.getoneJobDetail(data.jobReference);
}
public onActionRemoveClick(data: any) {
// console.log("Remove action clicked", data.jobReference);
this.getJobHistory(data.jobReference);
}

}
