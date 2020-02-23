import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(result => this.isLoggedIn = result);
  }

  ngOnInit() {
  }

}
