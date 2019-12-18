import { ChatRoomComponent } from './ChatRoom/chat-room/ChatRoom.component';
import { NavComponent } from './shared/layout/nav/nav.component';

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';

import { WebSocketService } from '../services/web-socket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';


const appRoutes: Routes = [
  {path: 'Seb', component: HomeComponent},
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
      NavComponent,
      PageNotFoundComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      WebSocketService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }


