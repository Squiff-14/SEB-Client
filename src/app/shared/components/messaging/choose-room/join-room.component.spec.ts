import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JoinRoomComponent } from './join-room.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

describe('ChooseRoomComponent', () => {
  let component: JoinRoomComponent;
  let fixture: ComponentFixture<JoinRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule, 
        HttpClientTestingModule, 
        RouterTestingModule
      ],
      declarations: [ 
        JoinRoomComponent,
        NgxSpinnerComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
