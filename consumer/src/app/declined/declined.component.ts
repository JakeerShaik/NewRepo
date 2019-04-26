import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-declined',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.css']
})
export class DeclinedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.removeLocal();
  }

  removeLocal()
  {
      localStorage.removeItem('currentUser');
      localStorage.clear();
      
  }

}
