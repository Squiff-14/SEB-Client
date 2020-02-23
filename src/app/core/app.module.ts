


import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../core/app.component'
import { HeaderComponent } from '../shared/layout/header/header.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import { HomeComponent } from '../shared/components/home/home.component';
import { LoginComponent } from '../shared/components/login/Login.component';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { JoinRoomComponent } from '../shared/components/messaging/choose-room/join-room.component';
import { ChatRoomComponent } from '../shared/components/messaging/chat-room/chat-room.component';
import { PageNotFoundComponent } from '../shared/layout/page-not-found/page-not-found.component';
import { MessageComponent } from './../shared/components/messaging/message/message.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { WebSocketService } from '../core/services/web-socket.service';
import { ErrorInterceptor } from './intercepts/error.interceptor';
import { RequestInterceptor } from '../core/intercepts/request.interceptor'

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const appRoutes: Routes = [
   { path: 'chat/:id', component: ChatRoomComponent, canActivate: [AuthGuardService] },
   { path: 'room', component: JoinRoomComponent, canActivate: [AuthGuardService] },
   { path: 'login', component: LoginComponent },
   { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
   declarations: [
      AppComponent,
      ChatRoomComponent,
      JoinRoomComponent,
      MessageComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      PageNotFoundComponent,
      NavComponent,
      LoginComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      InfiniteScrollModule
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




