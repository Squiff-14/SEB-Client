import { MessageType } from './../../../../core/models/enums/MessageType';
import { MessageService } from './../../../../core/services/messaging/message.service';
import { AuthService } from './../../../../core/services/authentication/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImagePipe } from './../../../../core/pipes/image-pipe';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MessageComponent } from './message.component';
import { of } from 'rxjs';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  // Mock Services
  let authServiceMock: any;
  
  // Mock Data
  let userA = {
    userId: 1,
    username: "UserA"
  }

  let userB = {
    userId: 1,
    username: "UserB"
  }

  let message = {
    type: MessageType.message,
    message: "e012fffd-9833-4adc-8442-461d5d451b65",
    sentAt: new Date(),
    content: "Test message",
    user: userA
  }

  beforeEach(async(() => {

    //Mock user service 
    authServiceMock = {
      currentUser: () => {
        return userA
      }
    }

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MessageComponent,
        ImagePipe
      ],
      providers: [
         AuthService 
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.message = message
    fixture.detectChanges();
});

it('should create', () => {
  expect(component).toBeTruthy();
});

});
