/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DealershiplistComponent } from './dealershiplist.component';

describe('DealershiplistComponent', () => {
  let component: DealershiplistComponent;
  let fixture: ComponentFixture<DealershiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealershiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
