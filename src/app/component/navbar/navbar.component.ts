import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/service/auth.service';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, public authF : AngularFireAuth, private authS : AuthService) { }

  goToComponent(ComponentName:string):void{
    this.router.navigate([`${ComponentName}`]);
  }

  ngOnInit(): void {
    }

  onLogout(){
    this.authS.logout();
  }
}
