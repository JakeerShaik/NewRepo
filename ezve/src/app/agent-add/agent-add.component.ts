import { AddAgentService } from './../_services/add-agent.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agent-add',
  templateUrl: './agent-add.component.html',
  styleUrls: ['./agent-add.component.css']
})
export class AgentAddComponent implements OnInit {
  agent: FormGroup;
  editAgent: FormGroup;
  isSubmitted: boolean = false;
  submitted = false;
  result: any = null;
  editresult: any = null;

  editloading = false;
  rowData = [];

  emailPattern: string = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$";



  constructor(private frmBuilder: FormBuilder, private http: HttpClient, private addagent: AddAgentService) {


  }

  ngOnInit() {
    this.agent = this.frmBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]],
      email: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(this.emailPattern)]],
      code: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      mobile: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10),
      Validators.pattern("^0[0-9].*$")]],

    });


    this.editAgent = this.frmBuilder.group({
      agentName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]],
      agentCode: ["", [Validators.required]],
      agentEmail: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32), Validators.pattern(this.emailPattern)]],
      agentMobile: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9),
      Validators.pattern("^[0-9]*$")]],

    });

    this.getAllAgent();

  }

  get name() { return this.agent.get('name'); }
  get email() { return this.agent.get('email'); }
  get code() { return this.agent.get('code'); }
  get mobile() { return this.agent.get('mobile'); }


  get agentName() { return this.editAgent.get('agentName'); }
  get agentEmail() { return this.editAgent.get('agentEmail'); }
  get agentMobile() { return this.editAgent.get('agentMobile'); }
  get agentCode() { return this.editAgent.get('agentCode'); }


  save() {
    this.result="";
    this.isSubmitted = true;
    if (!this.agent.valid)
      return;

    this.addagent.createAgent(this.agent.value)
      .subscribe(agent => {
        if (agent.serviceStatus.statusCode == 9101) {
          this.result = "Data Inserted SuccessFully";
          this.getAllAgent();
          setTimeout(() => {
            this.result = null;
            this.reset();
          }, 2000);

        }
      },
        error => {
          //  console.log(error);
          if (error.status == 409) {
             this.result =error.error.errorDetails.errorMessage;
             //console.log(error);
//console.log(error.error.errorDetails.errorMessage);
      
          }
          else {
            this.result = "Bad Request (error Code "+error.status+")";

        
             console.log(error.validationErrors);

          }
        }
      )
  }




  editAgentSave() {
    this.editresult="";
    if (!this.editAgent.valid)
      return;
    this.editloading = true;
    // console.log(this.editAgent.value);
    this.addagent.updateAgent(this.editAgent.value).
      subscribe(editagent => {
        if (editagent.serviceStatus.statusCode == 9101) {
          this.editresult = "Data Updated SuccessFully";
          this.getAllAgent();
          this.editloading = false;
        }
      },
        error => {
           console.log(error);
          if (error.status == 409) {
            this.editresult = "Agent Already Exists"
            this.editloading = false;
          }
          else {
            this.editresult = "Oops Something Went Wrong (error Code "+error.status+")";
            this.editloading = false;
            // console.log(error);

          }
        })
  }


  deleteAgent(code: string) {
    this.addagent.deleteAgent(code).
      subscribe(
        data => {
          // console.log(data);
          this.getAllAgent();
        },
        error => {
          console.log(error);
          alert("oops Something Went Wrong with Error Code " + error.status)
        });
  }

  getOneAgent(agentcode: string) {
this.editresult="";
    this.addagent.getOneAgent(agentcode).
      subscribe(oneagent => {
        if (oneagent.agents) {
          this.editAgent.get('agentName').setValue(oneagent.agents[0].agentName);
          this.editAgent.get('agentCode').setValue(oneagent.agents[0].agentCode);
          this.editAgent.get('agentEmail').setValue(oneagent.agents[0].agentEmail);
          this.editAgent.get('agentMobile').setValue(oneagent.agents[0].agentMobile);
        }
      })
  }


  getAllAgent() {
    this.addagent.getAllAgent().
      subscribe(allAgent => {
        //console.log(allAgent.agentActiveCode)

        if (allAgent.agentActiveCode) {
          this.rowData = allAgent.agentActiveCode
        }
      })
  }

  reset() {
    this.result="";
    this.isSubmitted = false;
    this.agent.reset();

  }


  columnDefs = [
    { headerName: 'Agent Code', field: 'agentCode', width: 150 },
    { headerName: 'Agent Name', field: 'agentName', width: 150 },
    { headerName: 'Agent Email', field: 'agentEmail', width: 150 },
    { headerName: 'Agent Mobile', field: 'agentMobile', width: 150 },
    {
      headerName: "Actions",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,
  
      template:
        `<button type="button" data-action-type="view" class="btn btn-primary input-sm" data-toggle="modal" data-target="#edit">
       Edit 
       </button>

      <button type="button" data-action-type="remove" class="btn btn-danger input-sm pull-right" >
       Delete
      </button>`
      , width: 150
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
    // console.log("View action clicked", data.agentCode);
    this.getOneAgent(data.agentCode);
  }

  public onActionRemoveClick(data: any) {
   // console.log("Remove action clicked", data);
    if (confirm("Are you sure want  to delete " + data.agentCode)) {
      this.deleteAgent(data.agentCode);

    }
  }

}
