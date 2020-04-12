import { AuthService } from './../../../../core/services/authentication/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChatRoomPreviewComponent } from './chat-room-preview.component';
import { Room } from 'src/app/core/models/Room';
import { MessageService } from 'src/app/core/services/messaging/message.service';

describe('ChatRoomPreviewComponent', () => {
  let component: ChatRoomPreviewComponent;
  let fixture: ComponentFixture<ChatRoomPreviewComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChatRoomPreviewComponent],
      providers: [MessageService, AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomPreviewComponent);
    component = fixture.componentInstance;

    component.room = {
      roomId: 1,
      name: "Test Room"
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
