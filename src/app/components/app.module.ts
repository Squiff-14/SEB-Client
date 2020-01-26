import { AuthGuardService } from './../services/auth-guard.service';
import { ErrorInterceptor } from './../services/error.interceptor';

import { ChooseRoomComponent } from './pages/chat/choose-room/ChooseRoom.component';
import { ChatRoomComponent } from './pages/chat/chat-room/ChatRoom.component';
import { AuthService } from './../services/auth.service';

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
import { LoginComponent } from './pages/login/Login.component';
import { NavComponent } from './shared/layout/nav/nav.component';
import { RequestInterceptor } from '../services/request.interceptor';
import { JwtModule } from "@auth0/angular-jwt";


const appRoutes: Routes = [
  {path: 'chat/:id', component: ChatRoomComponent, canActivate: [AuthGuardService]},
  {path: 'room', component: ChooseRoomComponent, canActivate: [AuthGuardService] }, 
  {path: 'login', component: LoginComponent },
  {path: 'home', component: ChatRoomComponent, canActivate: [AuthGuardService] },
  {path: '', redirectTo: '/room', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

export function tokenGetter() {
   return localStorage.getItem("token");
 }

@NgModule({
   declarations: [
      AppComponent,
      ChatRoomComponent,
      ChooseRoomComponent,
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
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
           tokenGetter: tokenGetter
         }
       })
   ],
   providers: [
      WebSocketService,
      AuthService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: RequestInterceptor,
         multi: true
      },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptor,
         multi: true
      }
   ],
   bootstrap: [
      AppComponent
   ]
})



export class AppModule { }


