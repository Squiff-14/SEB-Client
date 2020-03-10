import { environment } from './../../../../environments/environment';
import { WebSocketService } from '../../../core/services/web-sockets/web-socket.service';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  invalidDetails: boolean;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private wsService: WebSocketService) {
    this.invalidDetails = false;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    var username: string = this.loginForm.value.username;
    var password: string = this.loginForm.value.password;
    if (username && password) {
      this.authService.login(username, password)
        .subscribe(
          data => this.router.navigate(['/']),
          err => {
            console.log(err)
            this.invalidDetails = true;
          })
    }
  }

}