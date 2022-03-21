import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router, private toust: HotToastService) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {

        this.toust.success('Logged in successfully');
        localStorage.setItem('user', res.user?.displayName!);
        this.router.navigate(['/home']);

    }, err => {

      this.toust.error(err.message);
      this.router.navigate(['/login']);

    })
  }

  // register method
  register(name: string, email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {

        res.user?.updateProfile({displayName: name,} ).then(() => {
          // Profile updated!
          this.toust.success('Registration Successful');
        }).catch((error) => {
          // An error occurred
          this.toust.error(error.message);
        });

      //this.router.navigate(['/login']);
    }, err => {

      this.toust.error(err.message);
      this.router.navigate(['/register']);

    })
  }

  // sign out method
  logout() {

    this.fireauth.signOut().then( () => {
      this.toust.info('Successful logout');
      localStorage.removeItem('user');
      this.router.navigate(['/home']);

    }, err => {

      this.toust.error(err.message);

    })
  }

}
