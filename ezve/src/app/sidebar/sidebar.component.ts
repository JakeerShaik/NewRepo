import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private authservice:AuthenticationService,private router: Router) { }

  ngOnInit() {
  }


  userLogOut()
  {
    this.authservice.logout();
    this.router.navigate(['/login']);

  }
}
