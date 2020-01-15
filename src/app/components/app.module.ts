import { ErrorInterceptor } from './../services/error.interceptor';
import { RequestInterceptor } from './../services/request.interceptor';

import { AuthService } from './../services/auth.service';
import { ChatRoomComponent } from './ChatRoom/chat-room/ChatRoom.component';

import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';

import { WebSocketService } from '../services/web-socket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './pages/login/Login/Login.component';
import { NavComponent } from './shared/layout/nav/nav.component';


const appRoutes: Routes = [
  {path: 'Seb', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/Seb', pathMatch: 'full'},
  {path: 'WebSockets', component: ChatRoomComponent },
  
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
   declarations: [
      AppComponent,
      ChatRoomComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      PageNotFoundComponent,
      NavComponent,
      LoginComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      WebSocketService,
      AuthService,
      { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }


