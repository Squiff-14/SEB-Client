
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


const appRoutes: Routes = [
  {path: 'chat', component: ChatRoomComponent},
  {path: 'room', component: ChooseRoomComponent},
  {path: 'login', component: LoginComponent },
  {path: 'home', component: ChatRoomComponent },
  {path: '', redirectTo: '/room', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

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
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      WebSocketService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }


