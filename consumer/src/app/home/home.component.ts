import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor(private route: ActivatedRoute,
    private router: Router,) { }


  ngOnInit() {
this.removeLocal();
 localStorage.setItem('source', JSON.stringify(this.route.snapshot.queryParams['source'] || 'sama'));

  }


  removeLocal()
  {
      localStorage.removeItem('currentUser');
      localStorage.clear();
      
  }
 
}
