import { AuthenticationService } from './_services/authentication.service';
import { Component ,OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loggedin:any;
  //public onlineOffline: boolean = navigator.onLine;
  ngOnInit() {

    
  }

  constructor(private authservice:AuthenticationService) { 

  }

userLogged()
{
  return this.authservice.isLoggedIn();
}

}

