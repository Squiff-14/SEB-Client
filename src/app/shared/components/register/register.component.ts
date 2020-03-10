
import { AuthService } from '../../../core/services/authentication/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  invalidDetails: boolean;
  registerForm: FormGroup;
  private errMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {
    this.invalidDetails = false;
  }

  ngOnInit() {
    this.registerForm = this. fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid){
      this.invalidDetails = true;
      this.errMessage = "Must include a username and a password between 4 & 6 charachters";
      return;
    } 
    
    var username: string = this.registerForm.value.username;
    var password: string = this.registerForm.value.password;
    if (username && password) {
      this.authService.register({username: username, password: password})
        .subscribe(
          data => {
            this.router.navigate(['/login'])
          },
          err => {
            if(err == "Conflict"){
              this.invalidDetails = true;
              this.errMessage = "That username already exists.";
            }
          })
    }
  }

}