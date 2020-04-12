import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecentChatRoomsComponent } from './recent-chat-rooms.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ChatRoomPreviewComponent } from '../chat-room-preview/chat-room-preview.component';

describe('RecentChatRoomsComponent', () => {
  let component: RecentChatRoomsComponent;
  let fixture: ComponentFixture<RecentChatRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule, 
        HttpClientTestingModule
      ],
      declarations: [
        RecentChatRoomsComponent,
        ChatRoomPreviewComponent,
        NgxSpinnerComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentChatRoomsComponent);
    component = fixture.componentInstance;

    component.rooms = []

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
