/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Leadpage2Component } from './leadpage2.component';

describe('Leadpage2Component', () => {
  let component: Leadpage2Component;
  let fixture: ComponentFixture<Leadpage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Leadpage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Leadpage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
