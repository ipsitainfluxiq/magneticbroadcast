/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Leadpage1Component } from './leadpage1.component';

describe('Leadpage1Component', () => {
  let component: Leadpage1Component;
  let fixture: ComponentFixture<Leadpage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Leadpage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Leadpage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
