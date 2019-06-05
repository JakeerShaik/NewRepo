import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  constructor() { }


  collateral=[];
  document=[];
  dropdownList = [];
  selectedItemsdoc = [];
  selectedItemscol = [];
  dropdownSettings = {};
  ngOnInit(){

    this.selectedItemscol = [
      
      ];
      this.selectedItemsdoc = [
      
    ];
       this.collateral = [
          { id: 1, name: 'Passport' },
          { id: 2, name: 'EID' },
          { id: 3, name: 'Residential Proof' },
          { id: 4, name: 'Passbook' }
      ];

      this.document = [
        { id: 1, name: 'Credit card' },
        { id: 2, name: 'Passbook' },
        { id: 3, name: 'Debit card' }
    ];
  
      this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 10,
          allowSearchFilter: true
      };
  }
  onItemSelect(item:any){
    //   console.log(item);
  }
  onSelectAll(items: any){
    //   console.log(items);
  }
}
