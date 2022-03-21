import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //Initialization
  ngOnInit(): void {}

  constructor(private auth : AuthService) { }

  //Validators and biding form
  loginForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  //Getters
  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  //Sign in method
  onLogin() {

    if(this.loginForm.invalid) return;

    const {email, password} = this.loginForm.value;
    
    this.auth.login(email,password);
  }

}