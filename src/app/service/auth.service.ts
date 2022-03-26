import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router, private toust: HotToastService) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {

        this.toust.success('Logged in successfully');
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
          this.router.navigate(['/home/']);

        }).catch((error) => {
          // An error occurred
          this.toust.error(error.message);
        });

    }, err => {

      this.toust.error(err.message);
      this.router.navigate(['/register']);

    })
  }

  // sign out method
  logout() {

    this.fireauth.signOut().then( () => {
      this.toust.info('Successful logout');
      this.router.navigate(['/home']);

    }, err => {

      this.toust.error(err.message);

    })
  }

}
