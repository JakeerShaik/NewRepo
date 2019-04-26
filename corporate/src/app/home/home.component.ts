import { AlertService } from './../_services/alert.service';
import { Router } from '@angular/router';
import { BasicDetailsService, } from './../_services/basic-details.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  constructor( private alertService:AlertService,private http: HttpClient,private basicService:BasicDetailsService,private router: Router) { }

  ngOnInit() {

    localStorage.clear();
  }

  registerApplicant()
  {
   this.router.navigate(['/basic']);

//     this.basicService.generateAppid().
//     subscribe(data=>{
//       localStorage.setItem("CurrApp", JSON.stringify( data.applicationId.applicationId))
//    this.router.navigate(['/basic']);

// //console.log(data.applicationId.applicationId);
//     },
//           error => {
//             this.alertService.error(error.error);
//          //console.log(error.error)
//         })

  }

}
