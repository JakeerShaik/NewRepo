import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../_services/local-storage.service';

@Component({
  selector: 'app-appdate-header',
  templateUrl: './appdate-header.component.html',
  styleUrls: ['./appdate-header.component.css']
})
export class AppdateHeaderComponent implements OnInit {
  today: number = Date.now();

  constructor(private localstore:LocalStorageService) { }

  ngOnInit() {
    
  }



  
}
