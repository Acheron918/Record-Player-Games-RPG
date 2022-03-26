import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Initialization
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  //Validators and biding form
    registerForm = new FormGroup({
      name : new FormControl('',[Validators.required,Validators.minLength(3)]),
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword : new FormControl('',[Validators.required])
    },
    {validators : passwordMatchValidator()});

  //Getters
   get name(){
     return this.registerForm.get('name');
   }

   get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }

  //Sign up method
  async onRegister() {

    if(this.registerForm.invalid) return;

    const {name, email, password} = this.registerForm.value;

    this.auth.register(name,email,password);
  }
}

export function passwordMatchValidator() : ValidatorFn{
  return (control : AbstractControl) : ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confimPassword = control.get('confirmPassword')?.value;

    if(password && confimPassword && password !== confimPassword){
      return {
        passwordsDontMatch : true,
      };
    }

    return null;
  };
}
