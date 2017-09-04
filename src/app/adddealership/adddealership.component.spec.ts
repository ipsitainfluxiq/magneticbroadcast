/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdddealershipComponent } from './adddealership.component';

describe('AdddealershipComponent', () => {
  let component: AdddealershipComponent;
  let fixture: ComponentFixture<AdddealershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddealershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
