import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private auth : AuthService) { }
  goToComponent(ComponentName:string):void{
    this.router.navigate([`${ComponentName}`]);
  }

  ngOnInit(): void {
  }

  get user(){
    return localStorage.getItem('user');
  }

  onLogout(){
    this.auth.logout();
  }

}
