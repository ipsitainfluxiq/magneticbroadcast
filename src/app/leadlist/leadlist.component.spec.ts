/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LeadlistComponent } from './leadlist.component';

describe('LeadlistComponent', () => {
  let component: LeadlistComponent;
  let fixture: ComponentFixture<LeadlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
