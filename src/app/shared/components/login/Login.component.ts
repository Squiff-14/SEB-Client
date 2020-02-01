import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Url } from 'url';
import { first } from 'rxjs/operators';

@NgModule({
  imports: [CommonModule]
})

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  returnUrl: string;

  private isLoggedIn: boolean;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router,
              private route: ActivatedRoute) {

    this.authService.isLoggedIn().subscribe( result => this.isLoggedIn = result);
    if (this.isLoggedIn) {
      this.router.navigate['/']
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    //this.loading = true;
    const val = this.form.value;
    this.authService.login(val.username, val.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error =>{
          console.log("Error Occured on Submit:", error.message);
        });
  }
}
