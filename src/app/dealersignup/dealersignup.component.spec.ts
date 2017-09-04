/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DealersignupComponent } from './dealersignup.component';

describe('DealersignupComponent', () => {
  let component: DealersignupComponent;
  let fixture: ComponentFixture<DealersignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
