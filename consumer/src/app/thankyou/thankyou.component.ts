import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

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
