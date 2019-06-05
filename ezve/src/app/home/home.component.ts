import { HomedataService } from './../_services/homedata.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
pendingjob: any = null;
completedJob: any = null;
unallocatedjob: any = null;
reassign:any=null;
  constructor(private http: HttpClient, private homedata:HomedataService) { }

  ngOnInit() {
    this.countedData();
  }

countedData()
{
  this.homedata.countData().
    subscribe(alldata => {
      // console.log(alldata)
       this.pendingjob= alldata.pendingJob;
      this.completedJob= alldata.completedJob;
      this.unallocatedjob= alldata.unallocatedJob;
      this.reassign=alldata.reassignedJob;
     
    })
  }

}
