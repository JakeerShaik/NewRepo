import { DocumentService } from './../_services/document.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms' 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
  documentform: FormGroup;
  editdoc: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  editresult: any = null;
  loading = false;
  editloading=false;
  formDataEdit:any;

rowData = [];
 overlayLoadingTemplate;
 overlayNoRowsTemplate;


  constructor(private frmBuilder: FormBuilder,private http: HttpClient,private createDoc:DocumentService) {
    
    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
  this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 1px solid #444; background: green; color:white;\"><i class=\"fa fa-spinner fa-spin fa-2x\"></i> Please Wait Data is Loading...</span>";
   }

  ngOnInit() {
    this.documentform = this.frmBuilder.group({
      name:["", [Validators.required, Validators.minLength(3),Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]],
      code:["", [Validators.required,Validators.minLength(3),Validators.maxLength(20)]], 
    });
    this.editdoc = this.frmBuilder.group({
      docName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')]],
      docCode: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });

    this.getAllDoc();
  }

  get name() { return this.documentform.get('name');}
  get code() { return this.documentform.get('code');}
 
  get docName() { return this.editdoc.get('docName');}
  get docCode() { return this.editdoc.get('docCode');}

  save() {
    this.result="";
    this.isSubmitted = true;
    if (!this.documentform.valid)
      return;

this.createDoc.createDocument(this.code.value,this.name.value).
subscribe(
  data => {
   //console.log(data.serviceStatus.statusCode);
   if(data.serviceStatus.statusCode==9101)
   {
     this.result="Data Inserted SuccessFully";

  this.getAllDoc()

    
  setTimeout(() => {
      this.result = null;
      this.reset();
    }, 2000);
   }
  
  },
  error => {
    //  console.log(error);
    if (error.status == 409) {
      this.result = "Document Code Already Exists"
   
    }
    else {
      this.result = error.error.serviceStatus.statusMessage;
 
   // console.log(error);

    }
    // console.log(error);
  });
  }
  

  getOneColl(docCode:string)
  {
    this.editresult="";
    this.createDoc.getOneDoc(docCode).
    subscribe(oneDoc => {
      if(oneDoc.documents)
      {
      this.editdoc.get('docName').setValue(oneDoc.documents[0].docName);
      this.editdoc.get('docCode').setValue(oneDoc.documents[0].docCode);
    
      }
    })
  }

  getAllDoc()
  {
    this.createDoc.getAllDocument().
    subscribe(
      data => {
          if(data.documents)
          {
           this. rowData=data.documents
          }
      },
      error => {
          console.log(error);
      });
  }

  deleteDoc(code:string)
{
  this.createDoc.deleteDocument(code).
  subscribe(
    data => {
       // console.log(data);
       this.getAllDoc();
    },
    error => {
       // console.log(error);
 alert(error.error.errorDetails.errorMessage)

    });
}

updateDoc()
{
  if (!this.editdoc.valid)
  return;
  this.editresult=null;
  this.editloading=true;
  this.formDataEdit=this.editdoc.value
this.createDoc.updateDoc(this.formDataEdit).
subscribe(data=>
  {
    if(data.serviceStatus.statusCode==9101)
    {
      //console.log("Data Updated SuccessFully");
      this.editresult="Data Updated SuccessFully";
      this.getAllDoc();
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



  reset(){
    this.isSubmitted = false;
    this.documentform.reset();
    
  }
  
  columnDefs = [
    {headerName: 'Document Code', field: 'docCode' },
    {headerName: 'Document Name', field: 'docName',width:330}, 

    { headerName: "Actions",
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

      switch(actionType) {
          case "view":
              return this.onActionViewClick(data);
          case "remove":
              return this.onActionRemoveClick(data);
      }
  }
}

public onActionViewClick(data: any){
  //console.log("View action clicked", data);
  this.getOneColl(data.docCode);
}

public onActionRemoveClick(data: any){
 // console.log("Remove action clicked", data);
  if(confirm("Are you sure to delete "+data.docName)) {
    this.deleteDoc(data.docCode);
  
  }
}

}
