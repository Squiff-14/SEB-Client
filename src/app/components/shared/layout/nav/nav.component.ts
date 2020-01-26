
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private isLoggedIn: boolean
  constructor(private authService: AuthService) {
    this.authService.isLoggedIn().subscribe(result => this.isLoggedIn = result);
  }
  
  ngOnInit() {
  }

}
